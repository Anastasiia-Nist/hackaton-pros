import { Card, Space } from 'antd';
import './ProductCard.scss';
import { MarkedStatus } from 'ui/MarkedStatus/MarkedStatus';
import { DealerPriceItem } from 'store/dealerPrice/dealerPriceSlice';

type ProductCardProps = {
  card: DealerPriceItem;
};

export const ProductCard = ({ card }: ProductCardProps) => {
  return (
    <Space direction="vertical">
      <Card
        title={card.dealerprice.product_name}
        extra={
          <a target="_blank" rel="noopener" href={card.dealerprice.product_url}>
            Ссылка на товар
          </a>
        }
      >
        <div className="card__description">
          <p>
            <span className="card__description-item">Дилер: </span>{' '}
            {card.dealer}
          </p>
          <p>
            <span className="card__description-item">Цена: </span>{' '}
            {card.dealerprice.price} руб.
          </p>
          <p>
            <span className="card__description-item"> Артикул:</span>{' '}
            {card.dealerprice.product_key}
          </p>
          <p className="card__description-item card__description-item_separate">
            Статус разметки:&nbsp;
            <MarkedStatus state={card.state} />
          </p>
        </div>
        <div className="card__img">
          <img src="http://placehold.it/120" />
        </div>
      </Card>
    </Space>
  );
};
