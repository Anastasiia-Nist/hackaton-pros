import { Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { registerPopupSelector } from 'store/popupsSelectors';
import { closeAllPopups } from 'store/popupsSlice';
import { Popup } from 'ui/Popup/Popup';
import { SubmitButton } from 'ui/SubmitButton/SubmitButton';

export const RegistrationPopup = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(registerPopupSelector);
  const [form] = Form.useForm();

  const handleClose = () => {
    dispatch(closeAllPopups());
  };

  return (
    <Popup isOpened={isOpened} onClose={handleClose}>
      <h2 className="popup__title">Регистрация</h2>
      <Form name="register-form" form={form} layout="vertical">
        <Form.Item
          label="Имя"
          name="username"
          rules={[
            { required: true, message: 'Нужно ввести имя' },
            { min: 3, message: 'Имя должно содержать не менее 3 символов' },
          ]}
        >
          <Input />
        </Form.Item>
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

        <Form.Item
          label="Повторите пароль"
          name="password2"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
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
