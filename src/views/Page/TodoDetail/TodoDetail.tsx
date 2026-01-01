import {
  Button,
  Card,
  Flex,
  message,
  Result,
  Space,
  Typography,
  Upload,
} from "antd";
import { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import AttachmentIcon from "../../../assets/svg/attachment.svg?react";
import CalendarIcon from "../../../assets/svg/calendar.svg?react";
import { useConfirmModals } from "../../../hooks/useConfirmModals";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  resetDetailState,
  setEditMode,
  setSubmitting,
} from "../../../store/slices/todoDetailSlice";
import {
  addTodo,
  deleteTodo as deleteTodoAction,
  updateTodo,
} from "../../../store/slices/todoSlice";
import {
  processAttachments,
  revokeBlobUrls,
} from "../../../utils/attachmentUtils";
import { formatDateRange } from "../../../utils/dateUtils";
import { getStatusLabel } from "../../../utils/statusUtils";
import { BackLink } from "../../common/BackLink";
import { StatusTag } from "../../common/StatusTag";
import {
  TodoForm,
  TodoFormData,
  TodoFormRef,
} from "../TodoList/components/TodoForm/TodoForm";
import "./TodoDetail.scss";

const { Title, Text, Paragraph } = Typography;

export default function TodoDetail() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const isEditMode = useAppSelector((state) => state.todoDetail.isEditMode);
  const isSubmitting = useAppSelector((state) => state.todoDetail.isSubmitting);
  const formRef = useRef<TodoFormRef>(null);
  const { confirmDelete, confirmUpdate, confirmCreate } = useConfirmModals();

  const isCreateMode = window.location.pathname === "/todo-create";
  const todo = isCreateMode ? null : todos.find((t) => t.id === Number(id));

  // Capture attachments in a ref to prevent premature cleanup
  const attachmentsRef = useRef(todo?.attachments);

  // Keep ref updated when attachments change
  useEffect(() => {
    attachmentsRef.current = todo?.attachments;
  }, [todo?.attachments]);

  // Auto enter edit mode for create
  useEffect(() => {
    if (isCreateMode) {
      dispatch(setEditMode(true));
    }
  }, [isCreateMode, dispatch]);

  // Reset detail state and cleanup blob URLs when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup blob URLs using ref (only on unmount)
      if (attachmentsRef.current) revokeBlobUrls(attachmentsRef.current);
      dispatch(resetDetailState());
    };
  }, [dispatch]);

  if (!isCreateMode && !todo) {
    return (
      <div className="todo-detail-container">
        <Result
          status="404"
          title="Todo not found"
          subTitle="The todo you're looking for doesn't exist."
          extra={
            <Button type="primary" onClick={() => history.push("/todo-list")}>
              Back to List
            </Button>
          }
        />
      </div>
    );
  }

  const handleSubmit = async (data: TodoFormData) => {
    const confirmFn = isCreateMode ? confirmCreate : confirmUpdate;

    confirmFn({
      onConfirm: async () => {
        dispatch(setSubmitting(true));
        try {
          const [startDate, endDate] = data.dateRange || [undefined, undefined];
          const processedAttachmentsList = processAttachments(data.attachments);

          if (isCreateMode) {
            dispatch(
              addTodo({
                name: data.name,
                description: data.description,
                status: data.status,
                startDate,
                endDate,
                attachments: processedAttachmentsList,
              })
            );
            message.success("Task created successfully!");
            // Cleanup temporary blob URLs after navigation
            // Note: We don't revoke here because Redux now owns these URLs
            // They will be cleaned up when the todo is deleted or updated
            history.push("/todo-list");
          } else {
            revokeBlobUrls(todo!.attachments);

            dispatch(
              updateTodo({
                id: todo!.id,
                name: data.name,
                description: data.description,
                status: data.status,
                startDate,
                endDate,
                attachments: processedAttachmentsList,
              })
            );
            message.success("Task updated successfully!");
            dispatch(setEditMode(false));
          }
        } catch {
          message.error(`Failed to ${isCreateMode ? "create" : "update"} task`);
        } finally {
          dispatch(setSubmitting(false));
        }
      },
    });
  };

  const handleDelete = () => {
    confirmDelete({
      onConfirm: () => {
        // Cleanup blob URLs before deleting
        if (todo?.attachments) revokeBlobUrls(todo.attachments);
        dispatch(deleteTodoAction(todo!.id));
        message.success("Task deleted successfully!");
        history.push("/todo-list");
      },
    });
  };

  const handleCancel = () => {
    if (isCreateMode) {
      history.push("/todo-list");
    } else {
      dispatch(setEditMode(false));
    }
  };

  return (
    <div className="todo-detail-container">
      {/* Header */}
      <Flex vertical gap="middle" className="todo-detail-header">
        <BackLink />
        {!isEditMode && !isCreateMode ? (
          <Flex
            align="center"
            justify="space-between"
            className="todo-header-row"
          >
            <Title level={1} className="todo-detail-title">
              {todo!.name}
            </Title>
            <Space size="middle" className="todo-detail-meta">
              <StatusTag status={todo!.status}>
                {getStatusLabel(todo!.status)}
              </StatusTag>
              {(todo!.startDate || todo!.endDate) && (
                <Text type="secondary" className="todo-date">
                  <CalendarIcon className="icon" />
                  {formatDateRange(todo!.startDate, todo!.endDate)}
                </Text>
              )}
            </Space>
          </Flex>
        ) : (
          <Title level={1} className="todo-detail-title">
            {isCreateMode ? "Create New Task" : "Edit Task"}
          </Title>
        )}
      </Flex>

      {/* Content */}
      <div className="todo-detail-content">
        {isEditMode || isCreateMode ? (
          <>
            {/* Left: Form */}
            <Card
              title={isCreateMode ? "New Task" : "Edit Task"}
              className="todo-detail-info"
            >
              <TodoForm
                ref={formRef}
                initialData={
                  todo
                    ? {
                        status: todo.status,
                        name: todo.name,
                        description: todo.description,
                        dateRange: [todo.startDate || "", todo.endDate || ""],
                        attachments: todo.attachments || [],
                      }
                    : undefined
                }
              />
            </Card>

            {/* Right: Actions */}
            <Card title="Actions" className="todo-detail-actions">
              <Flex vertical gap="middle" className="action-buttons">
                <Button
                  type="primary"
                  size="large"
                  block
                  loading={isSubmitting}
                  onClick={() => formRef.current?.submit(handleSubmit)}
                >
                  {isCreateMode ? "Create Task" : "Update Task"}
                </Button>
                <Button
                  size="large"
                  block
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                {!isCreateMode && (
                  <Button danger size="large" block onClick={handleDelete}>
                    Delete Task
                  </Button>
                )}
              </Flex>
            </Card>
          </>
        ) : (
          <>
            {/* Left: Info */}
            <Card title="To Do Information" className="todo-detail-info">
              <Space orientation="vertical" size="large" className="info-content">
                <div className="info-section">
                  <Title level={5}>Status</Title>
                  <StatusTag status={todo!.status}>
                    {getStatusLabel(todo!.status)}
                  </StatusTag>
                </div>

                <div className="info-section">
                  <Title level={5} className="section-title-with-icon">
                    {/* User removed icon here in Step 1674, so keeping it removed */}
                    Timeline
                  </Title>
                  <Text type="secondary">
                    {formatDateRange(todo!.startDate, todo!.endDate)}
                  </Text>
                </div>

                <div className="info-section">
                  <Title level={5}>Task Name</Title>
                  <Text>{todo!.name}</Text>
                </div>

                <div className="info-section">
                  <Title level={5}>Description</Title>
                  <Paragraph className="description-text">
                    {todo!.description || "No description"}
                  </Paragraph>
                </div>

                {todo!.attachments && todo!.attachments.length > 0 && (
                  <div className="info-section">
                    <Title level={5} className="section-title-with-icon">
                      <AttachmentIcon className="icon" />
                      Attachments ({todo!.attachments.length})
                    </Title>
                    <Upload
                      listType="picture"
                      fileList={todo!.attachments.map((att, index) => ({
                        uid: `${index}`,
                        name: att.name,
                        status: "done" as const,
                        url: att.url,
                        thumbUrl: att.url,
                      }))}
                      showUploadList={{
                        showRemoveIcon: false,
                        showDownloadIcon: true,
                      }}
                    />
                  </div>
                )}
              </Space>
            </Card>

            {/* Right: Actions */}
            <Card title="Actions" className="todo-detail-actions">
              <Flex vertical gap="middle" className="action-buttons">
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={() => dispatch(setEditMode(true))}
                >
                  Edit Task
                </Button>
                <Button danger size="large" block onClick={handleDelete}>
                  Delete Task
                </Button>
              </Flex>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
