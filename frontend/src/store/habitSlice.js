import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const habitSlice = createSlice({
  name: 'habits',
  initialState: {
    habits: ['test'],
    points: 0,
  },
  reducers: {
    setHabits: (state, action) => {
      const newHabits = action.payload.map((habit) => ({
        ...habit,
        points: habit.points || 0,
      }));
      state.habits = [...state.habits, ...newHabits];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateHabitToUser.fulfilled, (state, action) => {
        state.habits = [];
      })
      .addCase(getHabits.fulfilled, (state, action) => {
        // When habits are fetched, ensure the points are initialized if not set
        state.habits = action.payload.map((habit) => ({
          ...habit,
          points: habit.points || 0,
        }));
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        const { habitIndex, rewardPoints } = action.payload;
        if (state.habits[habitIndex]) {
          // Map through the habits array and update points for the specified habit
          state.habits = state.habits.map((habit, index) =>
            index === habitIndex
              ? { ...habit, points: (habit.points || 0) + rewardPoints }
              : habit
          );
        }
      })
      .addCase(updateHabitPoints.fulfilled, (state, action) => {
        state.points = action.payload.points;
      });
  },
});

export const updateHabitToUser = createAsyncThunk(
  'updateHabitToUser',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const habits = [state.habits.habits[state.habits.habits.length - 1]];
    try {
      const response = await axios.post(
        `https://habit-tracker-qiso.onrender.com/createHabit/`,
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
    const response = await axios.get(
      `https://habit-tracker-qiso.onrender.com/getHabits/${id}`
    );

    return response.data.habits;
  } catch (error) {
    console.error('Error fetching user:', error);
    return thunkAPI.rejectWithValue(error.message); // Handle the error
  }
});

// Add reward points
export const updateHabit = createAsyncThunk(
  'habits/updateHabit',
  async ({ email, habitIndex, rewardPoints }, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://habit-tracker-qiso.onrender.com/updateHabit`,
        {
          userID: email,
          habitIndex,
          rewardPoints,
        }
      );
      return { habitIndex, rewardPoints };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateHabitPoints = createAsyncThunk(
  'habits/updateHabitPoints',
  async ({ email, points }, thunkAPI) => {
    const state = thunkAPI.getState();
    const currentPoints = state.habits.points;

    // Prevent negative points
    if (currentPoints + points < 0) {
      return thunkAPI.rejectWithValue('Insufficient points');
    }

    try {
      const response = await axios.put(
        `https://habit-tracker-qiso.onrender.com/updateHabitPoints`,
        {
          userID: email,
          points,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const { setHabits } = habitSlice.actions;
export default habitSlice.reducer;
