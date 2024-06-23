import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  return (
    <div className="w-full">
      <Suspense fallback={loading}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default React.memo(TheContent);
