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
import {
  StaticticMarkupType,
  StatisticToProductState,
} from 'shared/consts/constants';
import { setCurrentSession } from 'store/currentSession/currentSessionSlice';
import { currentSessionSelector } from 'store/currentSession/currentSessionSelectors';
import { useSelector } from 'react-redux';
import { Markup } from 'store/markup/markupSlice';

type UseProductPageProps = {
  product: DealerPriceItem;
};

export const useProductPage = ({ product }: UseProductPageProps) => {
  const [isSuccessable, setIsSuccessable] = useState(false);
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
      let markedData: Markup[] = markupData.items;

      if (product.marked_product) {
        const markedItem = markedData.find(
          (item) =>
            item.markup.product_id === product.marked_product?.markup.id,
        );
        if (!markedItem) {
          markedData = [product.marked_product, ...markedData];
        }
        setSelectedProductVariant(markedItem);
      }

      const result = [...markedData]
        .sort((a, b) => b.markup.quality - a.markup.quality)
        .map((item, index) => ({
          ...item.markup,
          ...item.product,
          currentIndex: index + 1,
          quality: +(item.markup.quality * 100).toFixed(2),
          key: item.markup.id,
        }));
      return result;
    }
  }, [markupData, product.marked_product]);

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
            prepareMarkup(curProduct, selectedProductVariant.markup.product_id),
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

        if (markupType === StaticticMarkupType.NO) {
          dispatch(
            setCurrentSession({
              ...currentSession,
              failedMarkups: currentSession.failedMarkups + 1,
            }),
          );
        }

        if (markupType === StaticticMarkupType.DEFFERED) {
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
      await deleteMarkup({ productdealerkey_id: product.dealerprice.id });
      await handlePostMarkup(product);
      await handlePostStatistic(
        markupType,
        selectedProductVariant?.markup.id,
        product,
      );
      dispatch(setProduct({ ...product, state: markupType }));
    },
    [
      deleteMarkup,
      product,
      handlePostMarkup,
      handlePostStatistic,
      selectedProductVariant?.markup.id,
      dispatch,
    ],
  );

  const handleStatistic = useCallback(
    async (markupType: string) => {
      if (product.state === StatisticToProductState[StaticticMarkupType.YES]) {
        await deleteMarkup({ productdealerkey_id: product.dealerprice.id });
      }
      await handlePostStatistic(
        markupType,
        selectedProductVariant?.markup.id,
        product,
      );
      dispatch(setProduct({ ...product, state: markupType }));
      setSelectedProductVariant(undefined);
    },
    [
      handlePostStatistic,
      selectedProductVariant?.markup.id,
      product,
      dispatch,
      deleteMarkup,
    ],
  );

  const handleDeffer = async () => {
    if (product.state === StatisticToProductState[StaticticMarkupType.YES]) {
      await deleteMarkup({ productdealerkey_id: product.dealerprice.id });
    }
    await handlePostStatistic(
      StaticticMarkupType.DEFFERED,
      selectedProductVariant?.markup.id,
      product,
    );
    setSelectedProductVariant(undefined);
    dispatch(setProduct({ ...product, state: StaticticMarkupType.DEFFERED }));
  };

  const handleSelectionChange = async (value: number) => {
    if (
      value === selectedProductVariant?.markup.product_id &&
      product.state === StatisticToProductState[StaticticMarkupType.YES]
    ) {
      try {
        await handleDeffer();
        return;
      } catch {
        showMessage('error', 'Не удалось изменить разметку');
        return;
      }
    }

    if (value !== selectedProductVariant?.markup.product_id) {
      const markup = markupData?.items.find(
        (item) => item.markup.product_id === value,
      );

      setSelectedProductVariant(markup);
    } else {
      setSelectedProductVariant(undefined);
    }

    if (product.state === StatisticToProductState[StaticticMarkupType.YES]) {
      await deleteMarkup({ productdealerkey_id: product.dealerprice.id });
      await handleMarkup(product.state);
    }
  };

  useEffect(() => {
    if (
      selectedProductVariant?.markup.id === product.marked_product?.markup.id
    ) {
      setIsSuccessable(false);
      return;
    }
    setIsSuccessable(true);
  }, [product.marked_product?.markup.id, selectedProductVariant]);

  return {
    product,
    isMarkupLoading,
    markupDataSource,
    contextHolder,
    selectedProductVariant,
    isSuccessable,
    handleMarkup,
    handleStatistic,
    handleSelectionChange,
  };
};
