import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import Loading from '../../components/Loading/Loading';
import RegistrationFrom from '../../components/UI/Form/RegistrationFrom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { IRegistration } from '../../types/types';
import { fetchRegistration } from '../../store/slices/authSlice';

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [messageError, setMessageError] = useState<string>('');

  const onSubmitHandler: SubmitHandler<IRegistration> = async (data) => {
    const { email, password, firstname, lastname } = data;
    const val = await dispatch(fetchRegistration({ email, password, firstname, lastname }));
    if (val.type.endsWith('fulfilled')) {
      const token = val.payload;
      window.localStorage.setItem('token', token as string);
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
        <RegistrationFrom messageError={messageError} onSubmitHandler={onSubmitHandler} />
      )}
    </>
  );
};

export default Registration;
