import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";
import todoDetailSlice from "./slices/todoDetailSlice";

import tarotSlice from "./slices/tarotSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    todoDetail: todoDetailSlice,
    tarot: tarotSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
