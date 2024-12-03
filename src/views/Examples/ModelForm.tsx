import React, { useState } from "react";
import FormPopup, { FieldConfig } from "./FormPopup";

const ModelForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Record<string, any>>({});

  // Simplified validation functions that return boolean
  const validateURL = (url: string): boolean => {
    if (!url) return true; // Optional field
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const validateEndDate = (
    endDate: string,
    formData?: Record<string, any>
  ): boolean => {
    if (!endDate) return true; // Optional field

    const startDate = formData?.startDate;
    if (!startDate) return true;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return end > start;
  };

  const validateMaxLength =
    (maxLength: number) =>
    (value: string): boolean => {
      if (!value) return true;
      return value.length <= maxLength;
    };

  // Field configurations
  const modelFields: FieldConfig[] = [
    {
      name: "modelName",
      label: "Model Name",
      type: "text",
      required: true,
      placeholder: "Nhập tên model",
      maxLength: 256,
      validation: validateMaxLength(256),
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
      placeholder: "Nhập mô tả...",
      rows: 3,
      maxLength: 256,
      validation: validateMaxLength(256),
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
      validation: validateEndDate,
      style: { width: "50%" },
    },
    {
      name: "webURL",
      label: "Web URL",
      type: "text",
      required: false,
      placeholder: "https://example.com",
      validation: validateURL,
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
      label: "Đây là model riêng tư",
      type: "checkbox",
      required: false,
    },
  ];

  // Mock API function
  const handleModelSubmit = async (
    data: Record<string, any>
  ): Promise<void> => {
    console.log("Submitting model data:", data);

    // SỬA: Log thông tin files
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
        initialData={currentData}
        submitButtonText={isEditMode ? "Update" : "Create"}
        maxWidth="form-popup--large"
      />
    </div>
  );
};

export default ModelForm;
