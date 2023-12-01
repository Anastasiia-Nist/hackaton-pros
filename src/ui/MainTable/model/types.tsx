import { DealerPriceItem } from 'store/dealerPrice/dealerPriceSlice';

export type MainTableDataType = {
  productName: JSX.Element;
  markedStatus: JSX.Element;
} & DealerPriceItem;
