import { createSlice } from '@reduxjs/toolkit';
import { DealerPriceItem } from 'store/dealerPrice/dealerPriceSlice';

const initialState: DealerPriceItem = {
  dealer: '',
  dealerprice: {
    product_key: '',
    price: '',
    product_url: '',
    product_name: '',
    date: '',
    dealer_id: 0,
    id: 0,
  },
  state: '',
  currentIndex: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
