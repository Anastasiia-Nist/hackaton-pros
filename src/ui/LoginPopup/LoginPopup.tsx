import { Form, Input } from 'antd';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginPopupSelector } from 'store/popups/popupsSelectors';
import { closeAllPopups } from 'store/popups/popupsSlice';
import { Popup } from 'ui/Popup/Popup';
import { SubmitButton } from 'ui/SubmitButton/SubmitButton';
import { LoginForm } from './model/types';
import { useLogin } from './hooks/useLogin';

export const LoginPopup = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(loginPopupSelector);
  const [form] = Form.useForm();
  const { contextHolder, isSuccess, isLoading, loginUser } = useLogin();

  const handleClose = useCallback(() => {
    dispatch(closeAllPopups());
    form.resetFields();
  }, [dispatch, form]);

  const handleSubmit = (values: LoginForm) => {
    loginUser({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  return (
    <>
      {contextHolder}
      <Popup isOpened={isOpened} onClose={handleClose}>
        <h2 className="popup__title">Вход</h2>

        <Form.Provider
          onFormFinish={(_, info) => handleSubmit(info.values as LoginForm)}
        >
          <Form name="login-form" form={form} layout="vertical">
            <Form.Item
              label="Логин"
              name="login"
              rules={[
                { required: true, message: 'Нужно ввести логин' },
                {
                  min: 3,
                  message: 'Логин должен содержать не менее 3 символов',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: 'Введите пароль' },
                {
                  min: 6,
                  message: 'Длина пароля должна быть не менее 6 символов',
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item>
              <SubmitButton form={form} disabled={isLoading} />
            </Form.Item>
          </Form>
        </Form.Provider>
      </Popup>
    </>
  );
};
