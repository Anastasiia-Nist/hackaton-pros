import { useSelector } from 'react-redux';
import './StatisticsPage.scss';
import { currentSessionSelector } from 'store/currentSession/currentSessionSelectors';
import { Tabs, Spin } from 'antd';
import { TabsProps } from 'antd/lib';
import { LoadingOutlined } from '@ant-design/icons';
import { useMemo, useEffect, useState } from 'react';
import { useGetStatisticsMutation } from 'store/api/statisticsApi';

export const StatisticsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getStatistics, { data }] = useGetStatisticsMutation();
  const currentSession = useSelector(currentSessionSelector);

  const processed = useMemo(() => {
    const yes = data?.at(0)?.yes || 0;
    const no = data?.at(0)?.no || 0;
    return yes + no;
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    getStatistics().finally(() => setIsLoading(false));
  }, [getStatistics]);

  const averageQueue = useMemo(() => {
    if (currentSession.queueVariants.at(0) === undefined) {
      return '-';
    }

    const sum = currentSession.queueVariants.reduce(
      (acc, item) => acc + item,
      0,
    );

    if (currentSession.queueVariants.length === 0) {
      return 0;
    }
    return sum / currentSession.queueVariants.length;
  }, [currentSession.queueVariants]);

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
          {isLoading || data === undefined ? (
            <Spin
              className="product-page__spinner"
              indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
            />
          ) : (
            <section>
              <h2 className="statistics-page__title">Общая статистика</h2>
              <ul className="statistics-page__general-session">
                <li className="statistics-page__session-item">
                  <h3>Всего обработано</h3>
                  <p>{processed}</p>
                </li>
                <li className="statistics-page__session-item">
                  <h3>Удачных предсказаний</h3>
                  <p className="statistics-page__session-item-success">
                    {data?.at(0)?.yes}
                  </p>
                </li>
                <li className="statistics-page__session-item">
                  <h3>Неудачных предсказаний</h3>
                  <p className="statistics-page__session-item-failed">
                    {data?.at(0)?.no}
                  </p>
                </li>
                <li className="statistics-page__session-item">
                  <h3>Отложенных</h3>
                  <p>{data?.at(0)?.hold}</p>
                </li>
              </ul>
            </section>
          )}
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
