import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/consts/constants';
import {
  DealerPriceState,
  setDealerPrice,
} from 'store/dealerPrice/dealerPriceSlice';

export const dealerPriceApi = createApi({
  reducerPath: 'dealerPriceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDealerpriceAll: builder.mutation<
      DealerPriceState,
      { page: number; size: number }
    >({
      query(arg) {
        return {
          url: 'dealerprice',
          params: { ...arg },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setDealerPrice(data));
        } catch (error) {
          /* empty */
        }
      },
    }),
    getDealerprice: builder.mutation<
      DealerPriceState,
      { dealer_id: number; page: number; size: number }
    >({
      query({ dealer_id, page, size }) {
        return {
          url: `dealerprice/${dealer_id}`,
          params: { page, size },
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setDealerPrice(data));
        } catch (error) {
          /* empty */
        }
      },
    }),
  }),
});

export const { useGetDealerpriceAllMutation, useGetDealerpriceMutation } =
  dealerPriceApi;
