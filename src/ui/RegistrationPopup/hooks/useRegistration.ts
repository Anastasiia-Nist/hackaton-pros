import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { ErrorType } from 'shared/errors/types';
import { useSignupUserMutation } from 'store/api/authApi';
import {
  REGISTER_USER_ALREADY_EXISTS,
  REGISTER_USER_ALREADY_EXISTS_TEXT,
  UNKNOWN_ERROR_TEXT,
  VALIDATION_ERROR,
} from 'utils/constans';

export const useRegistration = () => {
  const [signupUser, { isSuccess, isLoading, isError, error }] =
    useSignupUserMutation();

  const [currentMessage, setCurrentMessage] = useState<{
    type: 'error' | 'success';
    content: string;
  }>({
    type: 'success',
    content: '',
  });

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

  const getRegisterErrorMessage = (
    status: number,
    error: ErrorType,
  ): string => {
    let message = '';
    if (Array.isArray(error)) {
      message = error.join(', ');
    } else {
      message = error;
    }

    switch (status.toString()) {
      case REGISTER_USER_ALREADY_EXISTS:
        return REGISTER_USER_ALREADY_EXISTS_TEXT;
      case VALIDATION_ERROR:
        return message;

      default:
        return UNKNOWN_ERROR_TEXT;
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
      if (error && 'status' in error) {
        let errMessage = '';
        if ('error' in error) {
          errMessage = error.error;
        } else {
          const detail = error.data as ErrorType;
          errMessage = getRegisterErrorMessage(error.status, detail);
        }
        setCurrentMessage({ type: 'error', content: errMessage });
      } else if (error) {
        setCurrentMessage({
          type: 'error',
          content: error.message || error.toString(),
        });
      }
    }
  }, [isLoading, isError, error, setCurrentMessage]);

  useEffect(() => {
    if (currentMessage.content) {
      showMessage(currentMessage.type, currentMessage.content);
    }
  }, [currentMessage, showMessage]);

  return {
    contextHolder,
    isLoading,
    isSuccess,
    signupUser,
  };
};
