import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

import './Navigation.scss';
import { useAppDispatch } from 'store/store';
import { openLoginPopup, openRegisterPopup } from 'store/popups/popupsSlice';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/auth/authSelectors';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Меню', 'menu', null, [
    getItem('На главную', '/'),
    getItem('Продукты', '/product'),
    getItem('Поиск', '/search'),
    getItem('Профиль', 'profile', null, [
      getItem('Аккаунт', '/profile'),
      getItem('Выйти', '/logout'),
    ]),
  ]),

  { type: 'divider' },
];

const App: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = !!useSelector(userSelector);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    navigate(e.key, { replace: true });
  };

  return (
    <nav className="navigation">
      {!isLoggedIn ? (
        <>
          <Button onClick={() => dispatch(openLoginPopup())}>Войти</Button>
          <Button onClick={() => dispatch(openRegisterPopup())}>
            Регистрация
          </Button>
        </>
      ) : (
        <Menu
          id="custom-nav"
          onClick={onClick}
          style={{ width: 156 }}
          defaultSelectedKeys={[pathname]}
          mode="horizontal"
          items={items}
          triggerSubMenuAction={'click'}
        />
      )}
    </nav>
  );
};

export default App;
