import { useSelector } from 'react-redux';
import './ProductPage.scss';
import Card from 'ui/Card/Card';
import { ProductList } from 'ui/ProductList/ProductList';
import { productSelector } from 'store/product/productSelectors';
import { usePostStatisticsMutation } from 'store/api/statisticsApi';
import {
  useDeleteMarkupMutation,
  useGetMarkupMutation,
  usePostMarkupMutation,
  // usePatchMarkupMutation,
} from 'store/api/markupApi';
import { useCallback, useEffect, useState } from 'react';
import { Button, Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { MarkupType } from 'store/statistics/statisticsSlice';
import { useAppDispatch } from 'store/store';
import { setProduct } from 'store/product/productSlice';
import { useShowMessage } from 'shared/hooks/useShowMessage';
import { isMarkable } from './utils/utils';

export const ProductPage = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedProductVariant, setSelectedProductVariant] = useState<
    number | undefined
  >(undefined);
  const product = useSelector(productSelector);

  const { showMessage, contextHolder } = useShowMessage();
  const dispatch = useAppDispatch();
  const [getMarkup, { isLoading, data }] = useGetMarkupMutation();
  const [postMarkup, { isSuccess: isMarkupSuccess }] = usePostMarkupMutation();
  const [deleteMarkup, { isSuccess: isDeleteSuccess }] =
    useDeleteMarkupMutation();
  // const [patchMarkup, { isLoading, data, isSuccess, isError, error }] =
  //   usePatchMarkupMutation();

  // For Yes and No buttons
  const [postStatistics] = usePostStatisticsMutation();

  useEffect(() => {
    if (!product.is_marked) {
      getMarkup({ productId: product.id });
      return;
    }
  }, [getMarkup, product.id, product.is_marked]);

  const handleMarkup = useCallback(
    async (markupType: MarkupType) => {
      if (selectedProductVariant !== undefined) {
        await postMarkup({
          key: product.id,
          dealer_id: product.dealer_id,
          product_id: product.id,
        });

        if (isMarkupSuccess) {
          postStatistics({
            key: product.id,
            markup: selectedProductVariant,
            last_update: new Date().toISOString(),
            state: markupType,
            id: product.id,
          });
        }
      }
    },
    [
      isMarkupSuccess,
      postMarkup,
      postStatistics,
      product.dealer_id,
      product.id,
      selectedProductVariant,
    ],
  );

  const handleOkConfirm = async () => {
    await deleteMarkup({ productdealerkey_id: product.id });

    if (isDeleteSuccess) {
      dispatch(setProduct({ ...product, is_marked: undefined }));
      getMarkup({ productId: product.id });
      setIsConfirmOpen(false);
      showMessage('success', 'Разметка удалена');
      return;
    }

    showMessage('error', 'Не удалось удалить разметку');
  };

  const handleSelectionChange = (value: number) => {
    console.log(value, selectedProductVariant);
    if (value === selectedProductVariant) {
      setSelectedProductVariant(undefined);
      return;
    }
    setSelectedProductVariant(value);
  };

  return (
    <section className="product-page">
      {contextHolder}
      <main className="product-page__main">
        <div className="product-page__block-compare">
          <Card card={product} />
          <div
            className={clsx({
              'product-page__list-wrapper': true,
              'product-page__list-wrapper_loading': isLoading,
            })}
          >
            {isLoading ? (
              <Spin
                className="product-page__spinner"
                indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
              />
            ) : (
              <ProductList
                listData={data?.items || []}
                selectedItem={selectedProductVariant}
                onSelected={handleSelectionChange}
              />
            )}
          </div>

          <section
            className="markup-controls"
            aria-label="Элементы управления разметкой"
          >
            <div>
              <Button
                type="primary"
                style={{ margin: 16 }}
                onClick={() => handleMarkup(MarkupType.YES)}
                disabled={
                  !isMarkable(product.is_marked) ||
                  selectedProductVariant === undefined
                }
              >
                Да
              </Button>
              <Button
                type="primary"
                style={{ margin: 16 }}
                onClick={() => handleMarkup(MarkupType.NO)}
                disabled={
                  !isMarkable(product.is_marked) ||
                  selectedProductVariant === undefined
                }
              >
                Нет
              </Button>
              <Button
                style={{ margin: 16 }}
                onClick={() => handleMarkup(MarkupType.DEFFERED)}
                disabled={
                  !isMarkable(product.is_marked) ||
                  selectedProductVariant === undefined
                }
              >
                Отложить
              </Button>
            </div>

            {!isMarkable(product.is_marked) && (
              <Button
                style={{ margin: 16 }}
                onClick={() => setIsConfirmOpen(true)}
              >
                Сбросить разметку
              </Button>
            )}
          </section>
        </div>
      </main>
      <Modal
        title="Сбросить разметку"
        centered
        className="dealers-confirm"
        open={isConfirmOpen}
        onOk={handleOkConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      >
        Разметка будет сброшена, продолжить?
      </Modal>
    </section>
  );
};
