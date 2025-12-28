import { Card, Empty, List, Pagination, Space, Typography } from "antd";
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
import { getStatusLabel } from "../../../../../utils/statusUtils";
import { StatusTag } from "../../../../common/StatusTag";
import { isEmpty } from "lodash";

const { Title, Text, Paragraph } = Typography;

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

  const handleTodoClick = (todoId: number) => {
    history.push(`/todo/${todoId}`);
  };

  // Early return for empty state
  if (isEmpty(filteredAndSortedTodos)) {
    return <Empty description="No tasks yet. Add a new task! 🎯" />;
  }

  return (
    <>
      {/* Results count */}
      <div className="results-count">
        {filteredAndSortedTodos.length}{" "}
        {filteredAndSortedTodos.length === 1 ? "task" : "tasks"}
      </div>

      {/* Todo Grid - 2 columns with 1rem gap */}
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={paginatedTodos}
        renderItem={(todo) => (
          <List.Item>
            <Card
              hoverable
              onClick={() => handleTodoClick(todo.id)}
              className={`todo-item-card status-${todo.status}`}
            >
              <Space direction="vertical" size="small" className="card-content">
                {/* Title and Status */}
                <div className="card-header">
                  <Title level={4} className="todo-name" ellipsis>
                    {todo.name}
                  </Title>
                  <StatusTag status={todo.status}>
                    {getStatusLabel(todo.status)}
                  </StatusTag>
                </div>

                {/* Description */}
                <Paragraph
                  ellipsis={{ rows: 2 }}
                  className="todo-description"
                  type="secondary"
                >
                  {todo.description}
                </Paragraph>

                {/* Metadata (Date & Attachments) */}
                <Space size="large" className="todo-meta">
                  {(todo.startDate || todo.endDate) && (
                    <Text type="secondary" className="todo-date">
                      <CalendarIcon className="icon-calendar" />
                      {todo.startDate
                        ? formatDate(todo.startDate)
                        : "N/A"} -{" "}
                      {todo.endDate ? formatDate(todo.endDate) : "N/A"}
                    </Text>
                  )}
                  {todo.attachments && todo.attachments.length > 0 && (
                    <Text type="secondary" className="todo-attachments">
                      <AttachmentIcon className="icon-attachment" />
                      {todo.attachments.length} file(s)
                    </Text>
                  )}
                </Space>
              </Space>
            </Card>
          </List.Item>
        )}
      />

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
