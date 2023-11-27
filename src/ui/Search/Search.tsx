import './Search.scss';
import { Input, Space } from 'antd';
import React from 'react';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const App: React.FC = () => (
  <Space direction="vertical" id="custom-button">
    <Search
      placeholder="поиск"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  </Space>
);

export default App;
