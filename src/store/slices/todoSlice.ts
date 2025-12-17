import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoAttachment {
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface Todo {
  id: number;
  name: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  startDate?: string;
  endDate?: string;
  attachments: TodoAttachment[];
}

export type SortOption = "name" | "date" | "status" | "none";
export type SortDirection = "asc" | "desc";

interface TodoState {
  todos: Todo[];
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  filterStatus: "all" | "todo" | "in-progress" | "done";
  sortBy: SortOption;
  sortDirection: SortDirection;
}

// Generate 30 sample tasks
const generateSampleTodos = (): Todo[] => {
  const statuses: ("todo" | "in-progress" | "done")[] = [
    "todo",
    "in-progress",
    "done",
  ];
  const sampleTodos: Todo[] = [];

  for (let i = 1; i <= 30; i++) {
    sampleTodos.push({
      id: i,
      name: `Task ${i}`,
      description: `This is the description for task ${i}. It contains important details about what needs to be done.`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      startDate: new Date(2024, 0, i).toISOString().split("T")[0],
      endDate: new Date(2024, 0, i + 7).toISOString().split("T")[0],
      attachments: [],
    });
  }

  return sampleTodos;
};

const initialState: TodoState = {
  todos: generateSampleTodos(),
  currentPage: 1,
  itemsPerPage: 10,
  searchQuery: "",
  filterStatus: "all",
  sortBy: "none",
  sortDirection: "asc",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id">>) => {
      const newId =
        state.todos.length > 0
          ? Math.max(...state.todos.map((t) => t.id)) + 1
          : 1;
      state.todos.push({
        ...action.payload,
        id: newId,
      });
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    reorderTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    setFilterStatus: (
      state,
      action: PayloadAction<"all" | "todo" | "in-progress" | "done">
    ) => {
      state.filterStatus = action.payload;
      state.currentPage = 1; // Reset to first page when filtering
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      // If clicking the same sort option, toggle direction
      if (state.sortBy === action.payload && action.payload !== "none") {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = action.payload;
        state.sortDirection = "asc"; // Reset to ascending for new sort
      }
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.filterStatus = "all";
      state.sortBy = "none";
      state.sortDirection = "asc";
      state.currentPage = 1;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  reorderTodos,
  setCurrentPage,
  setItemsPerPage,
  setSearchQuery,
  setFilterStatus,
  setSortBy,
  resetFilters,
} = todoSlice.actions;
export default todoSlice.reducer;
