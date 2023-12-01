import { StateType } from 'store/store';

export const mainTableCurrentPageSelector = (state: StateType) =>
  state.mainTablePagination.currentPage;

export const mainTablePageSizeSelector = (state: StateType) =>
  state.mainTablePagination.pageSize;

export const mainTableTotalCountSelector = (state: StateType) =>
  state.mainTablePagination.totalCount;
