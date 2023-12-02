import type { ColumnType } from 'antd/es/table';
import { Dealer } from 'store/dealers/dealersSlice';

export const columns: ColumnType<Dealer>[] = [
  {
    title: 'Название',
    dataIndex: 'name',
  },
];
