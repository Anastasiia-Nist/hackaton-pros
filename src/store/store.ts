import { configureStore } from '@reduxjs/toolkit';
import popupsSlice, { PopupsState } from './popups/popupsSlice';
import filtersSlice, { FiltersState } from './filters/filtersSlice';
import mainTablePagination, {
  MainTablePagination,
} from './mainTablePagination/mainTablePagination';
import authSlice, { AuthState } from './auth/authSlice';
import { useDispatch } from 'react-redux';

export type StateType = {
  auth: AuthState;
  popups: PopupsState;
  filters: FiltersState;
  mainTablePagination: MainTablePagination;
};

const store = configureStore({
  reducer: {
    auth: authSlice,
    popups: popupsSlice,
    filters: filtersSlice,
    mainTablePagination: mainTablePagination,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
