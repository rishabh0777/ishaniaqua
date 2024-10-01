// authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../Firebase/firebaseConfig'; // Make sure this path is correct
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

// Async thunk to handle user signup
export const signUpUser = createAsyncThunk('auth/signUpUser', async ({ email, password }, thunkAPI) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user);  // Send email verification
        return user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message); // Handle error
    }
});

// Async thunk to handle user login
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, thunkAPI) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message); // Handle error
    }
});

// Slice for authentication
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { uid: action.payload.uid, ...action.payload }; // Store the UID
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Handle error if signup fails
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
             .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { uid: action.payload.uid, ...action.payload }; // Store the UID
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Handle error if login fails
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
