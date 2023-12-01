import type { ColumnType } from 'antd/es/table';
import { MainTableDataType } from 'ui/MainTable/model/types';

export const columns: ColumnType<MainTableDataType>[] = [
  {
    title: 'Название',
    dataIndex: 'product_name',
  },
  {
    title: 'Статус разметки',
    dataIndex: 'is_marked',
  },
  {
    title: 'Дата получения',
    dataIndex: 'date',
  },
  {
    title: 'Дилер',
    dataIndex: 'dealer_id',
  },
  {
    title: 'Номер продукта',
    dataIndex: 'product_key',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
  },
];
