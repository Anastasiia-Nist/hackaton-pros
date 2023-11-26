import { Form, type FormInstance } from 'antd';
import { useState, useEffect } from 'react';
import { Button } from 'antd';

type SubmitButtonProps = {
  form: FormInstance;
};

export const SubmitButton = ({ form }: SubmitButtonProps) => {
  const [isSubmittable, setIsSubmittable] = useState(false);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setIsSubmittable(true);
      },
      () => {
        setIsSubmittable(false);
      },
    );
  }, [values, form]);

  return (
    <Button type="primary" htmlType="submit" disabled={!isSubmittable}>
      Отправить
    </Button>
  );
};
