import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

const RoleManagement = React.lazy(() => import('./RoleManagement'));
const AccountUpdate = React.lazy(() => import('./RoleUpdate'));

const roleManagementLayout: RouteObject[] = [
  {
    path: '/',
    element: <RoleManagement />,
  },
  {
    path: 'create',
    element: <AccountUpdate />,
  },
  {
    path: 'edit/:id',
    element: <AccountUpdate />,
  },
  {
    path: 'detail/:id',
    element: <AccountUpdate />,
  },
  { path: '*', element: <Navigate to="/404" /> },
];

const RoleManagementRoutes = () => useRoutes(roleManagementLayout);
export default RoleManagementRoutes;
