import { Route, Routes } from 'react-router-dom';
import { MainPage } from 'pages/MainPage/MainPage';
import { ProductPage } from 'pages/ProductPage/ProductPage';
import { StatisticsPage } from 'pages/StatisticsPage/StatisticsPage';
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
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
      <Footer />

      <RegistrationPopup />
      <LoginPopup />
    </>
  );
};
