import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
    },
    completeTask: (state, action) => {
      const taskIndex = state.value.findIndex(e => e.id === action.payload);
      state.value[taskIndex] = { ...state.value[taskIndex], completed: !state.value[taskIndex].completed };
    },
    deleteTask: (state, action) => {
      state.value = state.value.filter(e => e.id !== action.payload);
    },
  },
});

export const { addTask, completeTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
