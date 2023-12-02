import { createSlice } from '@reduxjs/toolkit';

export type Dealer = {
  name: string;
  id: number;
  key?: number;
};

export type DealersState = {
  items: Array<Dealer>;
  total: number;
  page: number;
  size: number;
  pages: number;
  currentDealer: Dealer | null;
};

const initialState: DealersState = {
  items: [],
  total: 0,
  page: 0,
  size: 0,
  pages: 0,
  currentDealer: null,
};

const dealersSlice = createSlice({
  name: 'dealers',
  initialState,
  reducers: {
    setDealers(state, action) {
      state = { ...state, ...action.payload };
      return state;
    },

    setCurrentDealer(state, action) {
      state.currentDealer = action.payload;
      return state;
    },
  },
});

export const { setDealers, setCurrentDealer } = dealersSlice.actions;

export default dealersSlice.reducer;
