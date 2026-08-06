import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getUserProfile, userLogin, userLogout  } from './authApi'


// Define a type for the slice state
interface LoginState {
 loginisLoading: boolean;
 loginError: string | null;
 loginSuccess: boolean;
 userProfile: {
    name:string;
    email:string;
    role: string;
    location: string;
    userProfileImage: string;
 } | null; // Add userProfile to the state
}

// Define the initial state using that type
const initialState: LoginState = {
    loginisLoading: false,
    loginError: null,
    loginSuccess: false,
    userProfile: null,
}

export const LoginSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
     clearImmediateError: (state) => {
        state.loginError = null;
     }
  },
  extraReducers: (builder) => {
    builder
          .addCase(userLogin.pending, (state) => {
            state.loginisLoading = true;
            state.loginError = null;
          })
          .addCase(userLogin.fulfilled, (state, action) => {
            state.loginisLoading = false;
            state.loginSuccess = true;
            state.userProfile = action.payload.userPayload; // Set the user profile on successful login
            localStorage.setItem('accessToken', action.payload.accessToken); // Set the flag in localStorage
          })
          .addCase(userLogin.rejected, (state, action) => {
            state.loginisLoading = false;
            console.log('Error payload:', action.payload);
            state.loginError = action.payload.message as string | null;
          })
          .addCase(userLogout.fulfilled, (state) => {
            state.loginSuccess = false;
            state.userProfile = null; // Clear the user profile on logout
            localStorage.removeItem('accessToken'); // Remove the flag from localStorage on logout
          })
          .addCase(getUserProfile.pending, (state) => {
            state.loginisLoading = true;
          })
          .addCase(getUserProfile.fulfilled, (state, action) => {
            state.loginisLoading = false;
            state.userProfile = action.payload.user;
          })
  }
})

export const { clearImmediateError } = LoginSlice.actions


export default LoginSlice.reducer