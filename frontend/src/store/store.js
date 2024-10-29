import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import authSlice from './authSlice';
import habitSlice from './habitSlice';

export default configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    habits: habitSlice,
  },
});
