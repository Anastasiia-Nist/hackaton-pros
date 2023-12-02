import { Table } from 'antd';
import { MainTableDataType } from './model/types';
import { columns } from './model/consts/consts';

type MainTableProps = {
  dataSource: MainTableDataType[];
};

export const MainTable = ({ dataSource }: MainTableProps) => {
  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};
