import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import Loading from '../Loading/Loading';
import RegistrationFrom from '../UI/Form/RegistrationFrom';

const Registration = () => {
  const status = useAppSelector((state) => state.auth.status);
  return <>{status === 'loading' ? <Loading /> : <RegistrationFrom />}</>;
};

export default Registration;
