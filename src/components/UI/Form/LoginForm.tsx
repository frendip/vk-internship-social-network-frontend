import React, { useState } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILogin } from '../../../types/types';
import { fetchLogin } from '../../../store/slices/authSlice';
import classes from './formCard.module.scss';
import { CommonButton } from '../Button/Button';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [messageError, setMessageError] = useState<string>('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ILogin>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const { email, password } = data;

    const val = await dispatch(fetchLogin({ email, password }));
    if (val.type.endsWith('fulfilled')) {
      navigate('/');
    } else {
      setMessageError(val.payload as string);
      reset();
    }
  };

  return (
    <div className={classes.card}>
      <h2 className={classes.card__title}>Авторизация</h2>
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
          <CommonButton size={'large'}>Войти!</CommonButton>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
