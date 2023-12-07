import { Button, Modal, Pagination, Table } from 'antd';
import { columns } from './model/consts/consts';
import { useSelector } from 'react-redux';
import { dealersPaginationSelector } from 'store/dealersPagination/dealersPaginationSelectors';
import { useDealersData } from './model/hooks/useDealersData';
import { useAppDispatch } from 'store/store';
import {
  setDealersCurrentPage,
  setDealersPageSize,
} from 'store/dealersPagination/dealersPaginationSlice';
import { setCurrentDealer } from 'store/dealers/dealersSlice';
import { useCallback, useEffect, useState } from 'react';

import './DealersModal.scss';
import { Key } from 'antd/es/table/interface';

type DealersModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const DealersModal = ({ isOpen, handleClose }: DealersModalProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { dataSource, currentDealer, isLoading } = useDealersData(isOpen);
  const [selectedDealer, setSelectedDealer] = useState<number | undefined>(
    currentDealer?.key || undefined,
  );

  const dispatch = useAppDispatch();
  const { currentPage, pageSize, totalCount } = useSelector(
    dealersPaginationSelector,
  );

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      dispatch(setDealersCurrentPage(page));
    }
  };

  const handleShowSizeChange = (_: number, pageSize: number) => {
    dispatch(setDealersPageSize(pageSize));
    dispatch(setDealersCurrentPage(1));
  };

  const handleOkModal = useCallback(() => {
    dispatch(
      setCurrentDealer(
        dataSource.find((item) => item.key === selectedDealer) || null,
      ),
    );
    handleClose();
  }, [selectedDealer, dataSource, dispatch, handleClose]);

  const handleDropSelection = () => {
    setSelectedDealer(undefined);
    dispatch(setCurrentDealer(null));
  };

  const handleOkConfirm = () => {
    setIsConfirmOpen(false);
    handleDropSelection();
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedDealer(currentDealer?.key || undefined);
    }
  }, [isOpen, currentDealer?.key]);

  return (
    <>
      <Modal
        title="Дилеры"
        centered
        width={700}
        className="dealers-modal"
        open={isOpen}
        onOk={handleOkModal}
        onCancel={() => handleClose()}
        footer={[
          <Button key="submit" type="primary" onClick={handleOkModal}>
            Сохранить
          </Button>,
          <Button key="back" onClick={handleClose}>
            Отмена
          </Button>,
          <Button
            key="drop"
            type="primary"
            onClick={() => setIsConfirmOpen(true)}
          >
            Сбросить
          </Button>,
        ]}
      >
        <Table
          loading={isLoading}
          scroll={{ y: 400 }}
          className="dealers-modal__table"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowSelection={{
            type: 'radio',
            columnWidth: 48,
            selectedRowKeys: selectedDealer
              ? [selectedDealer]
              : false || currentDealer?.key
                ? [currentDealer?.key as Key]
                : [],
            // Do not remove. This func is for the radio button click
            // otherwise it will not work
            onChange: (selectedRowKeys) => {
              setSelectedDealer(selectedRowKeys[0] as number);
            },
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                setSelectedDealer(record.key);
              },
            };
          }}
        />

        <Pagination
          className="dealers-modal__pagination"
          current={currentPage}
          onChange={handlePageChange}
          total={totalCount}
          pageSize={pageSize}
          showSizeChanger={true}
          onShowSizeChange={handleShowSizeChange}
        />
      </Modal>

      <Modal
        title="Сбросить фильтр"
        centered
        className="dealers-confirm"
        open={isConfirmOpen}
        onOk={handleOkConfirm}
        onCancel={handleCloseConfirm}
      >
        Фильтр будет сброшен, продолжить?
      </Modal>
    </>
  );
};
