import React, { JSX, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
    | "radio";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  accept?: string;
  rows?: number;
  defaultValue?: any;
  validation?: (value: any, formData?: Record<string, any>) => boolean;
  maxLength?: number;
  style?: React.CSSProperties;
  multiple?: boolean;
}

interface FormPopupProps {
  isOpenPopup: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  initialData?: Record<string, any>;
  submitButtonText?: string;
  isLoading?: boolean;
  maxWidth?: string;
}

interface FilePreview {
  file: File;
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
    default: () => {
      ref.current.value = value;
    },
  };

  (fieldHandlers[field.type] || fieldHandlers.default)();
};

const collectFormData = (
  fields: FieldConfig[],
  refsMap: Record<string, React.RefObject<any>>,
  filePreviews: Record<string, FilePreview[]>
): Record<string, any> => {
  const formData: Record<string, any> = {};

  fields.forEach((field) => {
    if (field.type === "file") {
      formData[field.name] =
        filePreviews[field.name]?.map((fp) => fp.file) || [];
    } else {
      const ref = refsMap[field.name];
      formData[field.name] = getFieldValue(field, ref);
    }
  });

  return formData;
};

// THÊM: Utility functions cho file handling
const generateFileId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

const isImageFile = (file: File): boolean => {
  return file.type.startsWith("image/");
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileIcon = (file: File): string => {
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

const FormPopup: React.FC<FormPopupProps> = ({
  isOpenPopup,
  onClose,
  title,
  fields,
  onSubmit,
  initialData = {},
  submitButtonText = "Submit",
  isLoading = false,
  maxWidth = "max-w-2xl",
}) => {
  const refsMap = useRef<Record<string, React.RefObject<any>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const [charCounts, setCharCounts] = useState<Record<string, number>>({});
  const [filePreviews, setFilePreviews] = useState<
    Record<string, FilePreview[]>
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
        }
      });
      setFilePreviews(initialFilePreviews);
    }
  }, [isOpenPopup, initialData]);

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
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    toast[type](message);
  };

  const resetForm = () => {
    fields.forEach((field) => {
      const ref = refsMap.current[field.name];
      const initialValue = initialData[field.name] ?? field.defaultValue ?? "";
      setFieldValue(field, ref, initialValue);
    });
  };

  const updateCharCounts = () => {
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
  };

  // THÊM: Xử lý file upload
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

      // Tạo preview cho ảnh
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

    // Reset input value để có thể chọn lại cùng file
    const ref = refsMap.current[fieldName];
    if (ref?.current) {
      ref.current.value = "";
    }

    // Trigger validation nếu đã attempt submit
    if (hasAttemptedSubmit) {
      handleFieldChange(fieldName);
    }
  };

  // THÊM: Xóa file
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

    // Trigger validation nếu đã attempt submit
    if (hasAttemptedSubmit) {
      handleFieldChange(fieldName);
    }
  };

  const validateField = (
    field: FieldConfig,
    value: any,
    formData: Record<string, any>
  ): string => {
    // Required validation
    if (field.required) {
      if (field.type === "checkbox" && !value) return "required";
      if (field.type === "file") {
        // SỬA: Kiểm tra file từ filePreviews
        const files = filePreviews[field.name] || [];
        if (files.length === 0) return "required";
      } else if (
        field.type !== "checkbox" &&
        (!value || value.toString().trim() === "")
      ) {
        return "required";
      }
    }

    // Custom validation
    if (field.validation && (value || field.required)) {
      const isValid = field.validation(value, formData);
      if (!isValid) return "invalid";
    }

    return "";
  };

  const validateForm = (): boolean => {
    const formData = collectFormData(fields, refsMap.current, filePreviews);
    const newErrors: Record<string, string> = {};

    let hasMandatoryErrors = false;
    let hasFormatErrors = false;
    let hasEndDateError = false;

    fields.forEach((field) => {
      const value = formData[field.name];
      const error = validateField(field, value, formData);

      if (error) {
        newErrors[field.name] = error;

        if (error === "required") {
          hasMandatoryErrors = true;
        } else if (field.name === "endDate" && error === "invalid") {
          hasEndDateError = true;
        } else {
          hasFormatErrors = true;
        }
      }
    });

    setErrors(newErrors);

    // Show appropriate error message
    if (Object.keys(newErrors).length > 0) {
      if (hasEndDateError) {
        showToast("End Date need after Start Date", "error");
      } else if (hasMandatoryErrors) {
        showToast("Please fill all mandatory fields", "error");
      } else if (hasFormatErrors) {
        showToast("Please check invalid fields", "error");
      }
    }

    return Object.keys(newErrors).length === 0;
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

    if (hasAttemptedSubmit) {
      setTimeout(() => {
        const formData = collectFormData(fields, refsMap.current, filePreviews);
        const value = formData[fieldName];
        const fieldError = validateField(field, value, formData);

        setErrors((prev) => ({
          ...prev,
          [fieldName]: fieldError,
        }));
      }, 100);
    }
  };

  const handleSubmit = async () => {
    setHasAttemptedSubmit(true);

    if (!validateForm()) {
      focusFirstError();
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = collectFormData(fields, refsMap.current, filePreviews); // SỬA: Thêm filePreviews
      await onSubmit(formData);
      showToast("Dữ liệu đã được lưu thành công!", "success");

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      showToast("Có lỗi xảy ra khi lưu dữ liệu!", "error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const focusFirstError = () => {
    const errorFields = Object.keys(errors);
    if (errorFields.length > 0) {
      const firstErrorField = errorFields[0];
      const ref = refsMap.current[firstErrorField];
      ref?.current?.focus();
    }
  };

  // THÊM: Render file preview blocks
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
      file: () => (
        <div className="form-field-file" style={field.style}>
          <input
            ref={ref}
            id={field.name}
            type="file"
            accept={field.accept}
            multiple={field.multiple} // THÊM: Hỗ trợ multiple
            className={`${baseClassName} form-field--file`}
            onChange={(e) => handleFileChange(field.name, e.target.files)}
          />
          {field.accept && (
            <p className="form-field-file__hint">Accept: {field.accept}</p>
          )}
          {/* THÊM: Render file previews */}
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
            <div key={field.name} className="form-group">
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
