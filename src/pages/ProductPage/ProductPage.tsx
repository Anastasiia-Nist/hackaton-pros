import { useSelector } from 'react-redux';
import './ProductPage.scss';
import Card from 'ui/Card/Card';
import ProductList from 'ui/ProductList/ProductList';
import { productSelector } from 'store/product/productSelectors';

export const ProductPage = () => {
  const product = useSelector(productSelector);

  return (
    <section className="product-page">
      <main className="product-page__main">
        <div className="product-page__block-compare">
          <Card card={product} />
          <ProductList />
        </div>
      </main>
    </section>
  );
};
