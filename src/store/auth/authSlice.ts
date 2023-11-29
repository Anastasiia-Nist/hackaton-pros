import { createSlice } from '@reduxjs/toolkit';
import { fetchUserByToken, loginUser, signupUser } from './authApi';

export type User = {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  first_name: string;
  last_name: string;
};

export type AuthState = {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isFetching: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: AuthState = {
  token: null,
  user: null,
  isLoggedIn: false,
  isFetching: false,
  isError: false,
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
    },
    setUser(state, action) {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state) => {
      state.isFetching = false;
      state.isError = false;
      state.errorMessage = '';
    });
    builder.addCase(signupUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(signupUser.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      console.log(payload);
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.access_token;
      state.isFetching = false;
      state.isError = false;
      state.isLoggedIn = true;
      state.errorMessage = '';
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      console.log(action.payload);
    });

    builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
      state.isError = false;
      state.errorMessage = '';
    });
    builder.addCase(fetchUserByToken.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUserByToken.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      console.log(action.payload);
    });
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
