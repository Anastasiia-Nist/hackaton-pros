import { createSlice } from '@reduxjs/toolkit';

export type MarkupState = {
  queueVariant: Array<number>;
  markedCount: number;
  successMarkups: number;
  failedMarkups: number;
  deffered: number;
  date: Date;
};

const initialState: MarkupState = {
  queueVariant: [],
  markedCount: 0,
  successMarkups: 0,
  failedMarkups: 0,
  deffered: 0,
  date: new Date(),
};

const currentSessionSlice = createSlice({
  name: 'dealers',
  initialState,
  reducers: {
    setCurrentSession(state, action) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setCurrentSession } = currentSessionSlice.actions;

export default currentSessionSlice.reducer;
