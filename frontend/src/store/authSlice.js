import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, provider } from '../firebase/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import axios from 'axios';

//Thunk Middleware

//For Auth Check
export const isAuthenticated = createAsyncThunk(
  'isAuthenticated',
  async (thunk) => {
    try {
      const user = await new Promise((resolve, reject) => {
        auth.onAuthStateChanged(
          async (user) => {
            if (user) {
              const { uid, email, displayName, photoURL } = user;
              const idToken = await user.getIdToken();
              resolve({ uid, email, displayName, photoURL, idToken });
            } else {
              resolve(null);
            }
          },
          (error) => reject(error)
        );
      });

      return { ...user };
    } catch (error) {
      return thunk.rejectWithValue(error.message);
    }
  }
);

//Backend verification

const checkAuthBackEnd = async (idToken) => {
  await axios
    .post(
      'http://localhost:3001/authCheck',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${idToken}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
};

//Create user in BE
const createUser = async (idToken, user) => {
  await axios
    .post(
      'http://localhost:3001/createUser',
      { user },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${idToken}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
};

//For signIn
export const googleSignIn = createAsyncThunk('googleSignIn', async (thunk) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();
    await checkAuthBackEnd(idToken);
    const { uid, email, displayName, photoURL } = user;
    await createUser(idToken, { uid, email, displayName, photoURL });
    return { uid, email, displayName, photoURL, idToken };
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
