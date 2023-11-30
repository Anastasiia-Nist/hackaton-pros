import { type FormInstance } from 'antd';
import { Button } from 'antd';
import { useSubmittable } from './hooks/useSubmittable';

type SubmitButtonProps = {
  form: FormInstance;
  disabled?: boolean;
};

export const SubmitButton = ({ form, disabled = true }: SubmitButtonProps) => {
  const isSubmittable = useSubmittable({ form });

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!isSubmittable || disabled}
    >
      Отправить
    </Button>
  );
};
