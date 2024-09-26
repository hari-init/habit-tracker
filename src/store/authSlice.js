import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, provider } from '../firebase/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

//Thunk Middleware

//For Auth Check
export const isAuthenticated = createAsyncThunk(
  'isAuthenticated',
  async (thunk) => {
    try {
      const user = await new Promise((resolve, reject) => {
        auth.onAuthStateChanged(
          (user) => {
            if (user) {
              const { uid, email, displayName, photoURL } = user;
              resolve({ uid, email, displayName, photoURL });
            } else {
              resolve(null);
            }
          },
          (error) => reject(error)
        );
      });

      return user;
    } catch (error) {
      return thunk.rejectWithValue(error.message);
    }
  }
);

//For signIn
export const googleSignIn = createAsyncThunk('googleSignIn', async (thunk) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const { uid, email, displayName, photoURL } = user;
    return { uid, email, displayName, photoURL };
  } catch (error) {
    return thunk.rejectWithValue(error.message);
  }
});

//For SignOut

export const googleSignOut = createAsyncThunk(
  'googleSignOut',
  async (thunk) => {
    try {
      await signOut(auth, provider);
    } catch (error) {
      return thunk.rejectWithValue(error.message);
    }
  }
);

//Get image from blob
export const fetchImage = createAsyncThunk('profileImage', async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
});

//Actual Store
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(isAuthenticated.fulfilled, (state, action) => {
        console.log('isAuthenticated', action);
        state.user = action.payload;
      })
      .addCase(googleSignOut.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
