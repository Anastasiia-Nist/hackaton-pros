import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from 'shared/consts/constants';

type SignupUser = {
  email: string;
  password: string;
  isActive?: boolean;
  isSuperuser?: boolean;
  isVerified?: boolean;
  firstName?: string;
  lastName?: string;
};

type LoginUser = {
  email: string;
  password: string;
};

type FetchUser = {
  token: string;
};

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (
    {
      email,
      password,
      isActive = true,
      isSuperuser = false,
      isVerified = false,
      firstName = '',
      lastName = '',
    }: SignupUser,
    thunkAPI,
  ) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          isActive,
          isSuperuser,
          isVerified,
          firstName,
          lastName,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        statusCode: response.status,
        data,
      });
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginUser, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        statusCode: response.status,
        data,
      });
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const fetchUserByToken = createAsyncThunk(
  'auth/fetchUserByToken',
  async ({ token }: FetchUser, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        statusCode: response.status,
        data,
      });
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue(error);
    }
  },
);
