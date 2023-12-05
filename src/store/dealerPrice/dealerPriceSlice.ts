import { createSlice } from '@reduxjs/toolkit';
import { MarkupType } from 'store/statistics/statisticsSlice';

export type DealerPriceItem = {
  product_key: string;
  price: string;
  product_url: string;
  product_name: string;
  is_marked: MarkupType | undefined;
  date: string;
  dealer_name: string;
  dealer_id: number;
  id: number;
};

export type DealerPriceState = {
  items: Array<DealerPriceItem>;
  total: number;
  page: number;
  size: number;
  pages: number;
};

const initialState: DealerPriceState = {
  items: [],
  total: 0,
  page: 0,
  size: 0,
  pages: 0,
};

const dealerPriceSlice = createSlice({
  name: 'dealerPrice',
  initialState,
  reducers: {
    setDealerPrice(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setDealerPrice } = dealerPriceSlice.actions;

export default dealerPriceSlice.reducer;
