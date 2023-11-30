import { configureStore } from '@reduxjs/toolkit';
import popupsSlice from './popups/popupsSlice';
import filtersSlice from './filters/filtersSlice';
import mainTablePagination from './mainTablePagination/mainTablePagination';
import authSlice from './auth/authSlice';
import { useDispatch } from 'react-redux';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authSlice,
    popups: popupsSlice,
    filters: filtersSlice,
    mainTablePagination: mainTablePagination,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
