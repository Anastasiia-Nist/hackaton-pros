import './SearchPage.scss';
import Search from 'ui/Search/Search';

export const SearchPage = () => {
  return (
    <section className="search-page">
      <Search />
      <main className="search__main">
        <p>SearchPage</p>
      </main>
    </section>
  );
};
