import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dealer } from 'store/dealers/dealersSlice';
import { useGetDealersMutation } from 'store/api/dealersApi';
import { dealersPaginationSelector } from 'store/dealersPagination/dealersPaginationSelectors';
import { dealersSelector } from 'store/dealers/dealersSelectors';

type UseDealersData = {
  dataSource: Dealer[];
  currentDealer: Dealer | null;
  isLoading: boolean;
};

export const useDealersData = (isOpen: boolean): UseDealersData => {
  const [getDealers, { isLoading }] = useGetDealersMutation();
  const { currentPage, pageSize } = useSelector(dealersPaginationSelector);
  const { items: dealers, currentDealer } = useSelector(dealersSelector);

  useEffect(() => {
    if (isOpen) {
      getDealers({
        page: currentPage,
        size: pageSize,
      });
    }
  }, [isOpen, getDealers, currentPage, pageSize]);

  return {
    dataSource: dealers.map((item: Dealer) => {
      return {
        ...item,
        key: item.id,
      };
    }),
    currentDealer,
    isLoading,
  };
};
