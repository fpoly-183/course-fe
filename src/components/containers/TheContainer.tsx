import { memo, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RootState } from '../../reducers';
import { publicRoutes } from '../../routes';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContainer = () => {
  const routeRender = createHashRouter(publicRoutes);
  const { darkMode } = useSelector((state: RootState) => state.container);

  const dispatch = useDispatch<any>();
  const { token } = useSelector((state: RootState) => state.authentication);

  useEffect(() => {
    let tempToken = token;
    if (!tempToken) {
      tempToken = localStorage.getItem('authentication_token');
    }

    if (tempToken) {
      // dispatch(fetching());
      // dispatch(getUserInfo());
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className={darkMode ? 'dark-theme' : 'light-theme'}>
      <ToastContainer
        position={'top-center'}
        className="toastify-container"
        toastClassName="toastify-toast"
      />
      <Suspense fallback={loading}>
        <RouterProvider router={routeRender} />
      </Suspense>
    </div>
  );
};

export default memo(TheContainer);
