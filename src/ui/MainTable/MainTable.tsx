import { Table } from 'antd';
import { MainTableDataType } from 'shared/consts/MainTableData';
import { columns } from './model/consts/consts';

type MainTableProps = {
  dataSource: MainTableDataType[];
};

export const MainTable = ({ dataSource }: MainTableProps) => {
  return <Table columns={columns} dataSource={dataSource} />;
};
