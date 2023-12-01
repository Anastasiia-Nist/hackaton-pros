import { createSlice } from '@reduxjs/toolkit';
import { dealerPriceApi } from 'store/api/dealerPriceApi';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'utils/constans';

export type MainTablePagination = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const initialState: MainTablePagination = {
  currentPage: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  totalCount: 0,
};

const mainTablePaginationSlice = createSlice({
  name: 'mainTablePagination',
  initialState,
  reducers: {
    setMainTableCurrentPage(state: MainTablePagination, action) {
      return { ...state, currentPage: action.payload };
    },
    setMainTablePageSize(state: MainTablePagination, action) {
      return { ...state, pageSize: action.payload };
    },

    setMainTableTotalCount(state: MainTablePagination, action) {
      return { ...state, totalCount: action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      dealerPriceApi.endpoints.getDealerpriceAll.matchFulfilled,
      (state, action) => {
        state.totalCount = action.payload.total;
      },
    );
    builder.addMatcher(
      dealerPriceApi.endpoints.getDealerprice.matchFulfilled,
      (state, action) => {
        state.totalCount = action.payload.total;
      },
    );
  },
});

export const { setMainTableCurrentPage, setMainTablePageSize } =
  mainTablePaginationSlice.actions;

export default mainTablePaginationSlice.reducer;
