import { createSlice } from '@reduxjs/toolkit';

export enum MarkupType {
  YES = 'да',
  NO = 'нет',
  DEFFERED = 'отложить',
}

export type Markup = {
  key: number;
  product_id: number;
  create_date: string;
  queue: number;
  quality: number;
  id: number;
};

export type MarkupState = {
  items: Array<Markup>;
  total: number;
  page: number;
  size: number;
  pages: number;
};

const initialState: MarkupState = {
  items: [],
  total: 0,
  page: 0,
  size: 0,
  pages: 0,
};

const markupSlice = createSlice({
  name: 'dealers',
  initialState,
  reducers: {
    setMarkup(state, action) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setMarkup } = markupSlice.actions;

export default markupSlice.reducer;
