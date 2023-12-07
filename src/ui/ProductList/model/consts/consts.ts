import type { ColumnType } from 'antd/es/table';
import { ProductListType } from '../types/types';

export const columns: ColumnType<ProductListType>[] = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    width: '68%',
  },
  {
    title: 'Артикул',
    dataIndex: 'article',
    key: 'article',
  },
  {
    title: 'Вероятность',
    dataIndex: 'quality',
    key: 'quality',
  },
];
