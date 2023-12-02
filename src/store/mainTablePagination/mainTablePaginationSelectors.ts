import { StateType } from 'store/store';

export const mainTablePaginationSelector = (state: StateType) =>
  state.mainTablePagination;
