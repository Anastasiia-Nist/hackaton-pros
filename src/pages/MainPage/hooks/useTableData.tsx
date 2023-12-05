import { MarkedStatus } from 'ui/MarkedStatus/MarkedStatus';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig';
import { DealerPriceItem } from 'store/dealerPrice/dealerPriceSlice';
import {
  useGetDealerpriceAllMutation,
  useGetDealerpriceMutation,
} from 'store/api/dealerPriceApi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { mainTablePaginationSelector } from 'store/mainTablePagination/mainTablePaginationSelectors';
import { dealerPriceSelector } from 'store/dealerPrice/dealerPriceSelectors';
import { MainTableDataType } from 'ui/MainTable/model/types';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'store/store';
import { setProduct } from 'store/product/productSlice';
import { dealersSelector } from 'store/dealers/dealersSelectors';

export const useTableDataSource = (): MainTableDataType[] => {
  const dispatch = useAppDispatch();
  const [getDealerpriceAll] = useGetDealerpriceAllMutation();
  const [getDealerPrice] = useGetDealerpriceMutation();
  const { currentPage, pageSize } = useSelector(mainTablePaginationSelector);
  const dealerPrice = useSelector(dealerPriceSelector);
  const { currentDealer } = useSelector(dealersSelector);

  useEffect(() => {
    if (!currentDealer) {
      getDealerpriceAll({
        page: currentPage,
        size: pageSize,
      });
      return;
    }

    getDealerPrice({
      dealer_id: currentDealer.id,
      page: currentPage,
      size: pageSize,
    });
  }, [getDealerpriceAll, getDealerPrice, currentPage, pageSize, currentDealer]);

  const handleProductClick = (product: DealerPriceItem) => {
    dispatch(setProduct(product));
  };

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
    };
  });
};
