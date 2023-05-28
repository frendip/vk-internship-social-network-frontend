import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classes from './formCard.module.scss';
import { CommonButton } from '../Button/Button';

interface UpdateBgFormProps {
  onSubmitHandler: SubmitHandler<{ url: string }>;
}

const UpdateBackgroundForm: FC<UpdateBgFormProps> = ({ onSubmitHandler }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ url: string }>({
    mode: 'onBlur',
  });

  return (
    <div className={classes.card}>
      <h2 className={classes.card__title}>Введите URL нового фона: </h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <label className={classes.form__label}>
          <div className={classes.form__labelTitle}>URL:</div>
          <input
            className={classes.form__input}
            {...register('url', {
              required: 'Введите URL.',
              pattern: {
                value:
                  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
                message: 'Введите корректный URL.',
              },
            })}
          />
          {errors?.url && <div className={classes.form__error}>{errors.url.message}</div>}
        </label>
        <div className={classes.form__submit}>
          <CommonButton size={'large'}>Обновить!</CommonButton>
        </div>
      </form>
    </div>
  );
};

export default UpdateBackgroundForm;
