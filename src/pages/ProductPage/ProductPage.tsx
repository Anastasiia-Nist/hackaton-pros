import { useSelector } from 'react-redux';
import './ProductPage.scss';
import Card from 'ui/Card/Card';
import ProductList from 'ui/ProductList/ProductList';
import { productSelector } from 'store/product/productSelectors';

export const ProductPage = () => {
  const {
    // product_key,
    // price,
    // product_url,
    product_name,
    // is_marked,
    // date,
    // dealer_name,
    // dealer_id,
    // id,
  } = useSelector(productSelector);

  return (
    <section className="product-page">
      <main className="product-page__main">
        <div className="product-page__block-compare">
          <div className="product-page__product-info">
            {product_name}
            <Card />
          </div>
          <ProductList />
        </div>
      </main>
    </section>
  );
};
