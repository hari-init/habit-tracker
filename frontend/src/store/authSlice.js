import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, provider } from '../firebase/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import axios from 'axios';

//Thunk Middleware

//For Auth Check
export const isAuthenticated = createAsyncThunk(
  'isAuthenticated',
  async (_, thunkAPI) => { 
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
      if (user && user.email) {      
        const userData = await thunkAPI.dispatch(fetchUser(user.email)).unwrap(); 
        const { age, gender } = userData;      
        return { ...user, age, gender };  
      }
      return user;  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); 
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

export const updateUserDetails = createAsyncThunk(
  'updateUserDetails',
  async (updatedUser, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/updateUser/${updatedUser.email}`,
        { user: updatedUser }, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('User updated:', response.data.message);
      const {uid, email, displayName, photoURL, idToken , age, gender } = response.data.user; // Assuming the backend returns updated user data with age and gender
      return {uid, email, displayName, photoURL, idToken , age, gender };
     
    } catch (error) {
      console.error('Error updating user:', error);
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

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

//Fetch user from BE
export const fetchUser = createAsyncThunk(
  'fetchUser',
  async (email, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${email}`);
      
      return response.data.user;
      
    } catch (error) {
      console.error('Error fetching user:', error);
      return thunkAPI.rejectWithValue(error.message); // Handle the error
    }
  }
);

//For signIn
export const googleSignIn = createAsyncThunk(
  'googleSignIn',
  async (_, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      await checkAuthBackEnd(idToken);
      const { uid, email, displayName, photoURL } = user;
      await createUser(idToken, { uid, email, displayName, photoURL });
      const userData = await thunkAPI.dispatch(fetchUser(email)).unwrap(); 
      console.log(userData);
      const { age, gender } = userData;

      return { uid, email, displayName, photoURL, idToken, age, gender };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
       
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.error = action.payload; // Handle any error during the update
      });
    
  },
});

export default authSlice.reducer;
