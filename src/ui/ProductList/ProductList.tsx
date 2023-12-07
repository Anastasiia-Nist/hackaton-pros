import { Divider, Table } from 'antd';
import './ProductList.scss';
import { columns } from './model/consts/consts';
import { Key } from 'antd/es/table/interface';
import { ProductListType } from './model/types/types';

type ProductListProps = {
  listData: ProductListType[];
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
        scroll={{ y: 230 }}
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
