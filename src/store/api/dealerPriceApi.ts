import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/consts/constants';
import {
  DealerPriceState,
  setDealerPrice,
} from 'store/dealerPrice/dealerPriceSlice';

type GetDealerPrice = {
  dealer_id: number;
  page: number;
  size: number;
  name?: string;
  state?: string;
  start_date?: string;
  end_date?: string;
};

type GetDealerPriceAll = Omit<GetDealerPrice, 'dealer_id'>;

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
    getDealerpriceAll: builder.mutation<DealerPriceState, GetDealerPriceAll>({
      query(arg) {
        return {
          url: 'api/v1/dealerprice/',
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
    getDealerprice: builder.mutation<DealerPriceState, GetDealerPrice>({
      query({ dealer_id, ...arg }) {
        return {
          url: `api/v1/dealerprice/${dealer_id}`,
          params: { dealer_id, ...arg },
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
