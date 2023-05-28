import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import LoginForm from '../../components/UI/Form/LoginForm';
import Loading from '../../components/Loading/Loading';
import { fetchLogin } from '../../store/slices/authSlice';
import { SubmitHandler } from 'react-hook-form';
import { ILogin } from '../../types/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [messageError, setMessageError] = useState<string>('');
  const onSubmitHandler: SubmitHandler<ILogin> = async (data) => {
    const { login, password } = data;

    const val = await dispatch(fetchLogin({ login, password }));
    if (val.type.endsWith('fulfilled')) {
      navigate('/');
    } else {
      setMessageError(val.payload as string);
    }
  };

  const status = useAppSelector((state) => state.auth.status);
  return (
    <>
      {status === 'loading' ? (
        <Loading />
      ) : (
        <LoginForm messageError={messageError} onSubmitHandler={onSubmitHandler} />
      )}
    </>
  );
};

export default Login;
