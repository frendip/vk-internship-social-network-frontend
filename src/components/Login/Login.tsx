import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import LoginForm from '../UI/Form/LoginForm';
import Loading from '../Loading/Loading';

const Login = () => {
  const status = useAppSelector((state) => state.auth.status);
  return <>{status === 'loading' ? <Loading /> : <LoginForm />}</>;
};

export default Login;
