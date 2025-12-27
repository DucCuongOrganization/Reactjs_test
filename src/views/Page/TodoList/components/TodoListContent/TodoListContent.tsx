import { Empty, Pagination } from "antd";
import { useHistory } from "react-router-dom";
import { ReactComponent as AttachmentIcon } from "../../../../../assets/svg/attachment.svg";
import { ReactComponent as CalendarIcon } from "../../../../../assets/svg/calendar.svg";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  setCurrentPage,
  setItemsPerPage,
  Todo,
} from "../../../../../store/slices/todoSlice";
import { formatDate } from "../../../../../utils/dateUtils";
import { isEmpty } from "lodash";

interface TodoListContentProps {
  filteredAndSortedTodos: Todo[];
  paginatedTodos: Todo[];
}

export const TodoListContent: React.FC<TodoListContentProps> = ({
  filteredAndSortedTodos,
  paginatedTodos,
}) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentPage = useAppSelector((state) => state.todos.currentPage);
  const itemsPerPage = useAppSelector((state) => state.todos.itemsPerPage);

  const getStatusClass = (status: string): string => {
    return `status-${status}`;
  };

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

  const handleTodoClick = (todoId: number) => {
    history.push(`/todo/${todoId}`);
  };

  // Early return for empty state
  if (isEmpty(filteredAndSortedTodos)) {
    return (
      <Empty
        description="No tasks yet. Add a new task! 🎯"
        style={{ marginTop: "3rem" }}
      />
    );
  }

  return (
    <>
      {/* Results count */}
      <div className="results-count">
        {filteredAndSortedTodos.length}{" "}
        {filteredAndSortedTodos.length === 1 ? "task" : "tasks"}
      </div>

      {/* Todo Grid */}
      <div className="todo-list">
        {paginatedTodos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${getStatusClass(todo.status)}`}
            onClick={() => handleTodoClick(todo.id)}
            style={{ cursor: "pointer" }}
          >
            {/* Todo content */}
            <div className="todo-content">
              <div className="todo-main">
                <h3
                  className="todo-name clickable"
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
          </div>
        ))}
      </div>

      {/* Pagination */}
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
    </>
  );
};
