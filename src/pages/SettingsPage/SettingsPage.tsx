import { Button, Card, Modal, Space } from 'antd';
import './SettingsPage.scss';
import { useState } from 'react';

export const SettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropSession = () => {
    setIsModalOpen(false);
    localStorage.removeItem('store');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <section className="settings-page" aria-label="Настройки">
      <main className="settings-page__main">
        <Space direction="vertical">
          <Card title="Настройки текущей сессии">
            <Button onClick={() => setIsModalOpen(true)}>
              Сбросить настройки сессии
            </Button>
          </Card>
        </Space>
      </main>
      <Modal
        title="Сбросить сессию"
        centered
        className="dealers-confirm"
        open={isModalOpen}
        onOk={dropSession}
        onCancel={() => setIsModalOpen(false)}
      >
        Все данные, включая статистику данной сессии будут сброшены, продолжить?
      </Modal>
    </section>
  );
};
