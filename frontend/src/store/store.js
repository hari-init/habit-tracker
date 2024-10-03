import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import authSlice from './authSlice';

export default configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice
  },
});
