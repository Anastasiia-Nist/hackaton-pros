import { createSlice } from '@reduxjs/toolkit';
import type { MarkupType } from 'shared/consts/constants';
import { MarkupType as MarkupTypeValue } from 'shared/consts/constants';

export type MainTableFilter = {
  name: {
    value: string | undefined;
  };
  markupState: {
    value: MarkupType | undefined;
  };
  dateRange: {
    dateFrom: string | undefined;
    dateTo: string | undefined;
  };
};

export type FiltersState = {
  mainTable: MainTableFilter;
};

const mainTableInitial: MainTableFilter = {
  name: {
    value: '',
  },
  markupState: {
    value: MarkupTypeValue.ALL,
  },
  dateRange: {
    dateFrom: undefined,
    dateTo: undefined,
  },
};

const initialState: FiltersState = {
  mainTable: mainTableInitial,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMainTableFilter(state: FiltersState, action) {
      return { ...state, mainTable: { ...state.mainTable, ...action.payload } };
    },
    resetMainTableFilter(state: FiltersState) {
      return { ...state, mainTable: mainTableInitial };
    },
  },
});

export const { setMainTableFilter, resetMainTableFilter } =
  filtersSlice.actions;

export default filtersSlice.reducer;
