import dayjs from 'dayjs';
import { MarkupType } from 'shared/consts/constants';
import { DealerPriceItem } from 'store/dealerPrice/dealerPriceSlice';

export const isMarkable = (markedType: string) => {
  switch (markedType) {
    case MarkupType.YES:
    case MarkupType.NO:
      return false;
    default:
      return true;
  }
};

export const prepareMarkup = (
  currentProduct: DealerPriceItem,
  varianId: number,
) => {
  return {
    key: currentProduct.dealerprice.id,
    dealer_id: currentProduct.dealerprice.dealer_id,
    product_id: varianId,
  };
};

export const prepareStatistics = (
  currentProduct: DealerPriceItem,
  markupType: string,
  selectedProductVariant?: number,
) => {
  return {
    key: currentProduct.dealerprice.id,
    markup: selectedProductVariant,
    last_update: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    state: markupType,
  };
};
