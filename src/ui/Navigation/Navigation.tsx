import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import './Navigation.scss';

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
    getItem('Статистика', '/statistics'),
  ]),

  { type: 'divider' },
];

const App: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key, { replace: true });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b959',
        },
      }}
    >
      <Menu
        id="custom-nav"
        onClick={onClick}
        style={{ width: 156 }}
        defaultSelectedKeys={[pathname]}
        mode="horizontal"
        items={items}
        triggerSubMenuAction={'click'}
      />
    </ConfigProvider>
  );
};

export default App;
