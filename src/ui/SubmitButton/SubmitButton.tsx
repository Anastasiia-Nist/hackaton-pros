import { type FormInstance } from 'antd';
import { Button } from 'antd';
import { useSubmittable } from './hooks/useSubmittable';

type SubmitButtonProps = {
  form: FormInstance;
};

export const SubmitButton = ({ form }: SubmitButtonProps) => {
  const isSubmittable = useSubmittable({ form });

  return (
    <Button type="primary" htmlType="submit" disabled={!isSubmittable}>
      Отправить
    </Button>
  );
};
