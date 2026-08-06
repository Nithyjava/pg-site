import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userRegister } from './authApi'


// Define a type for the slice state
interface RegisterState {
 isLoading: boolean;
 error: string | null;
 registerSuccess: boolean;
}

// Define the initial state using that type
const initialState: RegisterState = {
    isLoading: false,
    error: null,
    registerSuccess: false,
}

export const RegisterSlice = createSlice({
  name: 'register',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
     clearImmediateError: (state) => {
        state.error = null;
     }
  },
  extraReducers: (builder) => {
    builder
          .addCase(userRegister.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(userRegister.fulfilled, (state) => {
            state.isLoading = false;
            state.registerSuccess = true;
          })
          .addCase(userRegister.rejected, (state, action) => {
            state.isLoading = false;
            console.log('Error payload:', action.payload);
            state.error = action.payload.message as string | null;
          })

  }
})

export const { clearImmediateError } = RegisterSlice.actions


export default RegisterSlice.reducer