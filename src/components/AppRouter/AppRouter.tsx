import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import SidebarLayout from '../SidebarLayout/SidebarLayout';
import { privateRoutes, publicRoutes } from '../../router/routes';
import Layout from '../Layout/Layout';
import { getToken } from '../../store/slices/authSlice';
import Login from '../../pages/Login/Login';

const AppRouter = () => {
  const isAuth = useAppSelector(getToken);
  return isAuth ? (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<SidebarLayout />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<div>123</div>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
