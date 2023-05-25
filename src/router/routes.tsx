import Profile from '../pages/Profile/Profile';
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';

interface IRouter {
  path: string;
  element: JSX.Element;
}

export const privateRoutes: IRouter[] = [
  { path: '/', element: <Navigate to={'/me'} /> },
  { path: '/:id', element: <Profile /> },
  { path: '*', element: <Navigate to={'/me'} /> },
];

export const publicRoutes: IRouter[] = [
  { path: '/', element: <Navigate to={'/login'} /> },
  { path: '/login', element: <Login /> },
  { path: '/registration', element: <Registration /> },
  { path: '*', element: <Login /> },
];
