import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/getTodos", async () => {
  const res = await axios.get(
    "https://6319b8d48e51a64d2beaaef3.mockapi.io/todos"
  );
  return res.data;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      axios.post(
        "https://6319b8d48e51a64d2beaaef3.mockapi.io/todos",
        action.payload
      );
    },
  },
  extraReducers: {
    [fetchTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
    },
  },
});
export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
