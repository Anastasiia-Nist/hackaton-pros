import { useSelector } from 'react-redux';
import './ProductPage.scss';
import Card from 'ui/Card/Card';
import ProductList from 'ui/ProductList/ProductList';
import { productSelector } from 'store/product/productSelectors';
// import { usePostStatisticsMutation } from 'store/api/statisticsApi';
// import {
//   useGetMarkupMutation,
//   usePostMarkupMutation,
// } from 'store/api/markupApi';
// import { useEffect } from 'react';

export const ProductPage = () => {
  const product = useSelector(productSelector);

  // const [getMarkup, { isLoading, data, isSuccess, isError, error }] =
  //   useGetMarkupMutation();
  // const [postMarkup, { isLoading, data, isSuccess, isError, error }] =
  //   usePostMarkupMutation();
  //
  // For Yes and No buttons
  // const [postStatistics, { isLoading, data, isSuccess, isError, error }] =
  //   usePostStatisticsMutation();

  // useEffect(() => {
  //   getMarkup({ productId: product.id });
  // }, [getMarkup, product.id]);

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
