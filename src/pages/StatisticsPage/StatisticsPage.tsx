import { useSelector } from 'react-redux';
import './StatisticsPage.scss';
import { currentSessionSelector } from 'store/currentSession/currentSessionSelectors';
import { Pagination, Table, Tabs } from 'antd';
import { TabsProps } from 'antd/lib';

export const StatisticsPage = () => {
  const currentSession = useSelector(currentSessionSelector);
  const markedCount = currentSession.markedCount;

  const dataSource = [{ markedCount }];
  const statisticColumns = [
    {
      title: 'Всего размечено',
      dataIndex: 'markedCount',
    },
    {
      title: 'Удачных предсказаний',
      dataIndex: 'YesMarkup',
    },
    {
      title: 'Неудачных предсказаний',
      dataIndex: 'NoMarkup',
    },
    {
      title: 'Отложенных',
      dataIndex: 'defferedMarkup',
    },
  ];

  const items: TabsProps['items'] = [
    {
      key: 'current',
      label: 'Статистика по текущей выгрузке',
      children: (
        <>
          <section>
            <h2 className="statistics-page__title">
              Статистика текущего сеанса
            </h2>
            <ul className="statistics-page__current-session">
              <li className="statistics-page__session-item">
                <h3>Размечено</h3>
                <p>text</p>
              </li>
              <li className="statistics-page__session-item">
                <h3>Выбирается по счету вариант</h3>
                <p>text</p>
              </li>
              <li className="statistics-page__session-item">
                <h3>Удачных предсказаний</h3>
                <p className="statistics-page__session-item-success">text</p>
              </li>
              <li className="statistics-page__session-item">
                <h3>Неудачных предсказаний</h3>
                <p className="statistics-page__session-item-failed">text</p>
              </li>
              <li className="statistics-page__session-item">
                <h3>Отложенных</h3>
                <p>text</p>
              </li>
            </ul>
          </section>
          <Table dataSource={dataSource} columns={statisticColumns} />
          <div className="statistic-page__pagination">
            <Pagination />
          </div>
        </>
      ),
    },
    {
      key: 'general',
      label: 'Общая статистика',
      children: (
        <>
          <Table dataSource={[]} columns={statisticColumns} />
          <div className="statistic-page__pagination">
            <Pagination />
          </div>
        </>
      ),
    },
  ];

  return (
    <section className="statistics-page">
      <main className="statistics-page__main">
        <Tabs defaultActiveKey="current" items={items} />
      </main>
    </section>
  );
};
