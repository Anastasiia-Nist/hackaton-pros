import { Button, Pagination } from 'antd';
import { MainTable } from 'ui/MainTable/MainTable';
import './MainPage.scss';
import { useTableDataSource } from './hooks/useTableData';
import { Filter } from 'ui/Filter/Filter';
import { useSelector } from 'react-redux';
import { mainTablePaginationSelector } from 'store/mainTablePagination/mainTablePaginationSelectors';
import {
  setMainTableCurrentPage,
  setMainTablePageSize,
} from 'store/mainTablePagination/mainTablePagination';
import { DealersModal } from 'ui/DealersModal/DealersModal';
import { useState } from 'react';
import { useAppDispatch } from 'store/store';
import { dealersSelector } from 'store/dealers/dealersSelectors';

export const MainPage = () => {
  const [isDealersOpen, setIsDealersOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { currentPage, pageSize, totalCount } = useSelector(
    mainTablePaginationSelector,
  );
  const { dataSource, handelSetFilter, isLoading, isLoadingAll } =
    useTableDataSource();
  const { currentDealer } = useSelector(dealersSelector);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      dispatch(setMainTableCurrentPage(page));
    }
  };

  const handleShowSizeChange = (_: number, pageSize: number) => {
    dispatch(setMainTablePageSize(pageSize));
    dispatch(setMainTableCurrentPage(1));
  };

  return (
    <section className="main-page" aria-label="Главная страница">
      <main className="main-page__main">
        <div className="main-page__controls">
          <Button onClick={() => setIsDealersOpen(true)}>Выбрать дилера</Button>
          <Filter className="main-page__filter" onSubmit={handelSetFilter} />
        </div>
        <div className="main-page__dealer-label">
          <p>Дилер: {currentDealer?.name || 'Не выбран'}</p>
        </div>
        <MainTable
          dataSource={dataSource}
          isLoading={isLoading || isLoadingAll}
        />
        <div className="main-page__pagination">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={totalCount}
            pageSize={pageSize}
            showSizeChanger={true}
            onShowSizeChange={handleShowSizeChange}
          />
        </div>
      </main>

      <DealersModal
        isOpen={isDealersOpen}
        handleClose={() => setIsDealersOpen(false)}
      />
    </section>
  );
};
