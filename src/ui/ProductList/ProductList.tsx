import { Divider, Table } from 'antd';
import type { Markup } from 'store/markup/markupSlice';
import './ProductList.scss';
import { columns } from './model/consts/consts';
import { Key } from 'antd/es/table/interface';
import { useMemo } from 'react';

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
  const dataSource = useMemo(() => {
    return listData.sort((a, b) => a.quality - b.quality);
  }, [listData]);

  return (
    <>
      <Divider orientation="left">Список возможных совпадений</Divider>
      <Table
        dataSource={dataSource}
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
