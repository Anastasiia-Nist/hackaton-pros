import { MainTable } from 'components/MainTable/MainTable';
import { dataSource } from 'mock/mainTableData';
import './MainPage.scss';
import { useTableDataSource } from './hooks/useTableData';
import { Header } from 'components/Header/Header';

export const MainPage = () => {
  const tableDataSource = useTableDataSource({ dataSource });
  return (
    <section className="main-page" aria-label="Главная страница">
      <Header />
      <main className="main-page__main">
        <MainTable dataSource={tableDataSource} />
      </main>
      <footer className="main-page__footer">Prosept&copy;</footer>
    </section>
  );
};
