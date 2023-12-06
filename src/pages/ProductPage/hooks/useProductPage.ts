import { usePostStatisticsMutation } from 'store/api/statisticsApi';
import {
  useDeleteMarkupMutation,
  useGetMarkupMutation,
  usePostMarkupMutation,
} from 'store/api/markupApi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store/store';
import { setProduct } from 'store/product/productSlice';
import { useShowMessage } from 'shared/hooks/useShowMessage';
import { DealerPriceItem } from 'store/dealerPrice/dealerPriceSlice';
import { isMarkable, prepareMarkup, prepareStatistics } from '../utils/utils';
import { MarkupType } from 'shared/consts/constants';
import { setCurrentSession } from 'store/currentSession/currentSessionSlice';
import { currentSessionSelector } from 'store/currentSession/currentSessionSelectors';
import { useSelector } from 'react-redux';
import { Markup } from 'store/markup/markupSlice';

type UseProductPageProps = {
  product: DealerPriceItem;
};

export const useProductPage = ({ product }: UseProductPageProps) => {
  const [selectedProductVariant, setSelectedProductVariant] = useState<
    Markup | undefined
  >(undefined);

  const dispatch = useAppDispatch();
  const currentSession = useSelector(currentSessionSelector);
  const { showMessage, contextHolder } = useShowMessage();

  const [getMarkup, { isLoading: isMarkupLoading, data: markupData }] =
    useGetMarkupMutation();
  const [postMarkup] = usePostMarkupMutation();
  const [deleteMarkup] = useDeleteMarkupMutation();

  const [postStatistics] = usePostStatisticsMutation();

  const markupDataSource = useMemo(() => {
    if (!markupData) {
      return [];
    } else {
      // let markedData = markupData.items
      //   .sort((a, b) => a.quality - b.quality)
      //   .map((item, index) => ({ ...item, currentIndex: index + 1 }));
      // const markedData = [];
      // if (!product.marked_product) {
      //   return markedData;
      // }
      // const markedItem = markedData.find(
      //   (item) => item.product_id === product.marked_product?.id,
      // );
      // if (!markedItem) {
      //   markedData = [product.marked_product, ...markedData];
      // }
      // setSelectedProductVariant(markedItem);
      return [];
    }
  }, [markupData]);

  useEffect(() => {
    if (isMarkable(product.state)) {
      getMarkup({ productId: product.dealerprice.id });
      return;
    }
  }, [getMarkup, product.dealerprice.id, product.state]);

  const handlePostMarkup = useCallback(
    async (curProduct: DealerPriceItem) => {
      try {
        if (selectedProductVariant) {
          await postMarkup(
            prepareMarkup(curProduct, selectedProductVariant.product_id),
          );
          dispatch(
            setCurrentSession({
              ...currentSession,
              successMarkups: currentSession.failedMarkups + 1,
              queueVariants: [
                ...currentSession.queueVariants,
                selectedProductVariant.currentIndex,
              ],
            }),
          );
          return;
        }
        throw new Error();
      } catch {
        showMessage('error', 'Не удалось выполнить разметку');
        return;
      }
    },
    [currentSession, dispatch, postMarkup, selectedProductVariant, showMessage],
  );

  const handlePostStatistic = useCallback(
    async (
      markupType: string,
      selectedVariant: number | undefined,
      curProduct: DealerPriceItem,
    ) => {
      try {
        await postStatistics(
          prepareStatistics(curProduct, markupType, selectedVariant),
        );

        if (markupType === MarkupType.NO) {
          dispatch(
            setCurrentSession({
              ...currentSession,
              failedMarkups: currentSession.failedMarkups + 1,
            }),
          );
        }

        if (markupType === MarkupType.DEFFERED) {
          dispatch(
            setCurrentSession({
              ...currentSession,
              deffered: currentSession.deffered + 1,
            }),
          );
        }
      } catch {
        showMessage('error', 'Ошибка сохранения статистики');
        return;
      }
    },
    [currentSession, dispatch, postStatistics, showMessage],
  );

  const handleMarkup = useCallback(
    async (markupType: string) => {
      await handlePostMarkup(product);
      await handlePostStatistic(
        markupType,
        selectedProductVariant?.id,
        product,
      );
      dispatch(setProduct({ ...product, state: markupType }));
    },
    [
      handlePostMarkup,
      product,
      handlePostStatistic,
      selectedProductVariant,
      dispatch,
    ],
  );

  const handleStatistic = useCallback(
    async (markupType: string) => {
      if (markupType === MarkupType.YES) {
        await deleteMarkup({ productdealerkey_id: product.dealerprice.id });
      }
      await handlePostStatistic(
        markupType,
        selectedProductVariant?.id,
        product,
      );
      dispatch(setProduct({ ...product, state: markupType }));
    },
    [
      handlePostStatistic,
      selectedProductVariant?.id,
      product,
      dispatch,
      deleteMarkup,
    ],
  );

  const handleDeffer = async () => {
    if (product.state === MarkupType.YES) {
      await deleteMarkup({ productdealerkey_id: product.dealerprice.id });
    }
    await handlePostStatistic(
      MarkupType.DEFFERED,
      selectedProductVariant?.id,
      product,
    );
    setSelectedProductVariant(undefined);
    dispatch(setProduct({ ...product, state: MarkupType.DEFFERED }));
  };

  const handleSelectionChange = async (value: number) => {
    if (value === selectedProductVariant?.product_id) {
      try {
        await handleDeffer();
        return;
      } catch {
        showMessage('error', 'Не удалось изменить разметку');
        return;
      }
    }

    const markup = markupData?.items.find((item) => item.product_id === value);

    setSelectedProductVariant(markup);

    if (product.state === MarkupType.YES) {
      await deleteMarkup({ productdealerkey_id: product.dealerprice.id });
      await handleMarkup(product.state);
    }
  };

  return {
    product,
    isMarkupLoading,
    markupDataSource,
    contextHolder,
    selectedProductVariant,
    handleMarkup,
    handleStatistic,
    handleSelectionChange,
  };
};
