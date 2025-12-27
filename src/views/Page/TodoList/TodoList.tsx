import { JSX, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetFilters } from "../../../store/slices/todoSlice";
import { TodoListContent } from "./components/TodoListContent";
import { TodoListHeader } from "./components/TodoListHeader";
import "./TodoList.scss";

export default function TodoList(): JSX.Element {
  // Redux state and dispatch
  const dispatch = useAppDispatch();

  const {
    todos,
    currentPage,
    itemsPerPage,
    searchQuery,
    filterStatus,
    sortBy,
    sortDirection,
  } = useAppSelector((state) => state.todos);

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

  // Reset filters when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  return (
    <div className="todo-container">
      <TodoListHeader />

      <TodoListContent
        filteredAndSortedTodos={filteredAndSortedTodos}
        paginatedTodos={paginatedTodos}
      />
    </div>
  );
}
