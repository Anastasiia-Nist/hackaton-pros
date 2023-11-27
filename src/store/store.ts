import { configureStore } from '@reduxjs/toolkit';
import popupsSlice, { PopupsState } from './popups/popupsSlice';
import filtersSlice, { FiltersState } from './filters/filtersSlice';

export type StateType = {
  popups: PopupsState;
  filters: FiltersState;
};

export default configureStore({
  reducer: {
    popups: popupsSlice,
    filters: filtersSlice,
  },
});
