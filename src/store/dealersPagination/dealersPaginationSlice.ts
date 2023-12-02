import { createSlice } from '@reduxjs/toolkit';
import { dealersApi } from 'store/api/dealersApi';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'utils/constans';

export type DealersPagination = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const initialState: DealersPagination = {
  currentPage: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  totalCount: 0,
};

const dealersPaginationSlice = createSlice({
  name: 'dealersPagination',
  initialState,
  reducers: {
    setDealersCurrentPage(state: DealersPagination, action) {
      return { ...state, currentPage: action.payload };
    },
    setDealersPageSize(state: DealersPagination, action) {
      return { ...state, pageSize: action.payload };
    },

    setDealersTotalCount(state: DealersPagination, action) {
      return { ...state, totalCount: action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      dealersApi.endpoints.getDealers.matchFulfilled,
      (state, action) => {
        state.totalCount = action.payload.total;
      },
    );
  },
});

export const {
  setDealersCurrentPage,
  setDealersPageSize,
  setDealersTotalCount,
} = dealersPaginationSlice.actions;

export default dealersPaginationSlice.reducer;
