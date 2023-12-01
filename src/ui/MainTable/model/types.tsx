import { DealerPriceItem } from 'store/dealerPrice/dealerPriceSlice';

export type MainTableDataType = {
  markedStatus: JSX.Element;
} & DealerPriceItem;
