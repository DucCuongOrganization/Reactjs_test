import { Button, Input, Modal, Pagination, Select } from "antd";
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import Sortable from "sortablejs";
import { z } from "zod";
import { ReactComponent as AttachmentIcon } from "../../../assets/svg/attachment.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/svg/calendar.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/svg/delete.svg";
import { ReactComponent as DragHandleIcon } from "../../../assets/svg/drag-handle.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit.svg";
import { ReactComponent as PlusIcon } from "../../../assets/svg/plus.svg";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addTodo,
  deleteTodo as deleteTodoAction,
  reorderTodos,
  setCurrentPage,
  setFilterStatus,
  setItemsPerPage,
  setSearchQuery,
  setSortBy,
  SortOption,
  Todo,
  TodoAttachment,
  updateTodo,
} from "../../../store/slices/todoSlice";
import FormPopup, { FieldConfig } from "../../common/FormPopup/FormPopup";
import "./TodoList.scss";

const { Search } = Input;

// Zod validation schema
const todoSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["todo", "in-progress", "done"] as const, {
    error: "Please select a status",
  }),
  dateRange: z
    .tuple([z.string(), z.string()])
    .refine((val) => val && val.length === 2 && val[0] && val[1], {
      message: "Timeline is required",
    })
    .refine(
      (val) => {
        const [start, end] = val;
        return new Date(start) <= new Date(end);
      },
      {
        message: "Start date must be before or equal to end date",
      }
    ),
  attachments: z
    .array(
      z.union([
        z.instanceof(File),
        z.object({
          name: z.string(),
          size: z.number(),
          type: z.string(),
          url: z.string().optional(),
        }),
      ])
    )
    .optional(),
});

type TodoFormData = z.infer<typeof todoSchema>;

export default function TodoList(): JSX.Element {
  // Redux state and dispatch
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const currentPage = useAppSelector((state) => state.todos.currentPage);
  const itemsPerPage = useAppSelector((state) => state.todos.itemsPerPage);
  const searchQuery = useAppSelector((state) => state.todos.searchQuery);
  const filterStatus = useAppSelector((state) => state.todos.filterStatus);
  const sortBy = useAppSelector((state) => state.todos.sortBy);
  const sortDirection = useAppSelector((state) => state.todos.sortDirection);

  // Filter, search, and sort todos
  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos];

    // Search
    if (searchQuery) {
      result = result.filter(
        (todo) =>
          todo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          todo.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter((todo) => todo.status === filterStatus);
    }

    // Sort
    if (sortBy !== "none") {
      result.sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          case "date":
            comparison = (a.startDate || "").localeCompare(b.startDate || "");
            break;
          case "status":
            comparison = a.status.localeCompare(b.status);
            break;
        }
        // Apply sort direction
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [todos, searchQuery, filterStatus, sortBy, sortDirection]);

  // Calculate pagination
  const paginatedTodos = filteredAndSortedTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [viewingTodo, setViewingTodo] = useState<Todo | null>(null); // State for viewing todo details
  const sortableRef = useRef<HTMLDivElement>(null);
  const sortableInstance = useRef<Sortable | null>(null);

  // Initialize Sortable
  useEffect(() => {
    if (sortableRef.current) {
      sortableInstance.current = Sortable.create(sortableRef.current, {
        animation: 200,
        delay: 2,
        delayOnTouchOnly: true,
        handle: ".drag-handle",
        onEnd: (evt) => {
          const { oldIndex, newIndex } = evt;
          if (oldIndex !== undefined && newIndex !== undefined) {
            // Get the actual todo items from paginatedTodos
            const draggedItem = paginatedTodos[oldIndex];
            const targetItem = paginatedTodos[newIndex];
            if (!draggedItem || !targetItem) return;

            // Find actual indices in the full todos array
            const actualOldIndex = todos.findIndex(
              (t) => t.id === draggedItem.id
            );
            const actualNewIndex = todos.findIndex(
              (t) => t.id === targetItem.id
            );
            if (actualOldIndex === -1 || actualNewIndex === -1) return;

            const newTodos = [...todos];
            const [removed] = newTodos.splice(actualOldIndex, 1);
            newTodos.splice(actualNewIndex, 0, removed);
            dispatch(reorderTodos(newTodos));
          }
        },
      });
    }

    return () => {
      if (sortableInstance.current) {
        sortableInstance.current.destroy();
      }
    };
  }, [todos, paginatedTodos, dispatch]);

  // Cleanup all blob URLs when component unmounts
  useEffect(() => {
    return () => {
      todos.forEach((todo) => {
        todo.attachments.forEach((att) => {
          if (att.url?.startsWith("blob:")) {
            URL.revokeObjectURL(att.url);
          }
        });
      });
    };
  }, [todos]);

  // Form fields configuration
  const formFields: FieldConfig[] = [
    {
      name: "status",
      label: "Status",
      type: "radio",
      required: true,
      defaultValue: "todo",
      options: [
        { value: "todo", label: "To Do" },
        { value: "in-progress", label: "In Progress" },
        { value: "done", label: "Done" },
      ],
    },
    {
      name: "name",
      label: "Task Name",
      type: "text",
      required: true,
      placeholder: "Enter task name...",
      maxLength: 100,
      wrapperClassName: "mb-0",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      placeholder: "Enter detailed description...",
      rows: 4,
      maxLength: 500,
      wrapperClassName: "mb-0",
    },
    {
      name: "dateRange",
      label: "Timeline",
      type: "date-range",
      required: true,
      wrapperClassName: "custom-date-wrapper",
    },
    {
      name: "attachments",
      label: "Attachments",
      type: "file",
      required: false,
      multiple: true,
      accept: "image/*,.pdf,.doc,.docx,.txt",
    },
  ];

  // Open popup for adding new todo
  const handleAddTodo = () => {
    setEditingTodo(null);
    setIsPopupOpen(true);
  };

  // Open popup for editing todo
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsPopupOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (data: TodoFormData) => {
    // Extract dates from dateRange
    const [startDate, endDate] = data.dateRange || [undefined, undefined];

    // Convert new files to TodoAttachment objects
    // Note: In a real app, you would upload files to a server here and get URLs back
    // For this demo, we'll create object URLs for new files
    // Object URLs are properly cleaned up to prevent memory leaks:
    // 1. When a todo is updated (revoke old URLs before replacing)
    // 2. When a todo is deleted (revoke URLs in deleteTodo)
    // 3. When component unmounts (cleanup effect revokes all URLs)
    const processedAttachments: TodoAttachment[] = [];

    if (data.attachments && Array.isArray(data.attachments)) {
      data.attachments.forEach((file: any) => {
        if (file instanceof File) {
          // It's a new File object, convert it
          processedAttachments.push({
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file), // Create temporary URL for preview
          });
        } else if (file.name && file.type && file.size) {
          // If it's already a TodoAttachment (from existing data), keep it
          processedAttachments.push(file as TodoAttachment);
        }
      });
    }

    if (editingTodo) {
      // Revoke old attachment URLs before updating to prevent memory leaks
      editingTodo.attachments.forEach((att) => {
        if (att.url?.startsWith("blob:")) {
          URL.revokeObjectURL(att.url);
        }
      });

      // Update existing todo
      dispatch(
        updateTodo({
          ...editingTodo,
          name: data.name,
          description: data.description,
          status: data.status,
          startDate,
          endDate,
          attachments: processedAttachments,
        })
      );
      toast.success("Successfully edited!");
    } else {
      // Add new todo
      dispatch(
        addTodo({
          name: data.name,
          description: data.description,
          status: data.status,
          startDate,
          endDate,
          attachments: processedAttachments,
        })
      );
      toast.success("Successfully created!");
    }
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    // Find the todo and revoke its attachment URLs to prevent memory leaks
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (todoToDelete) {
      todoToDelete.attachments.forEach((att) => {
        if (att.url?.startsWith("blob:")) {
          URL.revokeObjectURL(att.url);
        }
      });
    }

    dispatch(deleteTodoAction(id));
  };

  // Get status badge class
  const getStatusClass = (status: string): string => {
    switch (status) {
      case "todo":
        return "status-todo";
      case "in-progress":
        return "status-in-progress";
      case "done":
        return "status-done";
      default:
        return "";
    }
  };

  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "todo":
        return "To Do";
      case "in-progress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  // Get initial form data for editing
  const getInitialData = (): Partial<TodoFormData> | undefined => {
    if (editingTodo) {
      return {
        name: editingTodo.name,
        description: editingTodo.description,
        status: editingTodo.status,
        dateRange: [editingTodo.startDate || "", editingTodo.endDate || ""],
        attachments: editingTodo.attachments,
      };
    }
    return undefined;
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1 className="todo-title">📝 Todo List</h1>
        <button onClick={handleAddTodo} className="add-todo-btn">
          <PlusIcon className="icon-plus" style={{ marginRight: "0.25rem" }} />{" "}
          Add Task
        </button>
      </div>

      {/* Filter, Search, Sort Toolbar */}
      <div className="toolbar">
        <Search
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          onSearch={(value) => dispatch(setSearchQuery(value))}
          style={{ width: 300 }}
          allowClear
        />

        <Select
          value={filterStatus}
          onChange={(value) => dispatch(setFilterStatus(value))}
          style={{ width: 150 }}
        >
          <Select.Option value="all">All Status</Select.Option>
          <Select.Option value="todo">To Do</Select.Option>
          <Select.Option value="in-progress">In Progress</Select.Option>
          <Select.Option value="done">Done</Select.Option>
        </Select>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Select
            value={sortBy}
            onChange={(value: SortOption) => dispatch(setSortBy(value))}
            style={{ width: 150 }}
          >
            <Select.Option value="none">No Sort</Select.Option>
            <Select.Option value="name">Name</Select.Option>
            <Select.Option value="date">Date</Select.Option>
            <Select.Option value="status">Status</Select.Option>
          </Select>

          {sortBy !== "none" && (
            <Button
              onClick={() => dispatch(setSortBy(sortBy))} // Toggles direction when same sortBy is clicked (see todoSlice)
              title={
                sortDirection === "asc"
                  ? "Ascending (click to reverse)"
                  : "Descending (click to reverse)"
              }
            >
              {sortDirection === "asc" ? "↑" : "↓"}
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="results-count">
        {filteredAndSortedTodos.length}{" "}
        {filteredAndSortedTodos.length === 1 ? "task" : "tasks"}
      </div>

      <div ref={sortableRef} className="todo-list">
        {paginatedTodos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${getStatusClass(todo.status)}`}
          >
            {/* Drag handle */}
            <span className="drag-handle">
              <DragHandleIcon className="icon-drag-handle" />
            </span>

            {/* Todo content */}
            <div className="todo-content">
              <div className="todo-main">
                <h3
                  className="todo-name clickable"
                  onClick={() => setViewingTodo(todo)}
                  title="Click to view details"
                >
                  {todo.name}
                </h3>
                <span className={`todo-status ${getStatusClass(todo.status)}`}>
                  {getStatusLabel(todo.status)}
                </span>
              </div>
              <p className="todo-description">{todo.description}</p>
              <div className="todo-dates">
                {(todo.startDate || todo.endDate) && (
                  <span className="todo-date">
                    <CalendarIcon
                      className="icon-calendar"
                      style={{ marginRight: "4px" }}
                    />{" "}
                    {todo.startDate ? formatDate(todo.startDate) : "N/A"} -{" "}
                    {todo.endDate ? formatDate(todo.endDate) : "N/A"}
                  </span>
                )}
                {todo.attachments && todo.attachments.length > 0 && (
                  <span className="todo-attachments">
                    <AttachmentIcon
                      className="icon-attachment"
                      style={{ marginRight: "4px" }}
                    />
                    {todo.attachments.length} file(s)
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="todo-actions">
              <button
                onClick={() => handleEditTodo(todo)}
                className="edit-btn"
                title="Edit"
              >
                <EditIcon className="icon-edit" />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-btn"
                title="Delete"
              >
                <DeleteIcon className="icon-delete" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedTodos.length > 0 && (
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={filteredAndSortedTodos.length}
            pageSize={itemsPerPage}
            onChange={(page) => dispatch(setCurrentPage(page))}
            onShowSizeChange={(_, size) => dispatch(setItemsPerPage(size))}
            showSizeChanger
            pageSizeOptions={["10", "20", "50", "100"]}
            align="center"
          />
        </div>
      )}

      {filteredAndSortedTodos.length === 0 && (
        <div className="empty-state">No tasks yet. Add a new task! 🎯</div>
      )}

      {/* Form Popup */}
      <FormPopup<TodoFormData>
        isOpenPopup={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={editingTodo ? "Edit Task" : "Add New Task"}
        fields={formFields}
        onSubmit={handleSubmit}
        validationSchema={todoSchema}
        initialData={getInitialData()}
        submitButtonText="OK"
        maxWidth="max-w-3xl"
      />

      {/* View Details Modal */}
      <Modal
        title="Task Details"
        open={!!viewingTodo}
        onCancel={() => setViewingTodo(null)}
        centered
        footer={[
          <Button key="close" onClick={() => setViewingTodo(null)}>
            Close
          </Button>,
        ]}
      >
        {viewingTodo && (
          <div className="view-todo-details">
            <h3 className="text-xl font-bold mb-2">{viewingTodo.name}</h3>

            <div className="view-popup-header-row">
              <span
                className={`todo-status ${getStatusClass(viewingTodo.status)}`}
              >
                {getStatusLabel(viewingTodo.status)}
              </span>

              <span className="view-popup-timeline">
                <CalendarIcon
                  className="icon-calendar"
                  style={{ marginRight: "4px" }}
                />{" "}
                {viewingTodo.startDate
                  ? formatDate(viewingTodo.startDate)
                  : "N/A"}{" "}
                -{" "}
                {viewingTodo.endDate ? formatDate(viewingTodo.endDate) : "N/A"}
              </span>
            </div>

            <div className="view-popup-section">
              <p className="view-popup-content">{viewingTodo.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
