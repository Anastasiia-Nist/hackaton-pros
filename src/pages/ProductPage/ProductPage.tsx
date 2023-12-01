import './ProductPage.scss';
import Card from 'ui/Card/Card';
import ProductList from 'ui/ProductList/ProductList';

export const ProductPage = () => {
  return (
    <section className="product-page">
      <main className="product-page__main">
        <div className="product-page__block-compare">
          <div className="product-page__product-info">
            <Card />
          </div>
          <ProductList />
        </div>
      </main>
    </section>
  );
};
