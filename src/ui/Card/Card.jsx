import React from 'react';
import { Card, Space } from 'antd';
import './Card.scss';
// product_key,
// price,
// product_url,
// product_name,
// is_marked,
// date,
// dealer_name,
// dealer_id,
// id,
const App = ({ card }) => {
  return (
    <Space direction="vertical">
      <Card
        title={card.product_name}
        extra={<a href={card.product_url}>Ссылка на товар</a>}
      >
        <div className="card__description">
          <p>
            <span className="card__description-item">Дилер: </span>{' '}
            {card.dealer_name}
          </p>
          <p>
            <span className="card__description-item">Цена: </span> {card.price}{' '}
            руб.
          </p>
          <p>
            <span className="card__description-item"> Артикул:</span>{' '}
            {card.product_key}
          </p>
        </div>
        <div className="card__img">
          <img src="http://placehold.it/140" />
        </div>
      </Card>
    </Space>
  );
};

export default App;
