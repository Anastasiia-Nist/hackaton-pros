import { useSelector } from 'react-redux';
import './StatisticsPage.scss';
import { currentSessionSelector } from 'store/currentSession/currentSessionSelectors';
import { Pagination, Table, Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import { useMemo } from 'react';

export const StatisticsPage = () => {
  const currentSession = useSelector(currentSessionSelector);

  const averageQueue = useMemo(() => {
    const sum = currentSession.queueVariants.reduce(
      (acc, item) => acc + item,
      0,
    );

    if (currentSession.queueVariants.length === 0) {
      return 0;
    }
    return sum / currentSession.queueVariants.length;
  }, [currentSession.queueVariants]);

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
                <p>
                  {currentSession.deffered +
                    currentSession.successMarkups +
                    currentSession.failedMarkups}
                </p>
              </li>
              <li className="statistics-page__session-item">
                <h3>Выбирается по счету вариант</h3>
                <p>{averageQueue}</p>
              </li>
              <li className="statistics-page__session-item">
                <h3>Удачных предсказаний</h3>
                <p className="statistics-page__session-item-success">
                  {currentSession.successMarkups}
                </p>
              </li>
              <li className="statistics-page__session-item">
                <h3>Неудачных предсказаний</h3>
                <p className="statistics-page__session-item-failed">
                  {currentSession.failedMarkups}
                </p>
              </li>
              <li className="statistics-page__session-item">
                <h3>Отложенных</h3>
                <p>{currentSession.deffered}</p>
              </li>
            </ul>
          </section>
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
