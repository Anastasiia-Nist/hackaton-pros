import type { ColumnType } from 'antd/es/table';
import { Markup } from 'store/markup/markupSlice';

export const columns: ColumnType<Markup>[] = [
  {
    title: 'Название',
    dataIndex: 'product_id',
    key: 'product_id',
  },
  {
    title: 'Артикул',
    dataIndex: 'product_id',
    key: 'product_id',
  },
  {
    title: 'Вероятность',
    dataIndex: 'quality',
    key: 'quality',
  },
];
