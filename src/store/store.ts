import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import popupsSlice from './popups/popupsSlice';
import filtersSlice from './filters/filtersSlice';
import mainTablePagination from './mainTablePagination/mainTablePagination';
import authSlice from './auth/authSlice';
import dealerPriceSlice from './dealerPrice/dealerPriceSlice';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { dealerPriceApi } from './api/dealerPriceApi';
import productSlice from './product/productSlice';

const saveToLocalStorage = (state: StateType) => {
  try {
    localStorage.setItem('store', JSON.stringify(state));
  } catch (error) {
    /* empty */
  }
};

const loadFromLocalStorage = () => {
  try {
    const savedStoreStr = localStorage.getItem('store');
    const savedStore = savedStoreStr ? JSON.parse(savedStoreStr) : {};
    return savedStore;
  } catch (error) {
    console.log(error);
    return {};
    /* empty */
  }
};

const initialState = loadFromLocalStorage();

const store = configureStore({
  preloadedState: initialState,
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [dealerPriceApi.reducerPath]: dealerPriceApi.reducer,
    auth: authSlice,
    popups: popupsSlice,
    filters: filtersSlice,
    mainTablePagination: mainTablePagination,
    dealerPrice: dealerPriceSlice,
    product: productSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      dealerPriceApi.middleware,
    ),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
