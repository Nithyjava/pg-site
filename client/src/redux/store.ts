import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './auth/registerSlice';
import loginReducer from './auth/loginSlice';

// ...

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch