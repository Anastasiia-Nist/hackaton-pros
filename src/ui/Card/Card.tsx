import React from 'react';
import { Card, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" size={16}>
    <Card
      title="Имя товара"
      extra={<a href="#">Подробнее</a>}
      style={{ width: 500 }}
    >
      <p>Информация о товаре</p>
    </Card>
  </Space>
);

export default App;
