import React, { useState } from 'react';
import classes from '../../styles/formCard.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRegistration } from '../../types/types';
import { CommonButton } from '../../components/UI/Button/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { fetchRegistration } from '../../store/slices/authSlice';

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [messageError, setMessageError] = useState<string>('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRegistration>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IRegistration> = async (data) => {
    const { email, password, firstname, lastname } = data;
    const val = await dispatch(fetchRegistration({ email, password, firstname, lastname }));
    if (val.type.endsWith('fulfilled')) {
      const token = val.payload;
      window.localStorage.setItem('token', token as string);
      navigate('/');
    } else {
      setMessageError(val.payload as string);
      reset();
    }
  };

  return (
    <div className={classes.card}>
      <h2 className={classes.card__title}>Регистрация</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {messageError && <div className={classes.form__error}>{messageError}</div>}
        <label className={classes.form__label}>
          <div className={classes.form__labelTitle}>Почта</div>
          <input
            className={classes.form__input}
            {...register('email', {
              required: 'Введите почту.',
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: 'Введите корректную почту.',
              },
            })}
          />
          {errors?.email && <div className={classes.form__error}>{errors.email.message}</div>}
        </label>
        <label className={classes.form__label}>
          <div className={classes.form__labelTitle}>Имя</div>
          <input
            className={classes.form__input}
            {...register('firstname', {
              required: 'Введите имя.',
              minLength: {
                value: 2,
                message: 'Имя должно содержать минимум 2 символа.',
              },
            })}
          />
          {errors?.firstname && (
            <div className={classes.form__error}>{errors.firstname.message}</div>
          )}
        </label>
        <label className={classes.form__label}>
          <div className={classes.form__labelTitle}>Фамилия</div>
          <input
            className={classes.form__input}
            {...register('lastname', {
              required: 'Введите фамилию.',
              minLength: {
                value: 2,
                message: 'Фамилия должна содержать минимум 2 символа.',
              },
            })}
          />
          {errors?.lastname && <div className={classes.form__error}>{errors.lastname.message}</div>}
        </label>
        <label className={classes.form__label}>
          <div className={classes.form__labelTitle}>Пароль</div>
          <input
            type={'password'}
            className={classes.form__input}
            {...register('password', {
              required: 'Введите пароль.',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать минимум 6 символов.',
              },
            })}
          />
          {errors?.password && <div className={classes.form__error}>{errors.password.message}</div>}
        </label>
        <div className={classes.form__submit}>
          <CommonButton size={'large'}>Зарегистрироваться!</CommonButton>
        </div>
      </form>
    </div>
  );
};

export default Registration;
