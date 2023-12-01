import { Pagination } from 'antd';
import { MainTable } from 'ui/MainTable/MainTable';
import './MainPage.scss';
import { useTableDataSource } from './hooks/useTableData';
import { Filter } from 'ui/Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  mainTableCurrentPageSelector,
  mainTablePageSizeSelector,
  mainTableTotalCountSelector,
} from 'store/mainTablePagination/mainTablePaginationSelectors';
import {
  setMainTableCurrentPage,
  setMainTablePageSize,
} from 'store/mainTablePagination/mainTablePagination';

export const MainPage = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(mainTableCurrentPageSelector);
  const pageSize = useSelector(mainTablePageSizeSelector);
  const totalCount = useSelector(mainTableTotalCountSelector);
  const dataSource = useTableDataSource();

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
        <Filter className="main-page__filter" />
        <MainTable dataSource={dataSource} />
        <div className="main-page__table-controls">
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
    </section>
  );
};
