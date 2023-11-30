import { createSlice } from '@reduxjs/toolkit';

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
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
