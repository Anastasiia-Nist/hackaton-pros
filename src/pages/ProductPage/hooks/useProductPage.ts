import { usePostStatisticsMutation } from 'store/api/statisticsApi';
import {
  useDeleteMarkupMutation,
  useGetMarkupMutation,
  usePostMarkupMutation,
} from 'store/api/markupApi';
import { useCallback, useEffect, useState } from 'react';
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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedProductVariant, setSelectedProductVariant] = useState<
    Markup | undefined
  >(undefined);

  const dispatch = useAppDispatch();
  const currentSession = useSelector(currentSessionSelector);
  const { showMessage, contextHolder } = useShowMessage();

  const [getMarkup, { isLoading: isMarkupLoading, data: markupData }] =
    useGetMarkupMutation();
  const [postMarkup] = usePostMarkupMutation();
  const [deleteMarkup, { isSuccess: isDeleteSuccess }] =
    useDeleteMarkupMutation();

  const [postStatistics] = usePostStatisticsMutation();

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
        selectedProductVariant?.product_id,
        product,
      );
      dispatch(setProduct({ ...product, is_marked: markupType }));
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
      await handlePostStatistic(
        markupType,
        selectedProductVariant?.product_id,
        product,
      );
      dispatch(setProduct({ ...product, is_marked: markupType }));
    },
    [handlePostStatistic, selectedProductVariant, product, dispatch],
  );

  const handleOkConfirm = async () => {
    await deleteMarkup({ productdealerkey_id: product.dealerprice.id });

    if (!isDeleteSuccess) {
      setSelectedProductVariant(undefined);
      dispatch(setProduct({ ...product, is_marked: undefined }));
      getMarkup({ productId: product.dealerprice.id });
      setIsConfirmOpen(false);
      showMessage('success', 'Разметка удалена');
      return;
    }

    showMessage('error', 'Не удалось удалить разметку');
  };

  const handleSelectionChange = (value: number) => {
    if (value === selectedProductVariant?.product_id) {
      setSelectedProductVariant(undefined);
      return;
    }

    setSelectedProductVariant(
      markupData?.items.find((item) => item.product_id === value),
    );
  };

  return {
    product,
    isMarkupLoading,
    markupData,
    isConfirmOpen,
    contextHolder,
    selectedProductVariant,
    setIsConfirmOpen,
    handleMarkup,
    handleStatistic,
    handleOkConfirm,
    handleSelectionChange,
  };
};
