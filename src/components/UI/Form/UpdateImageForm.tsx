import React, { FC, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classes from './formCard.module.scss';
import { CommonButton } from '../Button/Button';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { IUser } from '../../../types/types';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateMe } from '../../../store/slices/userSlice';

interface UpdateImageFormProps {
  closePopup: () => void;
}

const UpdateImageForm: FC<UpdateImageFormProps> = ({ closePopup }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ url: string }>({
    mode: 'onBlur',
  });

  const dispatch = useAppDispatch();
  const userRef = useRef<IUser | null>(useAppSelector((state) => state.user.user));
  const token = useAppSelector((state) => state.auth.token);

  const onSubmit: SubmitHandler<{ url: string }> = async (data) => {
    userRef.current && (userRef.current = { ...userRef.current, avatarUrl: data.url });
    console.log(JSON.stringify(userRef.current));
    if (token && userRef.current) {
      dispatch(updateMe({ token, user: userRef.current }));
    }
    closePopup();
  };

  return (
    <div className={classes.card}>
      <h2 className={classes.card__title}>Введите URL новой аватарки: </h2>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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

export default UpdateImageForm;
