import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../../reducers';
import { useRouter } from '../../../shared/utils/hooks/useRouter';

interface IRequireAuthProp {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: IRequireAuthProp) => {
  const { location } = useRouter();
  const { user } = useSelector((state: RootState) => state.authentication);

  if (!user) {
    // if (isBO) return <Navigate to="/auth/login" state={{ path: location.pathname }} />;
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};
