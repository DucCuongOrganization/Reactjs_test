import { Button, Card, message } from "antd";
import { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ReactComponent as AttachmentIcon } from "../../../assets/svg/attachment.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
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

  // Auto enter edit mode for create
  useEffect(() => {
    if (isCreateMode) {
      dispatch(setEditMode(true));
    }
  }, [isCreateMode, dispatch]);

  // Reset detail state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetDetailState());
    };
  }, [dispatch]);

  if (!isCreateMode && !todo) {
    return (
      <div className="todo-detail-container">
        <div className="not-found">
          <h2>Todo not found</h2>
          <Button type="primary" onClick={() => history.push("/todo-list")}>
            Back to List
          </Button>
        </div>
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
        } catch (error) {
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
      <div className="todo-detail-header">
        <BackLink />
        {!isEditMode && !isCreateMode ? (
          <div className="todo-header-row">
            <h1 className="todo-detail-title">{todo!.name}</h1>
            <div className="todo-detail-meta">
              <StatusTag status={todo!.status}>
                {getStatusLabel(todo!.status)}
              </StatusTag>
              {(todo!.startDate || todo!.endDate) && (
                <span className="todo-date">
                  <CalendarIcon className="icon" />
                  {formatDateRange(todo!.startDate, todo!.endDate)}
                </span>
              )}
            </div>
          </div>
        ) : (
          <h1 className="todo-detail-title">
            {isCreateMode ? "Create New Task" : "Edit Task"}
          </h1>
        )}
      </div>

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
              <div className="action-buttons">
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
              </div>
            </Card>
          </>
        ) : (
          <>
            {/* Left: Info */}
            <Card title="To Do Information" className="todo-detail-info">
              <div className="info-section">
                <h3>Status</h3>
                <StatusTag status={todo!.status}>
                  {getStatusLabel(todo!.status)}
                </StatusTag>
              </div>

              <div className="info-section">
                <h3 className="section-title-with-icon">
                  <CalendarIcon className="icon" />
                  Timeline
                </h3>
                <p>{formatDateRange(todo!.startDate, todo!.endDate)}</p>
              </div>

              <div className="info-section">
                <h3>Task Name</h3>
                <p>{todo!.name}</p>
              </div>

              <div className="info-section">
                <h3>Description</h3>
                <p className="description-text">
                  {todo!.description || "No description"}
                </p>
              </div>

              {todo!.attachments && todo!.attachments.length > 0 && (
                <div className="info-section">
                  <h3 className="section-title-with-icon">
                    <AttachmentIcon className="icon" />
                    Attachments ({todo!.attachments.length})
                  </h3>
                  <ul className="attachments-list">
                    {todo!.attachments.map((att, index) => (
                      <li key={index} className="attachment-item">
                        <a
                          href={att.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {att.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            {/* Right: Actions */}
            <Card title="Actions" className="todo-detail-actions">
              <div className="action-buttons">
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
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
