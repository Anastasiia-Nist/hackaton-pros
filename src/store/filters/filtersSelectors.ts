import { StateType } from 'store/store';

export const mainTableFilterSelector = (state: StateType) => {
  return state.filters.mainTable;
};
