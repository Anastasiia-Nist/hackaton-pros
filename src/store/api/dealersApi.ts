import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/consts/constants';
import { DealersState, setDealers } from 'store/dealers/dealersSlice';

export const dealersApi = createApi({
  reducerPath: 'dealersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDealers: builder.mutation<DealersState, { page: number; size: number }>({
      query(arg) {
        return {
          url: 'dealer/',
          params: { ...arg },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setDealers(data));
        } catch (error) {
          /* empty */
        }
      },
    }),
  }),
});

export const { useGetDealersMutation } = dealersApi;
