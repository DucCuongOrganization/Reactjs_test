import { Modal, ModalFuncProps } from "antd";

interface ConfirmOptions {
  title?: string;
  content?: string;
  okText?: string;
  okType?: "primary" | "danger" | "dashed" | "link" | "text" | "default";
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
}

export const useConfirmModals = () => {
  const showConfirm = (options: ConfirmOptions) => {
    const {
      title = "Confirm",
      content = "Are you sure?",
      okText = "OK",
      okType = "primary",
      cancelText = "Cancel",
      onConfirm,
    } = options;

    Modal.confirm({
      title,
      content,
      okText,
      okType,
      cancelText,
      onOk: onConfirm,
    } as ModalFuncProps);
  };

  const confirmCreate = (
    options: Pick<ConfirmOptions, "onConfirm"> &
      Partial<Omit<ConfirmOptions, "onConfirm">>
  ) => {
    showConfirm({
      title: "Create Task",
      content: "Are you sure you want to create this task?",
      okText: "Create",
      ...options,
    });
  };

  const confirmUpdate = (
    options: Pick<ConfirmOptions, "onConfirm"> &
      Partial<Omit<ConfirmOptions, "onConfirm">>
  ) => {
    showConfirm({
      title: "Update Task",
      content: "Are you sure you want to update this task?",
      okText: "Update",
      ...options,
    });
  };

  const confirmDelete = (
    options: Pick<ConfirmOptions, "onConfirm"> &
      Partial<Omit<ConfirmOptions, "onConfirm">>
  ) => {
    showConfirm({
      title: "Delete Task",
      content:
        "Are you sure you want to delete this task? This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      ...options,
    });
  };

  return { showConfirm, confirmCreate, confirmUpdate, confirmDelete };
};
