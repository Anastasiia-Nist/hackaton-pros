import { MainTable } from 'components/MainTable/MainTable';
import { dataSource } from 'mock/mainTableData';
import './MainPage.scss';
import { useTableDataSource } from './hooks/useTableData';

export const MainPage = () => {
  const tableDataSource = useTableDataSource({ dataSource });
  return (
    <section className="main-page" aria-label="Главная страница">
      <main className="main-page__main">
        <MainTable dataSource={tableDataSource} />
      </main>
    </section>
  );
};
