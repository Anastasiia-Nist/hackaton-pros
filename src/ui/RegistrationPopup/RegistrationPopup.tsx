import { Form, Input } from 'antd';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerPopupSelector } from 'store/popups/popupsSelectors';
import { closeAllPopups } from 'store/popups/popupsSlice';
import { Popup } from 'ui/Popup/Popup';
import { SubmitButton } from 'ui/SubmitButton/SubmitButton';
import { useRegistration } from './hooks/useRegistration';
import { RegisterForm } from './model/types';

export const RegistrationPopup = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(registerPopupSelector);
  const [form] = Form.useForm();

  const { contextHolder, isSuccess, isLoading, signupUser } = useRegistration();

  const handleClose = useCallback(() => {
    dispatch(closeAllPopups());
    form.resetFields();
  }, [dispatch, form]);

  const handleSubmit = (values: RegisterForm) => {
    signupUser({
      firstName: values.firstName,
      lastName: values.lastName,
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
        <h2 className="popup__title">Регистрация</h2>
        <Form.Provider
          onFormFinish={(_, info) => handleSubmit(info.values as RegisterForm)}
        >
          <Form name="register-form" form={form} layout="vertical">
            <Form.Item
              label="Имя"
              name="firstName"
              rules={[
                { required: true, message: 'Нужно ввести имя' },
                { min: 3, message: 'Имя должно содержать не менее 3 символов' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Фамилия"
              name="lastName"
              rules={[
                { required: true, message: 'Нужно ввести имя' },
                { min: 3, message: 'Имя должно содержать не менее 3 символов' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Введите почтовый ящик',
                },
              ]}
            >
              <Input type="email" />
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
              <SubmitButton form={form} disabled={isLoading} />
            </Form.Item>
          </Form>
        </Form.Provider>
      </Popup>
    </>
  );
};
