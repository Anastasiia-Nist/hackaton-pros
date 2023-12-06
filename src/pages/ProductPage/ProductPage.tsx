import { useSelector } from 'react-redux';
import './ProductPage.scss';
import { ProductCard } from 'ui/ProductCard/ProductCard';
import { ProductList } from 'ui/ProductList/ProductList';
import { productSelector } from 'store/product/productSelectors';
import { Button } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { isMarkable } from './utils/utils';
import { useProductPage } from './hooks/useProductPage';
import { MarkupType } from 'shared/consts/constants';

export const ProductPage = () => {
  const product = useSelector(productSelector);
  const {
    isMarkupLoading,
    markupDataSource,
    contextHolder,
    selectedProductVariant,
    handleMarkup,
    handleStatistic,
    handleSelectionChange,
  } = useProductPage({ product });

  return (
    <section className="product-page">
      {contextHolder}
      <main className="product-page__main">
        <div className="product-page__block-compare">
          <ProductCard card={product} />
          <ProductList
            listData={markupDataSource}
            selectedItem={selectedProductVariant?.product_id}
            onSelected={handleSelectionChange}
            isLoading={isMarkupLoading}
          />

          <section
            className="markup-controls"
            aria-label="Элементы управления разметкой"
          >
            <div>
              <Button
                className="markup-controls__button"
                icon={<LeftOutlined />}
                style={{ margin: 16, width: 200 }}
                onClick={() => console.log(product.dealerprice)}
              >
                Предыдущий
              </Button>
            </div>
            <div>
              <Button
                className="markup-controls__button markup-controls__button_type_yes"
                type="primary"
                icon={<CheckOutlined />}
                style={{ margin: 16, width: 100 }}
                onClick={() => handleMarkup(MarkupType.YES)}
                disabled={
                  !isMarkable(product.state) ||
                  selectedProductVariant === undefined
                }
              >
                Да
              </Button>
              <Button
                className="markup-controls__button markup-controls__button_type_no"
                type="primary"
                icon={<CloseOutlined />}
                style={{ margin: 16, width: 100 }}
                onClick={() => handleStatistic(MarkupType.NO)}
                disabled={!isMarkable(product.state)}
              >
                Нет
              </Button>
              <Button
                style={{ margin: 16, width: 100 }}
                onClick={() => handleStatistic(MarkupType.DEFFERED)}
                disabled={!isMarkable(product.state)}
              >
                Отложить
              </Button>
            </div>
            <Button
              className="markup-controls__button"
              icon={<RightOutlined />}
              style={{ margin: 16, width: 200 }}
              onClick={() => console.log(product.dealerprice)}
            >
              Следующий
            </Button>
          </section>
        </div>
      </main>
    </section>
  );
};
