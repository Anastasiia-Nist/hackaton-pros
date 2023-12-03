import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/consts/constants';
import { MarkupState, setMarkup } from 'store/markup/markupSlice';

export const markupApi = createApi({
  reducerPath: 'markupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMarkup: builder.mutation<MarkupState, { productId: number }>({
      query(arg) {
        return {
          url: `markup/${arg.productId}`,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMarkup(data));
        } catch (error) {
          /* empty */
        }
      },
    }),
    postMarkup: builder.mutation<
      { id: number },
      {
        key: number;
        dealer_id: number;
        product_id: number;
      }
    >({
      query(arg) {
        return {
          url: `productdealerkey`,
          method: 'POST',
          body: arg,
        };
      },
    }),
    patchMarkup: builder.mutation<
      { id: number },
      {
        key: number;
        dealer_id: number;
        product_id: number;
      }
    >({
      query(arg) {
        return {
          url: `productdealerkey/${arg.key}`,
          method: 'POST',
          body: arg,
        };
      },
    }),
    deleteMarkup: builder.mutation<
      { id: number },
      {
        key: number;
      }
    >({
      query(arg) {
        return {
          url: `productdealerkey/${arg.key}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetMarkupMutation,
  usePostMarkupMutation,
  useDeleteMarkupMutation,
  usePatchMarkupMutation,
} = markupApi;
