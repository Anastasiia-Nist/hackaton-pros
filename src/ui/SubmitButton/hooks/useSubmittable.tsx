import { Form, type FormInstance } from 'antd';
import { useState, useEffect } from 'react';

export const useSubmittable = ({ form }: { form: FormInstance }): boolean => {
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
  }, [values]);

  useEffect(() => {
    console.log(isSubmittable);
  }, [isSubmittable]);

  return isSubmittable;
};
