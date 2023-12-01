import React from 'react';
import { useState } from 'react';
import { Divider, List, Button } from 'antd';

const data = [
  'Средство универсальное Prosept Universal Spray',
  'Средство не универсальное Prosept Universal Spray',
  'Средство ещё какое-то Prosept Universal Spray',
  'Средство универсальное 2в1 Prosept Universal Spray',
];

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState(data);

  const handleAdd = () => {
    setDataSource([...dataSource, 'Ещё какое-то средство']);
  };

  return (
    <>
      <Divider orientation="left">Список возможных совпадений</Divider>
      <List
        size="small"
        bordered
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-product-yes">Да</a>,
              <a key="list-product-no">Нет</a>,
              <a key="list-product-postpone">Отложить</a>,
            ]}
          >
            {item}
          </List.Item>
        )}
      >
        <Button onClick={handleAdd} type="primary" style={{ margin: 16 }}>
          Ещё варианты
        </Button>
      </List>
    </>
  );
};

export default App;
