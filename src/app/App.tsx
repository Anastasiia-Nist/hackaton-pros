import { Route, Routes } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/MainPage';
import { ProductPage } from 'pages/ProductPage/ProductPage';
import { SearchPage } from 'pages/SearchPage/SearchPage';
import { Header } from 'ui/Header/Header';
import { Footer } from 'ui/Footer/Footer';
import { RegistrationPopup } from 'ui/RegistrationPopup/RegistrationPopup';
import { LoginPopup } from 'ui/LoginPopup/LoginPopup';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />

      <RegistrationPopup />
      <LoginPopup />
    </>
  );
};
