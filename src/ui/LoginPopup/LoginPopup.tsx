import { Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { loginPopupSelector } from 'store/popups/popupsSelectors';
import { closeAllPopups } from 'store/popups/popupsSlice';
import { Popup } from 'ui/Popup/Popup';
import { SubmitButton } from 'ui/SubmitButton/SubmitButton';

export const LoginPopup = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(loginPopupSelector);
  const [form] = Form.useForm();

  const handleClose = () => {
    dispatch(closeAllPopups());
  };

  return (
    <Popup isOpened={isOpened} onClose={handleClose}>
      <h2 className="popup__title">Вход</h2>
      <Form name="login-form" form={form} layout="vertical">
        <Form.Item
          label="Логин"
          name="login"
          rules={[
            { required: true, message: 'Нужно ввести логин' },
            { min: 3, message: 'Логин должен содержать не менее 3 символов' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: 'Введите пароль' },
            { min: 6, message: 'Длина пароля должна быть не менее 6 символов' },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <SubmitButton form={form} />
        </Form.Item>
      </Form>
    </Popup>
  );
};
