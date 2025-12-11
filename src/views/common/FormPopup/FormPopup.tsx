import { DatePicker } from "antd";
import "antd/dist/reset.css";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { JSX, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ZodType } from "zod";
import "./FormPopup.scss";

const { RangePicker } = DatePicker;

// Types
export interface FieldConfig {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "file"
    | "date"
    | "date-range"
    | "radio";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  accept?: string;
  rows?: number;
  defaultValue?: any;
  maxLength?: number;
  style?: React.CSSProperties;
  multiple?: boolean;
  wrapperClassName?: string;
}

/**
 * Props for the FormPopup component.
 *
 * @template T - The type of data that will be submitted. Defaults to Record<string, any>.
 *
 * @remarks
 * **Type Safety Contract:**
 * When using a generic type T with validationSchema, consumers MUST ensure that:
 * 1. The validationSchema's output type matches the generic type T
 * 2. The initialData shape conforms to Partial<T>
 *
 * TypeScript cannot enforce compile-time alignment between the schema and T,
 * so runtime validation via the schema is the primary type safety mechanism.
 *
 * @example
 * ```tsx
 * // Define your schema and infer the type
 * const userSchema = z.object({
 *   name: z.string(),
 *   email: z.string().email(),
 * });
 * type UserFormData = z.infer<typeof userSchema>;
 *
 * // Use the inferred type as the generic parameter
 * <FormPopup<UserFormData>
 *   validationSchema={userSchema}
 *   onSubmit={async (data) => {
 *     // data is typed as UserFormData
 *   }}
 * />
 * ```
 */
interface FormPopupProps<T = Record<string, any>> {
  isOpenPopup: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  /**
   * Callback invoked with validated form data.
   * The data will be cast to type T after validation.
   */
  onSubmit: (data: T) => Promise<void>;
  /**
   * Optional Zod validation schema.
   * IMPORTANT: The schema's output type should match the generic type T.
   */
  validationSchema?: ZodType<any>;
  /** Initial form data. Should conform to Partial<T>. */
  initialData?: Partial<T>;
  submitButtonText?: string;
  isLoading?: boolean;
  maxWidth?: string;
}

interface FilePreview {
  file: FileLike;
  id: string;
  preview?: string;
}

// Utility functions
const getFieldValue = (field: FieldConfig, ref: React.RefObject<any>): any => {
  if (!ref?.current) return field.type === "checkbox" ? false : "";

  const fieldHandlers: Record<string, () => any> = {
    checkbox: () => ref.current.checked,
    file: () => ref.current.files?.[0] || null,
    radio: () => {
      const radioButtons = document.querySelectorAll(
        `input[name="${field.name}"]:checked`
      );
      return radioButtons.length > 0
        ? (radioButtons[0] as HTMLInputElement).value
        : "";
    },
    default: () => ref.current.value,
  };

  return (fieldHandlers[field.type] || fieldHandlers.default)();
};

const setFieldValue = (
  field: FieldConfig,
  ref: React.RefObject<any>,
  value: any
): void => {
  if (!ref?.current) return;

  const fieldHandlers: Record<string, () => void> = {
    checkbox: () => {
      ref.current.checked = Boolean(value);
    },
    file: () => {
      ref.current.value = "";
    },
    radio: () => {
      const radioButtons = document.querySelectorAll(
        `input[name="${field.name}"]`
      );
      radioButtons.forEach((radio: any) => {
        radio.checked = radio.value === value;
      });
    },
    "date-range": () => {
      // Set initial value for Ant Design RangePicker
      // Value should be array of [startDate, endDate] strings
      // RangePicker will handle conversion internally
      // Note: This is handled by defaultValue prop in the component
    },
    default: () => {
      ref.current.value = value;
    },
  };

  (fieldHandlers[field.type] || fieldHandlers.default)();
};

// ADD: Utility functions for file handling
const generateFileId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

type FileLike =
  | File
  | { name: string; size: number; type: string; url?: string };

const isImageFile = (file: FileLike): boolean => {
  return file.type.startsWith("image/");
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileIcon = (file: FileLike): string => {
  const extension = file.name.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return "📄";
    case "doc":
    case "docx":
      return "📝";
    case "txt":
      return "📃";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "🖼️";
    default:
      return "📎";
  }
};

const FormPopup = <T = Record<string, any>,>({
  isOpenPopup,
  onClose,
  title,
  fields,
  onSubmit,
  validationSchema,
  initialData,
  submitButtonText = "Submit",
  isLoading = false,
  maxWidth = "max-w-2xl",
}: FormPopupProps<T>) => {
  const refsMap = useRef<Record<string, React.RefObject<any>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const [charCounts, setCharCounts] = useState<Record<string, number>>({});
  const [filePreviews, setFilePreviews] = useState<
    Record<string, FilePreview[]>
  >({});
  const [dateRangeValues, setDateRangeValues] = useState<
    Record<string, [Dayjs | null, Dayjs | null] | null>
  >({});

  // Initialize refs for each field
  useEffect(() => {
    fields.forEach((field) => {
      if (!refsMap.current[field.name]) {
        refsMap.current[field.name] = React.createRef();
      }
    });
  }, [fields]);

  // Reset form when popup opens/closes or initialData changes
  useEffect(() => {
    if (isOpenPopup) {
      resetForm();
      setErrors({});
      setHasAttemptedSubmit(false);
      updateCharCounts();
      const initialFilePreviews: Record<string, FilePreview[]> = {};
      fields.forEach((field) => {
        if (field.type === "file") {
          initialFilePreviews[field.name] = [];

          // Populate from initialData if available
          const existingFiles = (initialData as any)?.[field.name];
          if (Array.isArray(existingFiles)) {
            initialFilePreviews[field.name] = existingFiles.map((f: any) => ({
              file: f,
              id: Math.random().toString(36).substring(2, 15),
              preview: f.url,
            }));
          }
        }
      });
      setFilePreviews(initialFilePreviews);
    }
  }, [isOpenPopup, initialData, fields, resetForm, updateCharCounts]);

  // Cleanup object URLs khi component unmount
  useEffect(() => {
    return () => {
      Object.values(filePreviews)
        .flat()
        .forEach((fp) => {
          if (fp.preview) {
            URL.revokeObjectURL(fp.preview);
          }
        });
    };
  }, [filePreviews]);

  // Collect form data with access to component state
  const collectFormDataInternal = (): Record<string, any> => {
    const formData: Record<string, any> = {};

    fields.forEach((field) => {
      if (field.type === "file") {
        formData[field.name] =
          filePreviews[field.name]?.map((fp) => fp.file) || [];
      } else if (field.type === "date-range") {
        // Handle date-range specially using state
        const dates = dateRangeValues[field.name];
        if (dates && dates[0] && dates[1]) {
          formData[field.name] = [
            dates[0].format("YYYY-MM-DD"),
            dates[1].format("YYYY-MM-DD"),
          ];
        } else {
          formData[field.name] = null;
        }
      } else {
        const ref = refsMap.current[field.name];
        formData[field.name] = getFieldValue(field, ref);
      }
    });

    return formData;
  };

  const showToast = (message: string, type: "success" | "error") => {
    toast[type](message);
  };

  const resetForm = useCallback(() => {
    // Reset dateRangeValues from initialData
    const newDateRangeValues: Record<
      string,
      [Dayjs | null, Dayjs | null] | null
    > = {};

    fields.forEach((field) => {
      if (field.type === "date-range") {
        const initialValue =
          initialData && field.name in initialData
            ? initialData[field.name as keyof typeof initialData]
            : field.defaultValue;

        if (initialValue && Array.isArray(initialValue)) {
          const [start, end] = initialValue;
          newDateRangeValues[field.name] = [
            start ? dayjs(start) : null,
            end ? dayjs(end) : null,
          ];
        } else {
          newDateRangeValues[field.name] = null;
        }
      } else {
        const ref = refsMap.current[field.name];
        const initialValue =
          (initialData && field.name in initialData
            ? initialData[field.name as keyof typeof initialData]
            : field.defaultValue) ?? "";
        setFieldValue(field, ref, initialValue);
      }
    });

    setDateRangeValues(newDateRangeValues);
  }, [fields, initialData]);

  const updateCharCounts = useCallback(() => {
    const counts: Record<string, number> = {};
    fields.forEach((field) => {
      if (field.maxLength) {
        const ref = refsMap.current[field.name];
        if (ref?.current) {
          counts[field.name] = ref.current.value?.length || 0;
        }
      }
    });
    setCharCounts(counts);
  }, [fields]);

  // ADD: Handle file upload
  const handleFileChange = (fieldName: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const field = fields.find((f) => f.name === fieldName);
    if (!field) return;

    const newFiles: FilePreview[] = [];

    Array.from(files).forEach((file) => {
      const filePreview: FilePreview = {
        file,
        id: generateFileId(),
      };

      // Create preview for images
      if (isImageFile(file)) {
        filePreview.preview = URL.createObjectURL(file);
      }

      newFiles.push(filePreview);
    });

    setFilePreviews((prev) => ({
      ...prev,
      [fieldName]: field.multiple
        ? [...(prev[fieldName] || []), ...newFiles]
        : newFiles,
    }));

    // Reset input value to allow selecting the same file again
    const ref = refsMap.current[fieldName];
    if (ref?.current) {
      ref.current.value = "";
    }

    // Trigger validation if submit was attempted
    if (hasAttemptedSubmit) {
      handleFieldChange(fieldName);
    }
  };

  // ADD: Remove file
  const removeFile = (fieldName: string, fileId: string) => {
    setFilePreviews((prev) => {
      const fieldFiles = prev[fieldName] || [];
      const fileToRemove = fieldFiles.find((fp) => fp.id === fileId);

      // Cleanup preview URL
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      return {
        ...prev,
        [fieldName]: fieldFiles.filter((fp) => fp.id !== fileId),
      };
    });

    // Trigger validation if submit was attempted
    if (hasAttemptedSubmit) {
      handleFieldChange(fieldName);
    }
  };

  const validateForm = (): boolean => {
    if (!validationSchema) {
      // Fallback validation for required fields if no schema is provided
      const formData = collectFormDataInternal();
      const newErrors: Record<string, string> = {};
      let isValid = true;
      let firstErrorMessage: string | null = null;

      fields.forEach((field) => {
        if (field.required) {
          const value = formData[field.name];
          if (
            value === "" ||
            value === null ||
            (Array.isArray(value) && value.length === 0) ||
            (field.type === "checkbox" && value === false)
          ) {
            const errorMessage = `${field.label} is required`;
            newErrors[field.name] = errorMessage;
            if (!firstErrorMessage) {
              firstErrorMessage = errorMessage;
            }
            isValid = false;
          }
        }
      });

      setErrors(newErrors);
      if (!isValid && firstErrorMessage) {
        showToast(firstErrorMessage, "error");
      }
      return isValid;
    }

    const formData = collectFormDataInternal();
    const validationResult = validationSchema.safeParse(formData);

    if (!validationResult.success) {
      const newErrors: Record<string, string> = {};
      let firstErrorMessage: string | null = null;

      validationResult.error.issues.forEach((err) => {
        const fieldPath = err.path.join(".");
        if (!newErrors[fieldPath]) {
          newErrors[fieldPath] = err.message;
        }
        if (!firstErrorMessage) {
          firstErrorMessage = err.message;
        }
      });

      setErrors(newErrors);

      if (firstErrorMessage) {
        showToast(firstErrorMessage, "error");
      }
      return false;
    }

    setErrors({});
    return true;
  };

  // Real-time validation after first submit attempt
  const handleFieldChange = (fieldName: string) => {
    const field = fields.find((f) => f.name === fieldName);
    if (!field) return;

    // Update character count for fields with maxLength
    if (field.maxLength) {
      const ref = refsMap.current[fieldName];
      if (ref?.current) {
        setCharCounts((prev) => ({
          ...prev,
          [fieldName]: ref.current.value?.length || 0,
        }));
      }
    }

    // Removed real-time validation to allow better UX with date pickers
    // Validation will only happen on form submit
  };

  const handleSubmit = async () => {
    setHasAttemptedSubmit(true);

    if (!validateForm()) {
      focusFirstError(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = collectFormDataInternal();
      await onSubmit(formData as T);
      onClose();
    } catch (error) {
      showToast("An error occurred while saving data!", "error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const focusFirstError = (currentErrors: Record<string, string>) => {
    const errorFields = Object.keys(currentErrors);
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0];
      const ref = refsMap.current[firstErrorField];
      ref?.current?.focus();
    }
  };

  // ADD: Render file preview blocks
  const renderFilePreview = (fieldName: string) => {
    const files = filePreviews[fieldName] || [];
    if (files.length === 0) return null;

    return (
      <div className="file-preview-container">
        {files.map((filePreview) => (
          <div key={filePreview.id} className="file-preview-block">
            <button
              type="button"
              className="file-preview-block__remove"
              onClick={() => removeFile(fieldName, filePreview.id)}
              title="Remove file"
            >
              ×
            </button>

            <div className="file-preview-block__content">
              {filePreview.preview ? (
                <img
                  src={filePreview.preview}
                  alt={filePreview.file.name}
                  className="file-preview-block__image"
                />
              ) : (
                <div className="file-preview-block__icon">
                  {getFileIcon(filePreview.file)}
                </div>
              )}

              <div className="file-preview-block__info">
                <div
                  className="file-preview-block__name"
                  title={filePreview.file.name}
                >
                  {filePreview.file.name}
                </div>
                <div className="file-preview-block__size">
                  {formatFileSize(filePreview.file.size)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Field Renderers with Object Mapping
  const createFieldRenderer = (
    field: FieldConfig,
    ref: React.RefObject<any>,
    hasError: boolean
  ) => {
    const baseClassName = `form-field ${hasError ? "form-field--error" : ""}`;
    const commonProps = {
      onChange: () => handleFieldChange(field.name),
      onBlur: () => handleFieldChange(field.name),
      style: field.style,
    };

    const fieldRenderers: Record<string, () => JSX.Element> = {
      radio: () => (
        <div className="form-field-radio" style={field.style}>
          {field.options?.map((option) => (
            <div key={option.value} className="form-field-radio__item">
              <input
                ref={field.options?.indexOf(option) === 0 ? ref : undefined}
                id={`${field.name}_${option.value}`}
                name={field.name}
                type="radio"
                value={option.value}
                className={`form-field-radio__input ${
                  hasError ? "form-field-radio__input--error" : ""
                }`}
                onChange={() => handleFieldChange(field.name)}
              />
              <label
                htmlFor={`${field.name}_${option.value}`}
                className="form-field-radio__label"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ),
      textarea: () => (
        <textarea
          ref={ref}
          id={field.name}
          rows={field.rows || 4}
          className={`${baseClassName} form-field--textarea`}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          {...commonProps}
        />
      ),
      select: () => (
        <select
          ref={ref}
          id={field.name}
          className={`${baseClassName} form-field--select`}
          {...commonProps}
        >
          <option value="">Choose {field.label.toLowerCase()}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ),
      checkbox: () => (
        <div className="form-field-checkbox" style={field.style}>
          <input
            ref={ref}
            id={field.name}
            type="checkbox"
            className={`form-field-checkbox__input ${
              hasError ? "form-field-checkbox__input--error" : ""
            }`}
            {...commonProps}
          />
          <label htmlFor={field.name} className="form-field-checkbox__label">
            {field.label}{" "}
            {field.required && <span className="form-field__required">*</span>}
          </label>
        </div>
      ),
      "date-range": () => {
        // Get current value from state
        const currentValue = dateRangeValues[field.name] || null;

        return (
          <div style={field.style}>
            <RangePicker
              style={{ width: "100%" }}
              placeholder={["Start Date", "End Date"]}
              format="YYYY-MM-DD"
              value={currentValue}
              onChange={(dates) => {
                setDateRangeValues((prev) => ({
                  ...prev,
                  [field.name]: dates,
                }));
                handleFieldChange(field.name);
              }}
              className={hasError ? "ant-picker-error" : ""}
            />
          </div>
        );
      },
      file: () => (
        <div className="form-field-file" style={field.style}>
          <input
            ref={ref}
            id={field.name}
            type="file"
            accept={field.accept}
            multiple={field.multiple} // ADD: Support multiple files
            className={`${baseClassName} form-field--file`}
            onChange={(e) => handleFileChange(field.name, e.target.files)}
          />
          {field.accept && (
            <p className="form-field-file__hint">Accept: {field.accept}</p>
          )}
          {renderFilePreview(field.name)}
        </div>
      ),

      default: () => (
        <input
          ref={ref}
          id={field.name}
          type={field.type}
          className={baseClassName}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          {...commonProps}
        />
      ),
    };

    return (fieldRenderers[field.type] || fieldRenderers.default)();
  };

  const renderField = (field: FieldConfig) => {
    const ref = refsMap.current[field.name];
    const hasError = errors[field.name];

    return createFieldRenderer(field, ref, !!hasError);
  };

  if (!isOpenPopup) return null;

  return (
    <div className="form-popup-overlay">
      <div className={`form-popup ${maxWidth}`}>
        <div className="form-popup__header">
          <h2 className="form-popup__title">{title}</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="form-popup__close"
          >
            ×
          </button>
        </div>

        <div className="form-popup__body">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`form-group ${field.wrapperClassName || ""}`}
            >
              {field.type !== "checkbox" && (
                <label htmlFor={field.name} className="form-label">
                  {field.label}{" "}
                  {field.required && (
                    <span className="form-field__required">*</span>
                  )}
                </label>
              )}

              {renderField(field)}

              {/* Character counter */}
              {field.maxLength &&
                (field.type === "text" || field.type === "textarea") && (
                  <div className="form-field__counter">
                    <span
                      className={`form-field__counter-text ${
                        (charCounts[field.name] || 0) > field.maxLength
                          ? "form-field__counter-text--error"
                          : ""
                      }`}
                    >
                      {charCounts[field.name] || 0}/{field.maxLength}
                    </span>
                  </div>
                )}
            </div>
          ))}
        </div>

        <div className="form-popup__footer">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="btn btn--secondary"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isLoading}
            className={`btn btn--primary ${
              isSubmitting || isLoading ? "btn--loading" : ""
            }`}
          >
            {isSubmitting ? (
              <div className="btn__loading">
                <div className="btn__spinner"></div>
                Saving...
              </div>
            ) : (
              submitButtonText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPopup;
