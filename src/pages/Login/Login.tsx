import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILogin } from '../../types/types';
import classes from '../../styles/authCard.module.scss';
import { HeaderButton } from '../../components/UI/Button/Button';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { fetchLogin } from '../../store/slices/authSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useAppDispatch();
  const { errorMessage, token } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ILogin>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    const { email, password } = data;
    dispatch(fetchLogin({ email, password }));
  };

  useEffect(() => {
    if (token && !errorMessage) {
      navigate('/');
    } else {
      reset();
    }
  }, [token, errorMessage]);

  return (
    <div className={classes.card}>
      <h2 className={classes.card__title}>Авторизация</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <div className={classes.form__error}>{errorMessage}</div>}
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
          <HeaderButton size={'large'}>Войти!</HeaderButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
