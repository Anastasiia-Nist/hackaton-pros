import type { ColumnType } from 'antd/es/table';
import { MainTableDataType } from 'shared/consts/MainTableData';

export const columns: ColumnType<MainTableDataType>[] = [
  {
    title: 'Название',
    dataIndex: 'name',
  },
  {
    title: 'Статус разметки',
    dataIndex: 'markedStatus',
  },
  {
    title: 'Дата получения',
    dataIndex: 'date',
  },
  {
    title: 'Дилер',
    dataIndex: 'dealer',
  },
  {
    title: 'Номер продукта',
    dataIndex: 'productKey',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
  },
];
