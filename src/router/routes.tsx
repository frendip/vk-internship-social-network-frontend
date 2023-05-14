import Profile from '../pages/Profile/Profile';
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import Registration from '../components/Registration/Registration';

interface IRouter {
  path: string;
  element: JSX.Element;
}

export const privateRoutes: IRouter[] = [
  { path: '/', element: <Navigate to={'/me'} /> },
  { path: '/:id', element: <Profile /> },
];

export const publicRoutes: IRouter[] = [
  { path: '/', element: <Navigate to={'/login'} /> },
  { path: '/login', element: <Login /> },
  { path: '/registration', element: <Registration /> },
];
