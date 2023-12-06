import { Divider, Table } from 'antd';
import type { Markup } from 'store/markup/markupSlice';
import './ProductList.scss';
import { columns } from './model/consts/consts';
import { Key } from 'antd/es/table/interface';

type ProductListProps = {
  listData: Markup[];
  onSelected: (value: number) => void;
  selectedItem: number | undefined;
  isLoading: boolean;
};

export const ProductList = ({
  listData,
  onSelected,
  selectedItem,
  isLoading,
}: ProductListProps) => {
  return (
    <>
      <Divider orientation="left">Список возможных совпадений</Divider>
      <Table
        loading={isLoading}
        dataSource={listData}
        columns={columns}
        pagination={false}
        scroll={{ y: 160 }}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [selectedItem as Key],
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              onSelected(record.key as number);
            },
          };
        }}
      />
    </>
  );
};
