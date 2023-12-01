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

export const useTableDataSource = (): MainTableDataType[] => {
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

  return dealerPrice.items.map((item: DealerPriceItem) => {
    return {
      ...item,
      productName: <Link to={'/product'}>{item.product_name}</Link>,
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
