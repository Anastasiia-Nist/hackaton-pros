import { configureStore } from '@reduxjs/toolkit';
import popupsSlice, { PopupsState } from './popups/popupsSlice';
import filtersSlice, { FiltersState } from './filters/filtersSlice';
import mainTablePagination, {
  MainTablePagination,
} from './mainTablePagination/mainTablePagination';

export type StateType = {
  popups: PopupsState;
  filters: FiltersState;
  mainTablePagination: MainTablePagination;
};

export default configureStore({
  reducer: {
    popups: popupsSlice,
    filters: filtersSlice,
    mainTablePagination: mainTablePagination,
  },
});
