import { createSlice } from '@reduxjs/toolkit';

export type MainTablePagination = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
};

const initialState: MainTablePagination = {
  currentPage: 1,
  pageSize: 20,
  totalCount: 50,
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
});

export const { setMainTableCurrentPage, setMainTablePageSize } =
  mainTablePaginationSlice.actions;

export default mainTablePaginationSlice.reducer;
