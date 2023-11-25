import { DataType } from 'mock/mainTableData';
import { MainTableDataType } from 'shared/consts/MainTableData';
import { MarkedStatus } from 'components/MarkedStatus/MarkedStatus';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig';

type UseTableDataProps = {
  dataSource: DataType[];
};

export const useTableDataSource = ({
  dataSource,
}: UseTableDataProps): MainTableDataType[] => {
  return dataSource.map((item) => {
    return {
      ...item,
      markedStatus: (
        <MarkedStatus
          isMarked={item.markedStatus}
          routePath={RoutePath[AppRoutes.PRODUCT]}
        />
      ),
      key: item.id,
    };
  });
};
