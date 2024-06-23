import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));
const ForgotPassword = React.lazy(() => import('./ForgotPassword'));

export const authLayout: RouteObject[] = [
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
  { path: 'forgot', element: <ForgotPassword /> },
  { path: '*', element: <Navigate to="/404" /> },
];

const AuthRoutes = () => useRoutes(authLayout);
export default AuthRoutes;
