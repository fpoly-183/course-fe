import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const AccountManagement = React.lazy(() => import('./AccountManagement'));
const AccountUpdate = React.lazy(() => import('./AccountUpdate'));

const accountManagementLayout: RouteObject[] = [
  {
    path: '/',
    element: (
        <AccountManagement />
    ),
  },
  {
    path: 'create',
    element: (
        <AccountUpdate />
    ),
  },
  {
    path: 'edit/:id',
    element: (
        <AccountUpdate />
    ),
  },
  {
    path: 'detail/:id',
    element: (
        <AccountUpdate />
    ),
  },
  { path: '*', element: <Navigate to="/404" /> },
];

const AccountManagementRoutes = () => useRoutes(accountManagementLayout);
export default AccountManagementRoutes;
