import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter', // Name of the slice
  initialState: {
    // Initial state where the app loads with
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions; // to make the reducers update the value immutably
export default counterSlice.reducer;
