import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MarkupType } from 'shared/consts/constants';
import {
  useGetDealerpriceAllMutation,
  useGetDealerpriceMutation,
} from 'store/api/dealerPriceApi';
import {
  DealerPriceItem,
  DealerPriceState,
} from 'store/dealerPrice/dealerPriceSlice';
import { dealersSelector } from 'store/dealers/dealersSelectors';
import { mainTableFilterSelector } from 'store/filters/filtersSelectors';
import { setProduct } from 'store/product/productSlice';
import { useAppDispatch } from 'store/store';

type UseProductSwitcherProps = {
  product: DealerPriceItem;
  dealerPrice: DealerPriceState;
};

export const useProductSwitcher = ({
  product,
  dealerPrice,
}: UseProductSwitcherProps) => {
  const [direction, setDirection] = useState<'back' | 'forward' | undefined>(
    undefined,
  );
  const [pageChanged, setPageChanged] = useState(false);

  const dispatch = useAppDispatch();
  const [getDealerpriceAll] = useGetDealerpriceAllMutation();
  const [getDealerprice] = useGetDealerpriceMutation();
  const { currentDealer } = useSelector(dealersSelector);
  const filter = useSelector(mainTableFilterSelector);

  const isFirstProduct = useCallback(() => {
    if (dealerPrice.page === 1 && product.currentIndex + 1 === 1) {
      return true;
    }
    return false;
  }, [dealerPrice.page, product.currentIndex]);

  const isLastProduct = useCallback(() => {
    if (
      dealerPrice.page === dealerPrice.pages &&
      product.currentIndex + 1 === dealerPrice.total
    ) {
      return true;
    }
    return false;
  }, [
    dealerPrice.page,
    dealerPrice.pages,
    dealerPrice.total,
    product.currentIndex,
  ]);

  const [isBeginOfList, setIsBeginOfList] = useState(isFirstProduct());
  const [isEndOfList, setIsEndOfList] = useState(isLastProduct());

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

  const getAnotherPage = async (page: number) => {
    setPageChanged(true);
    const state =
      filter.markupState.value === MarkupType.ALL
        ? undefined
        : filter.markupState.value;
    if (currentDealer) {
      await getDealerprice({
        dealer_id: currentDealer.id,
        page,
        size: dealerPrice.size,
        name: filter.name.value,
        state,
        start_date: filter.dateRange.dateFrom,
        end_date: filter.dateRange.dateTo,
      });
      return;
    }

    await getDealerpriceAll({
      page,
      size: dealerPrice.size,
      name: filter.name.value,
      state,
      start_date: filter.dateRange.dateFrom,
      end_date: filter.dateRange.dateTo,
    });
  };

  const handlePrevious = async () => {
    setDirection('back');
    if (isFirstOnPage()) {
      await getAnotherPage(dealerPrice.page - 1);
      return;
    }

    setPageChanged(false);
    dispatch(setProduct(dealerPrice?.items[product.currentIndex - 1]));
  };

  const handleNext = async () => {
    setDirection('forward');
    if (isLastOnPage()) {
      await getAnotherPage(dealerPrice.page + 1);
      return;
    }

    setPageChanged(false);
    dispatch(setProduct(dealerPrice?.items[product.currentIndex + 1]));
  };

  useEffect(() => {
    if (direction === 'back' && pageChanged) {
      dispatch(setProduct(dealerPrice?.items[dealerPrice.size - 1]));
    }
    if (direction === 'forward' && pageChanged) {
      dispatch(setProduct(dealerPrice?.items[0]));
    }
  }, [dealerPrice, direction, dispatch, pageChanged]);

  useEffect(() => {
    setIsEndOfList(isLastProduct());
    setIsBeginOfList(isFirstProduct());
  }, [isFirstProduct, isLastProduct, product]);

  return {
    isBeginOfList,
    isEndOfList,
    handlePrevious,
    handleNext,
  };
};
