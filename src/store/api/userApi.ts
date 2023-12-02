import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/consts/constants';
import { setUser } from 'store/auth/authSlice';
import { User } from 'store/auth/authSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => ({
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, null>({
      query() {
        return {
          url: 'me',
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          /* empty */
        }
      },
    }),
  }),
});
