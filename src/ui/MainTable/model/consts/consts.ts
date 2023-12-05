import type { ColumnType } from 'antd/es/table';
import { MainTableDataType } from 'ui/MainTable/model/types';

export const columns: ColumnType<MainTableDataType>[] = [
  {
    title: 'Название',
    dataIndex: 'productName',
  },
  {
    title: 'Статус разметки',
    dataIndex: 'state',
  },
  {
    title: 'Дата получения',
    dataIndex: 'date',
  },
  {
    title: 'Дилер',
    dataIndex: 'dealer',
    key: 'dealer',
  },
  {
    title: 'Артикул',
    dataIndex: 'product_key',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
  },
];
