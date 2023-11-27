import { createSlice } from '@reduxjs/toolkit';

export type MarkedType = 'all' | 'marked' | 'unmarked';

export type MainTableFilter = {
  name: {
    value: string;
  };
  marked: {
    value: MarkedType;
  };
  dateRange: {
    dateFrom: string;
    dateTo: string;
  };
  dealer: {
    value: string;
  };
};

export type FiltersState = {
  mainTable: MainTableFilter;
};

const mainTableInitial: MainTableFilter = {
  name: {
    value: '',
  },
  marked: {
    value: 'all',
  },
  dateRange: {
    dateFrom: '',
    dateTo: '',
  },
  dealer: {
    value: '',
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
