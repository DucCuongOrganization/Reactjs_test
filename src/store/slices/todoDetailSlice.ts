import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoDetailState {
  isEditMode: boolean;
  isSubmitting: boolean;
}

const initialState: TodoDetailState = {
  isEditMode: false,
  isSubmitting: false,
};

const todoDetailSlice = createSlice({
  name: "todoDetail",
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.isEditMode = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    resetDetailState: (state) => {
      state.isEditMode = false;
      state.isSubmitting = false;
    },
  },
});

export const { setEditMode, setSubmitting, resetDetailState } =
  todoDetailSlice.actions;

export default todoDetailSlice.reducer;
