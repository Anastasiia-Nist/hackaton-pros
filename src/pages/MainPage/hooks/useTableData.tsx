import { MarkedStatus } from 'ui/MarkedStatus/MarkedStatus';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig';
import { DealerPriceItem } from 'store/dealerPrice/dealerPriceSlice';
import {
  useGetDealerpriceAllMutation,
  useGetDealerpriceMutation,
} from 'store/api/dealerPriceApi';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { mainTablePaginationSelector } from 'store/mainTablePagination/mainTablePaginationSelectors';
import { dealerPriceSelector } from 'store/dealerPrice/dealerPriceSelectors';
import { MainTableDataType } from 'ui/MainTable/model/types';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'store/store';
import { setProduct } from 'store/product/productSlice';
import { dealersSelector } from 'store/dealers/dealersSelectors';
import { MainTableFilter } from 'store/filters/filtersSlice';
import { MarkupType } from 'shared/consts/constants';
import { mainTableFilterSelector } from 'store/filters/filtersSelectors';

type UseTableResult = {
  dataSource: MainTableDataType[];
  handelSetFilter: (values: MainTableFilter) => void;
  isLoadingAll: boolean;
  isLoading: boolean;
};

export const useTableDataSource = (): UseTableResult => {
  const dispatch = useAppDispatch();
  const [getDealerpriceAll, { isLoading: isLoadingAll }] =
    useGetDealerpriceAllMutation();
  const [getDealerPrice, { isLoading }] = useGetDealerpriceMutation();
  const { currentPage, pageSize } = useSelector(mainTablePaginationSelector);
  const dealerPrice = useSelector(dealerPriceSelector);
  const { currentDealer } = useSelector(dealersSelector);
  const filter = useSelector(mainTableFilterSelector);

  useEffect(() => {
    const state =
      filter.markupState.value === MarkupType.ALL
        ? undefined
        : filter.markupState.value;
    if (!currentDealer) {
      getDealerpriceAll({
        page: currentPage,
        size: pageSize,
        name: filter.name.value,
        state,
        start_date: filter.dateRange.dateFrom,
        end_date: filter.dateRange.dateTo,
      });
      return;
    }

    getDealerPrice({
      dealer_id: currentDealer.id,
      page: currentPage,
      size: pageSize,
      name: filter.name.value,
      state,
      start_date: filter.dateRange.dateFrom,
      end_date: filter.dateRange.dateTo,
    });
    // To prevent twice queries to the api. First query appears in handelSetFilter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDealerpriceAll, getDealerPrice, currentPage, pageSize, currentDealer]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleProductClick = (product: DealerPriceItem) => {
    dispatch(setProduct(product));
  };

  const handelSetFilter = async ({
    name,
    markupState,
    dateRange,
  }: MainTableFilter) => {
    const state =
      markupState.value === MarkupType.ALL ? undefined : markupState.value;
    if (currentDealer) {
      await getDealerPrice({
        dealer_id: currentDealer.id,
        page: currentPage,
        size: pageSize,
        name: name.value,
        state,
        start_date: dateRange.dateFrom,
        end_date: dateRange.dateTo,
      });
      return;
    }

    await getDealerpriceAll({
      page: currentPage,
      size: pageSize,
      name: name.value,
      state,
      start_date: dateRange.dateFrom,
      end_date: dateRange.dateTo,
    });
  };

  const dataSource = useMemo(() => {
    return dealerPrice.items.map((item: DealerPriceItem) => {
      return {
        ...item.dealerprice,
        productName: (
          <Link
            to={RoutePath[AppRoutes.PRODUCT]}
            onClick={() => handleProductClick(item)}
          >
            {item.dealerprice?.product_name}
          </Link>
        ),
        markedStatus: <MarkedStatus state={item.state} />,
        key: item.dealerprice?.id,
        dealer: item.dealer,
        state: item.state,
        currentIndex: item.currentIndex,
      };
    });
  }, [dealerPrice, handleProductClick]);

  return {
    dataSource,
    handelSetFilter,
    isLoadingAll,
    isLoading,
  };
};
