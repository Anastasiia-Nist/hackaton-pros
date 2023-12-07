import { Table } from 'antd';
import { MainTableDataType } from './model/types';
import { columns } from './model/consts/consts';

type MainTableProps = {
  dataSource: MainTableDataType[];
  isLoading: boolean;
};

export const MainTable = ({ dataSource, isLoading }: MainTableProps) => {
  return (
    <Table
      columns={columns}
      loading={isLoading}
      dataSource={[...dataSource]}
      pagination={false}
    />
  );
};
