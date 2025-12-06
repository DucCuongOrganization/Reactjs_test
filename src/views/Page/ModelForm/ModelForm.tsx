import React, { useState } from "react";
import { z } from "zod";
import FormPopup, { FieldConfig } from "../../common/FormPopup/FormPopup";

const modelFormSchema = z
  .object({
    modelName: z.string().min(1, "Model Name is required").max(256),
    modelType: z.enum(["A", "B"], {
      required_error: "Model Type is required",
    }),
    description: z.string().min(1, "Description is required").max(256),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().optional(),
    webURL: z.string().url("Invalid URL format").optional().or(z.literal("")),
    licenseType: z.string().optional(),
    attachment: z.any().optional(),
    isPrivate: z.boolean(),
  })
  .refine(
    (data) =>
      !data.endDate ||
      !data.startDate ||
      new Date(data.endDate) > new Date(data.startDate),
    {
      message: "End Date must be after Start Date",
      path: ["endDate"],
    }
  );

const ModelForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Record<string, any>>({});

  // Field configurations
  const modelFields: FieldConfig[] = [
    {
      name: "modelName",
      label: "Model Name",
      type: "text",
      required: true,
      placeholder: "Enter name",
      maxLength: 256,
    },
    {
      name: "modelType",
      label: "Model Type",
      type: "radio",
      required: true,
      defaultValue: "A",
      options: [
        { value: "A", label: "Type A" },
        { value: "B", label: "Type B" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      placeholder: "Enter description",
      rows: 3,
      maxLength: 256,
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      required: false,
      style: { width: "50%" },
    },
    {
      name: "webURL",
      label: "Web URL",
      type: "text",
      required: false,
      placeholder: "https://example.com",
    },
    {
      name: "licenseType",
      label: "License Type",
      type: "select",
      required: false,
      options: [
        { value: "MIT", label: "MIT License" },
        { value: "GPL", label: "GPL License" },
        { value: "Apache", label: "Apache License" },
        { value: "BSD", label: "BSD License" },
        { value: "Commercial", label: "Commercial License" },
      ],
    },
    {
      name: "attachment",
      label: "Attachment",
      type: "file",
      required: false,
      accept: ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png",
      multiple: true,
    },
    {
      name: "isPrivate",
      label: "Private Model",
      type: "checkbox",
      required: false,
    },
  ];

  // Mock API function
  const handleModelSubmit = async (
    data: Record<string, any>
  ): Promise<void> => {
    console.log("Submitting model data:", data);

    if (data.attachment && Array.isArray(data.attachment)) {
      console.log(
        "Files uploaded:",
        data.attachment.map((file: File) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        }))
      );
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (isEditMode) {
      console.log("Model updated successfully");
    } else {
      console.log("Model created successfully");
    }
  };

  const openCreateModelForm = () => {
    setIsEditMode(false);
    setCurrentData({
      modelType: "A",
    });
    setIsOpen(true);
  };

  const openEditModelForm = () => {
    setIsEditMode(true);
    setCurrentData({
      modelName: "Sample Model",
      modelType: "B",
      description: "This is a sample model description",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      webURL: "https://example.com",
      licenseType: "MIT",
      isPrivate: true,
    });
    setIsOpen(true);
  };

  return (
    <div className="demo-container">
      <div className="demo-card">
        <h2 className="demo-card__title">Model Management Form</h2>

        <div className="demo-buttons">
          <button onClick={openCreateModelForm} className="btn btn--primary">
            Create new Model
          </button>

          <button onClick={openEditModelForm} className="btn btn--success">
            Edit Model (Demo)
          </button>
        </div>
      </div>

      <FormPopup
        isOpenPopup={isOpen}
        onClose={() => setIsOpen(false)}
        title={isEditMode ? "Edit Model" : "Create new Model"}
        fields={modelFields}
        onSubmit={handleModelSubmit}
        validationSchema={modelFormSchema}
        initialData={currentData}
        submitButtonText={isEditMode ? "Update" : "Create"}
        maxWidth="form-popup--large"
      />
    </div>
  );
};

export default ModelForm;
