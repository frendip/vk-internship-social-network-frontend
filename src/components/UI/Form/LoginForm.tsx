import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILogin } from '../../../types/types';
import classes from './formCard.module.scss';
import { CommonButton } from '../Button/Button';

interface LoginFormProps {
  messageError: string;
  onSubmitHandler: SubmitHandler<ILogin>;
}

const LoginForm: FC<LoginFormProps> = ({ messageError, onSubmitHandler }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>({
    mode: 'onBlur',
  });

  return (
    <div className={classes.card}>
      <h2 className={classes.card__title}>Авторизация</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmitHandler)}>
        {messageError && <div className={classes.form__error}>{messageError}</div>}
        <label className={classes.form__label}>
          <div className={classes.form__labelTitle}>Логин или пароль</div>
          <input
            className={classes.form__input}
            {...register('login', {
              required: 'Введите логин или почту.',
              minLength: {
                value: 3,
                message: 'Логин или почта должны содержать минимум 3 символа',
              },
            })}
          />
          {errors?.login && <div className={classes.form__error}>{errors.login.message}</div>}
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
