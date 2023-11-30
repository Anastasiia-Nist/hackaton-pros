import { FC, cloneElement } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  element: React.ReactElement;
  isLoggedIn: boolean;
};

const ProtectedRouteElement: FC<ProtectedRouteProps> = ({
  element,
  isLoggedIn,
  ...props
}) => {
  return isLoggedIn ? (
    cloneElement(element, props)
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRouteElement;
