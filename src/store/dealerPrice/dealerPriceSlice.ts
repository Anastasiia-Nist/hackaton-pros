import { createSlice } from '@reduxjs/toolkit';
import { Markup } from 'store/markup/markupSlice';

export type DealerPriceItem = {
  dealer: string;
  marked_product?: Markup;
  dealerprice: {
    product_key: string;
    price: string;
    product_url: string;
    product_name: string;
    date: string;
    dealer_id: number;
    id: number;
  };
  state: string;
  currentIndex: number;
};

export type DealerPriceItemFlat = {
  dealer: string;
  product_key: string;
  price: string;
  product_url: string;
  product_name: string;
  date: string;
  dealer_id: number;
  id: number;
  state: string;
  currentIndex: number;
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

type ActionType = {
  type: string;
  payload: DealerPriceState;
};

const dealerPriceSlice = createSlice({
  name: 'dealerPrice',
  initialState,
  reducers: {
    setDealerPrice(state, action: ActionType) {
      const items = action.payload.items.map((item, index) => ({
        ...item,
        currentIndex: index,
      }));
      state = { ...action.payload, items };
      return state;
    },
  },
});

export const { setDealerPrice } = dealerPriceSlice.actions;

export default dealerPriceSlice.reducer;
