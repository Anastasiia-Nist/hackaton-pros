import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/consts/constants';
import { userApi } from './userApi';
import { User } from 'store/auth/authSlice';

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

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);

      return headers;
    },
  }),
  endpoints: (build) => ({
    signupUser: build.mutation<User, SignupUser>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    loginUser: build.mutation<
      { access_token: string; token_type: string },
      LoginUser
    >({
      query: (body) => ({
        url: 'auth/jwt/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getUser.initiate(null));
        } catch (error) {
          /* empty */
        }
      },
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: 'auth/jwt/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
