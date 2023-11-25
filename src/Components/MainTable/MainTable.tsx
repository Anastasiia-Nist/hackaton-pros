import { Table } from 'antd';
import { columns } from './model/consts/consts';
import { MainTableDataType } from 'shared/consts/MainTableData';

type MainTableProps = {
  dataSource: MainTableDataType[];
};

export const MainTable = ({ dataSource }: MainTableProps) => {
  return <Table columns={columns} dataSource={dataSource} />;
};
