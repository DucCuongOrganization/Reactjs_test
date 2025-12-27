import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";
import todoDetailSlice from "./slices/todoDetailSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    todoDetail: todoDetailSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
