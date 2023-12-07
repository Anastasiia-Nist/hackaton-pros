import { useState } from 'react';
import {
  DealerPriceItem,
  DealerPriceState,
} from 'store/dealerPrice/dealerPriceSlice';
// import { useAppDispatch } from 'store/store';

type UseProductSwitcherProps = {
  product: DealerPriceItem;
  dealerPrice: DealerPriceState;
};

export const useProductSwitcher = ({
  product,
  dealerPrice,
}: UseProductSwitcherProps) => {
  const [isBeginOfList, setIsBeginOfList] = useState(isFirstProduct());
  const [isEndOfList, setIsEndOfList] = useState(isLastProduct());

  // const dispatch = useAppDispatch();

  function isFirstProduct() {
    if (dealerPrice.page === 1 && product.currentIndex + 1 === 1) {
      return true;
    }
    return false;
  }

  function isLastProduct() {
    if (
      dealerPrice.page === dealerPrice.pages &&
      product.currentIndex + 1 === dealerPrice.total
    ) {
      return true;
    }
    return false;
  }

  const isFirstOnPage = () => {
    if (product.currentIndex === 0) {
      return true;
    }
    return false;
  };

  const isLastOnPage = () => {
    if (product.currentIndex === dealerPrice.size - 1) {
      return true;
    }
    return false;
  };

  const handlePrevious = () => {
    if (isFirstOnPage()) {
      return;
    }
    setIsBeginOfList(isFirstProduct());
    setIsEndOfList(isLastProduct());
  };

  const handleNext = () => {
    if (isLastOnPage()) {
      return;
    }

    setIsEndOfList(isLastProduct());
    setIsBeginOfList(isFirstProduct());
  };

  return {
    isBeginOfList,
    isEndOfList,
    handlePrevious,
    handleNext,
  };
};
