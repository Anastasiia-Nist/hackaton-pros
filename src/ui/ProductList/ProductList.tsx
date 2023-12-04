import { Divider, Table } from 'antd';
import type { Markup } from 'store/markup/markupSlice';
import './ProductList.scss';
import { columns } from './model/consts/consts';
import { Key } from 'antd/es/table/interface';

type ProductListProps = {
  listData: Markup[];
  onSelected: (value: number) => void;
  selectedItem: number | undefined;
};

export const ProductList = ({
  listData,
  onSelected,
  selectedItem,
}: ProductListProps) => {
  return (
    <>
      <Divider orientation="left">Список возможных совпадений</Divider>
      <Table
        dataSource={listData}
        columns={columns}
        pagination={false}
        scroll={{ y: 160 }}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [selectedItem as Key],
          onSelect: (record, selected) => {
            if (selected) {
              onSelected(record.key as number);
            }
          },
          // onChange: (selectedRowKeys) => {
          //   onSelected(selectedRowKeys[0] as number);
          // },
        }}
      />
    </>
  );
};
