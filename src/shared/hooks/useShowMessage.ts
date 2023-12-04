import { message } from 'antd';
import { useCallback } from 'react';

export const useShowMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = useCallback(
    (type: 'error' | 'success', content: string) => {
      messageApi.open({
        type,
        content,
      });
    },
    [messageApi],
  );

  return {
    contextHolder,
    showMessage,
  };
};
