import React from 'react';
import classes from '../../styles/authCard.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRegistration } from '../../types/types';
import { HeaderButton } from '../../components/UI/Button/Button';

const Registration = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistration>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IRegistration> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className={classes.card}>
      <h2 className={classes.card__title}>Регистрация</h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
          <HeaderButton size={'large'}>Зарегистрироваться!</HeaderButton>
        </div>
      </form>
    </div>
  );
};

export default Registration;