import { MarkedStatus } from 'ui/MarkedStatus/MarkedStatus';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig';
import { DealerPriceItem } from 'store/dealerPrice/dealerPriceSlice';
import { useGetDealerpriceAllMutation } from 'store/api/dealerPriceApi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  mainTableCurrentPageSelector,
  mainTablePageSizeSelector,
} from 'store/mainTablePagination/mainTablePaginationSelectors';
import { dealerPriceSelector } from 'store/dealerPrice/dealerPriceSelectors';
import { MainTableDataType } from 'ui/MainTable/model/types';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'store/store';
import { setProduct } from 'store/product/productSlice';

export const useTableDataSource = (): MainTableDataType[] => {
  const dispatch = useAppDispatch();
  const [getDealerpriceAll] = useGetDealerpriceAllMutation();
  const currentPage = useSelector(mainTableCurrentPageSelector);
  const pageSize = useSelector(mainTablePageSizeSelector);
  const dealerPrice = useSelector(dealerPriceSelector);

  useEffect(() => {
    getDealerpriceAll({
      page: currentPage,
      size: pageSize,
    });
  }, [getDealerpriceAll, currentPage, pageSize]);

  const handleProductClick = (product: DealerPriceItem) => {
    dispatch(setProduct(product));
  };

  return dealerPrice.items.map((item: DealerPriceItem) => {
    return {
      ...item,
      productName: (
        <Link to={'/product'} onClick={() => handleProductClick(item)}>
          {item.product_name}
        </Link>
      ),
      markedStatus: (
        <MarkedStatus
          isMarked={item.is_marked}
          routePath={RoutePath[AppRoutes.PRODUCT]}
        />
      ),
      key: item.id,
    };
  });
};
