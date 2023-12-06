import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/consts/constants';
import { MarkupState, setMarkup } from 'store/markup/markupSlice';

export type MarkupFuncProps = {
  key: number;
  dealer_id: number;
  product_id: number;
};

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
          url: `api/v1/markup/${arg.productId}`,
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
    postMarkup: builder.mutation<{ id: number }, MarkupFuncProps>({
      query(arg) {
        return {
          url: `api/v1/productdealerkey`,
          method: 'POST',
          body: arg,
        };
      },
    }),
    patchMarkup: builder.mutation<{ id: number }, MarkupFuncProps>({
      query(arg) {
        return {
          url: `api/v1/productdealerkey/${arg.key}`,
          method: 'POST',
          body: arg,
        };
      },
    }),
    deleteMarkup: builder.mutation<
      { id: number },
      {
        productdealerkey_id: number;
      }
    >({
      query(arg) {
        return {
          url: `productdealerkey/${arg.productdealerkey_id}`,
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
