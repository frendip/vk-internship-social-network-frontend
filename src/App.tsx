import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './styles/styles.module.scss';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import ProfileLayout from './components/ProfileLayout/ProfileLayout';
import { useAppSelector } from './hooks/useAppSelector';
import { selectIsAuth } from './store/slices/authSlice';

function App() {
  const isAuth = useAppSelector(selectIsAuth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ProfileLayout />}>
            <Route index element={isAuth ? <Navigate to="/me" /> : <Navigate to={'/login'} />} />
            <Route path="/:id" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<div>not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
