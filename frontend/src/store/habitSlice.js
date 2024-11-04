import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const habitSlice = createSlice({
  name: 'habits',
  initialState: {
    habits: ['test'],
  },
  reducers: {
    setHabits: (state, action) => {
      state.habits = [...state.habits, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateHabitToUser.fulfilled, (state, action) => {
        state.habits = action.payload.habits;
      })
      .addCase(getHabits.fulfilled, (state, action) => {
        state.habits = action.payload;
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
export const getHabits = createAsyncThunk('getHabits', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:3001/getHabits/${id}`);

    return response.data.habits;
  } catch (error) {
    console.error('Error fetching user:', error);
    return thunkAPI.rejectWithValue(error.message); // Handle the error
  }
});

export const { setHabits } = habitSlice.actions;
export default habitSlice.reducer;
