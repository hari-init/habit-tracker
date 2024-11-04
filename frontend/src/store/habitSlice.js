import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const habitSlice = createSlice({
  name: 'habits',
  initialState: {
    habits: [],
  },
  reducers: {
    setHabits: (state, action) => {
      state.habits = [...state.habits, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateHabitToUser.fulfilled, (state, action) => {
      state.habits = state.habits;
    });
  },
});

export const updateHabitToUser = createAsyncThunk(
  'updateHabitToUser',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const habits = state.habits.habits;
    try {
      const response = await axios.post(
        `http://localhost:3001/createHabit/`,
        { habits: habits, id },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('habits updated:', response.data.message);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const { setHabits } = habitSlice.actions;
export default habitSlice.reducer;
