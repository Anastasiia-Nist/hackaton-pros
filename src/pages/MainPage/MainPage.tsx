import { MainTable } from 'ui/MainTable/MainTable';
import { dataSource } from 'mock/mainTableData';
import './MainPage.scss';
import { useTableDataSource } from './hooks/useTableData';
import { Filter } from 'ui/Filter/Filter';

export const MainPage = () => {
  const tableDataSource = useTableDataSource({ dataSource });
  return (
    <section className="main-page" aria-label="Главная страница">
      <main className="main-page__main">
        <Filter className="main-page__filter" />
        <MainTable dataSource={tableDataSource} />
      </main>
    </section>
  );
};
