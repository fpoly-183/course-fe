import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import TheLayout from './components/containers/TheLayout';
import AccountManagementRoutes from './components/modules/account/routes';

const ForgotPassword = React.lazy(() => import('./components/modules/auth/ForgotPassword'));
const Login = React.lazy(() => import('./components/modules/auth/Login'));
const Register = React.lazy(() => import('./components/modules/auth/Register'));

const Dashboard = React.lazy(() => import('./components/dummy/dashboard/Dashboard'));

const Charts = React.lazy(() => import('./components/dummy/charts/Charts'));
// Error pages

const Page404 = React.lazy(() => import('./components/modules/Page404'));
const Page500 = React.lazy(() => import('./components/modules/Page500'));
const Page403 = React.lazy(() => import('./components/modules/Page403'));

const DummyBackOfficeHome = () => <div>Home Page</div>;

const privateRoutes: RouteObject[] = [
  { path: '', element: <DummyBackOfficeHome /> },
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'charts', element: <Charts /> },
  { path: '*', element: <Navigate to="/404" replace /> },
];

const cmsRoutes: RouteObject[] = [
  { path: '', element: <Dashboard /> },
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'account-management/*', element: <AccountManagementRoutes /> },
  { path: '*', element: <Navigate to="/404" replace /> },
];

const publicRoutes: RouteObject[] = [
  {
    path: '/*',
    element: (
      // <RequireAuth>
      <TheLayout />
      // </RequireAuth>
    ),
    children: cmsRoutes,
    caseSensitive: true,
  },
  { path: '/404', element: <Page404 /> },
  { path: '/500', element: <Page500 /> },
  { path: '/403', element: <Page403 /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot', element: <ForgotPassword /> },
  { path: '*', element: <Navigate to="/404" replace /> },
];

const RouteRender = () => useRoutes(publicRoutes);

// const BackOfficeRender = () => useRoutes(backOffice);

// const BackOfficeRender = () => {
//   const { location } = useRouter();

//   const { user } = useSelector((state: RootState) => state.authentication);

//   const routes = useRoutes(
//     Boolean(user)
//       ? backOffice
//       : [{ path: '*', element: <Navigate to="/auth/login" state={{ path: location.pathname }} /> }]
//   );
//   return routes;
// };

export { RouteRender, privateRoutes, publicRoutes };
