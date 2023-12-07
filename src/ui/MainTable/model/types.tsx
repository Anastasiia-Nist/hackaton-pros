import { DealerPriceItemFlat } from 'store/dealerPrice/dealerPriceSlice';

export type MainTableDataType = DealerPriceItemFlat & {
  productName: JSX.Element;
  markedStatus: JSX.Element;
  productKey: JSX.Element;
};
