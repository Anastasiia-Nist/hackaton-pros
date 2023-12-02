import React from 'react';
import { Divider, Button, Table } from 'antd';
import './ProductList.scss';

const data = [
  {
    key: '426342',
    label: 'Средство универсальное Prosept Universal Spray',
    info: 'Информация о товаре',
  },
  {
    key: '845927',
    label: 'Средство универсальное Prosept Universal Spray',
    info: 'Информация о товаре',
  },
  {
    key: '727536',
    label: 'Средство универсальное Prosept Universal Spray',
    info: 'Информация о товаре',
  },
  {
    key: '023846',
    label: 'Средство универсальное Prosept Universal Spray',
    info: 'Информация о товаре',
  },
];
const columns = [
  {
    title: 'Название',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Информация о товаре',
    dataIndex: 'info',
    key: 'info',
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `Артикул: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows[0],
    );
  },
};
const App = () => {
  return (
    <>
      <Divider orientation="left">Список возможных совпадений</Divider>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        scroll={{ y: 160 }}
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
      />
      <section className="markup">
        <Button type="primary" style={{ margin: 16 }}>
          Да
        </Button>
        <Button type="primary" style={{ margin: 16 }}>
          Нет
        </Button>
        <Button type="primary" style={{ margin: 16 }}>
          Отложить
        </Button>
      </section>
    </>
  );
};

export default App;
