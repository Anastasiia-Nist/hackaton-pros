// import { useSelector } from 'react-redux';
import './StatisticsPage.scss';
// import { currentSessionSelector } from 'store/currentSession/currentSessionSelectors';

export const StatisticsPage = () => {
  // const currentSession = useSelector(currentSessionSelector);

  return (
    <section className="statistics-page">
      <main className="statistics-page__main">
        <section>
          <h2 className="statistics-page__title">Статистика текущего сеанса</h2>
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
      </main>
    </section>
  );
};
