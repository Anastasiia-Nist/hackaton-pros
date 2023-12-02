import { createSlice } from '@reduxjs/toolkit';

export type MarkupType = 'да' | 'нет';

export type Staistics = {
  key: number;
  markup: number;
  last_update: string;
  state: MarkupType;
  id: number;
};

const initialState: Array<Staistics> = [];

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setStatistics(state, action) {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setStatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;
