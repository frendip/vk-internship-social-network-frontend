import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRegistration } from '../../../types/types';
import classes from './formCard.module.scss';
import { CommonButton } from '../Button/Button';

interface RegistrationFromProps {
  messageError: string;
  onSubmitHandler: SubmitHandler<IRegistration>;
}

const RegistrationFrom: FC<RegistrationFromProps> = ({ messageError, onSubmitHandler }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistration>({
    mode: 'onBlur',
  });

  return (
    <div className={classes.card}>
      <h2 className={classes.card__title}>Регистрация</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmitHandler)}>
        {messageError && <div className={classes.form__error}>{messageError}</div>}
        <label className={classes.form__label}>
          <div className={classes.form__labelTitle}>Логин</div>
          <input
            className={classes.form__input}
            {...register('login', {
              required: 'Введите логин.',
              minLength: {
                value: 3,
                message: 'Логин должен содержать минимум 3 символа.',
              },
            })}
          />
          {errors?.login && <div className={classes.form__error}>{errors.login.message}</div>}
        </label>
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

export default RegistrationFrom;
