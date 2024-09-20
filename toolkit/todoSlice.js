import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
    name: 'todos',
    initialState:  {
      todo:[] 
    },
    reducers: {
        addTodo: (state, action) => {
            state.todo.push(action.payload);
        },
        deleteTodo: (state, action) => {
          state.todo = state.todo.filter(todos => todos.id !== action.payload);
        },
        editTodo: (state, action) => {
            const index = state.todo.findIndex(todos => todos.id === action.payload.id);
            if (index !== -1) {
                state.todo[index] = {...state.todo[index], ...action.payload};
            }
        },
    }
});

export const { addTodo, deleteTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;
