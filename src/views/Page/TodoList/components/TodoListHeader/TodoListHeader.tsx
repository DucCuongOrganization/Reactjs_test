import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Select, Space } from "antd";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  setFilterStatus,
  setSearchQuery,
  setSortBy,
  SortOption,
} from "../../../../../store/slices/todoSlice";
import "./TodoListHeader.scss";

const { Search } = Input;

export const TodoListHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const searchQuery = useAppSelector((state) => state.todos.searchQuery);
  const filterStatus = useAppSelector((state) => state.todos.filterStatus);
  const sortBy = useAppSelector((state) => state.todos.sortBy);
  const sortDirection = useAppSelector((state) => state.todos.sortDirection);

  return (
    <Space direction="vertical" size="large" className="todo-list-header">
      {/* Title and Add Button */}
      <Flex justify="space-between" align="center">
        <h1 className="todo-list-title">📝 Todo List</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
          onClick={() => history.push("/todo-create")}
        >
          Add Task
        </Button>
      </Flex>

      {/* Filter, Search, Sort Toolbar */}
      <Flex gap="middle" wrap="wrap" align="center">
        <Search
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          onSearch={(value) => dispatch(setSearchQuery(value))}
          className="search-input"
          allowClear
        />

        <Select
          value={filterStatus}
          onChange={(value) => dispatch(setFilterStatus(value))}
          className="filter-select"
        >
          <Select.Option value="all">All Status</Select.Option>
          <Select.Option value="todo">To Do</Select.Option>
          <Select.Option value="in-progress">In Progress</Select.Option>
          <Select.Option value="done">Done</Select.Option>
        </Select>

        <Space.Compact>
          <Select
            value={sortBy}
            onChange={(value: SortOption) => dispatch(setSortBy(value))}
            className="sort-select"
          >
            <Select.Option value="none">No Sort</Select.Option>
            <Select.Option value="name">Name</Select.Option>
            <Select.Option value="date">Date</Select.Option>
            <Select.Option value="status">Status</Select.Option>
          </Select>

          {sortBy !== "none" && (
            <Button
              onClick={() => dispatch(setSortBy(sortBy))}
              aria-label={sortDirection === "asc" ? "Sort ascending, click to reverse" : "Sort descending, click to reverse"}
              title={
                sortDirection === "asc"
                  ? "Ascending (click to reverse)"
                  : "Descending (click to reverse)"
              }
            >
              {sortDirection === "asc" ? "↑" : "↓"}
            </Button>
          )}
        </Space.Compact>
      </Flex>
    </Space>
  );
};
