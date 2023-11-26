import { configureStore } from '@reduxjs/toolkit';
import popupsSlice, { PopupsState } from './popupsSlice';

export type StateType = {
  popups: PopupsState;
};

export default configureStore({
  reducer: {
    popups: popupsSlice,
  },
});
