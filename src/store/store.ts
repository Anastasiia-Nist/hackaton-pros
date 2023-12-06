import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import popupsSlice from './popups/popupsSlice';
import filtersSlice from './filters/filtersSlice';
import mainTablePagination from './mainTablePagination/mainTablePagination';
import authSlice from './auth/authSlice';
import dealerPriceSlice from './dealerPrice/dealerPriceSlice';
import markupSlice from './markup/markupSlice';
import productSlice from './product/productSlice';
import dealersSlice from './dealers/dealersSlice';
import dealersPaginationSlice from './dealersPagination/dealersPaginationSlice';
import statisticsSlice from './statistics/statisticsSlice';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { dealerPriceApi } from './api/dealerPriceApi';
import { dealersApi } from './api/dealersApi';
import { markupApi } from './api/markupApi';
import { statisticsApi } from './api/statisticsApi';
import currentSessionSlice from './currentSession/currentSessionSlice';
import { TOKEN } from 'shared/consts/constants';
import dayjs from 'dayjs';

(() => {
  localStorage.setItem('token', TOKEN);
})();

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
    if ('currentSession' in savedStore && savedStore.currentSession) {
      if (dayjs(savedStore.currentSession.date).isBefore(dayjs())) {
        delete savedStore.currentSession;
      }
    } else {
      delete savedStore.currentSession;
    }

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
    [dealersApi.reducerPath]: dealersApi.reducer,
    [markupApi.reducerPath]: markupApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    auth: authSlice,
    popups: popupsSlice,
    filters: filtersSlice,
    mainTablePagination: mainTablePagination,
    dealersPagination: dealersPaginationSlice,
    dealers: dealersSlice,
    dealerPrice: dealerPriceSlice,
    product: productSlice,
    markup: markupSlice,
    statistics: statisticsSlice,
    currentSession: currentSessionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      dealerPriceApi.middleware,
      dealersApi.middleware,
      markupApi.middleware,
      statisticsApi.middleware,
    ),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
