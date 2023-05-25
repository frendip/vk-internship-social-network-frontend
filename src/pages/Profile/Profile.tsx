import React, { useCallback, useEffect, useState } from 'react';
import classes from './Profile.module.scss';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { CommonButton } from '../../components/UI/Button/Button';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteUser, fetchMe } from '../../store/slices/userSlice';
import PopupWindow from '../../components/UI/PopupWindow/PopupWindow';
import UpdateImageForm from '../../components/UI/Form/UpdateImageForm';
import { deleteToken, getToken } from '../../store/slices/authSlice';
import Loading from '../../components/Loading/Loading';

const Profile = () => {
  const dispatch = useAppDispatch();

  const { user, status } = useAppSelector((state) => state.user);

  const [avatarPopupActive, setAvatarPopupActive] = useState(false);
  const avatarPopupHandler = () => {
    setAvatarPopupActive((prevState) => !prevState);
  };

  const token = useAppSelector(getToken);
  const fetchMeHandler = useCallback(async () => {
    if (token) {
      const val = await dispatch(fetchMe(token));
      if (val.type.endsWith('rejected')) {
        dispatch(deleteToken());
        dispatch(deleteUser());
      }
    }
  }, [dispatch, token]);
  useEffect(() => {
    fetchMeHandler().then();
  }, [fetchMeHandler, token]);

  return (
    <div className={classes.profileCard}>
      {status === 'loading' ? (
        <Loading />
      ) : (
        <div className={classes.profileCard__top}>
          <div className={classes.profileCard__avatar}>
            <div className={classes.profileCard__img}>
              <img src={user?.avatarUrl || defaultAvatar} alt="avatar" />
            </div>
            <div className={classes.profileCard__changeAvatar}>
              <PopupWindow popupActive={avatarPopupActive} setPopupActive={setAvatarPopupActive}>
                <UpdateImageForm closePopup={avatarPopupHandler} />
              </PopupWindow>
              <CommonButton onClick={avatarPopupHandler}>Изменить фото</CommonButton>
            </div>
          </div>
          <div className={classes.profileCard__information}>
            <div className={classes.profileCard__fullname}>
              {user?.firstname} {user?.lastname}
            </div>
            <ul className={classes.profileCard__description}>
              <li className={classes.profileCard__descriptionItem}>
                Дата рождения: <span>{user?.birthday || <>Не указано</>}</span>
              </li>
              <div className={classes.profileCard__descriptionItem}>
                Город: <span>{user?.city || <>Не указано</>}</span>
              </div>
              <div className={classes.profileCard__descriptionItem}>
                Вуз: <span>{user?.university || <>Не указано</>}</span>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
