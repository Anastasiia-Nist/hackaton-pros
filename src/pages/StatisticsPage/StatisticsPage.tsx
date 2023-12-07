import { useSelector } from 'react-redux';
import './StatisticsPage.scss';
import { currentSessionSelector } from 'store/currentSession/currentSessionSelectors';
import { useGetDealerpriceAllMutation } from 'store/api/dealerPriceApi';
import { Tabs, Spin } from 'antd';
import { TabsProps } from 'antd/lib';
import { LoadingOutlined } from '@ant-design/icons';
import { useMemo, useEffect, useState, useCallback } from 'react';

export const StatisticsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getDealerpriceAll, { data }] = useGetDealerpriceAllMutation();
  const currentSession = useSelector(currentSessionSelector);
  const [allMarks, setAllMarks] = useState({
    all: 0,
    null: 0,
    yes: 0,
    no: 0,
    def: 0,
  });

  const getData = useCallback(async () => {
    await getDealerpriceAll({ page: 1, size: 100 });
    for (let i = 2; i <= 30; i++) {
      await getDealerpriceAll({ page: i, size: 100 });
    }
    setIsLoading(false);
  }, [getDealerpriceAll]);

  useEffect(() => {
    if (data) {
      setAllMarks((prev) => ({
        all:
          data.items.filter((i) => {
            return (
              i.state === 'да' || i.state === 'нет' || i.state === 'отложить'
            );
          }).length + prev.all,
        null:
          data.items.filter((i) => {
            return i.state === null;
          }).length + prev.null,
        yes:
          data.items.filter((i) => {
            return i.state === 'да';
          }).length + prev.yes,
        no:
          data.items.filter((i) => {
            return i.state === 'нет';
          }).length + prev.no,
        def:
          data.items.filter((i) => {
            return i.state === 'отложить';
          }).length + prev.def,
      }));
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [getData, getDealerpriceAll]);

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
                  <h3>Размечено</h3>
                  <p>{allMarks?.all}</p>
                </li>
                <li className="statistics-page__session-item">
                  <h3>Не размечено</h3>
                  <p>{allMarks?.null}</p>
                </li>
                <li className="statistics-page__session-item">
                  <h3>Удачных предсказаний</h3>
                  <p className="statistics-page__session-item-success">
                    {allMarks?.yes}
                  </p>
                </li>
                <li className="statistics-page__session-item">
                  <h3>Неудачных предсказаний</h3>
                  <p className="statistics-page__session-item-failed">
                    {allMarks?.no}
                  </p>
                </li>
                <li className="statistics-page__session-item">
                  <h3>Отложенных</h3>
                  <p>{allMarks?.def}</p>
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
