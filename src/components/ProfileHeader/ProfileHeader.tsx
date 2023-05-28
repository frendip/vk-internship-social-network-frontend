import React, { useRef, useState } from 'react';
import PopupWindow from '../UI/PopupWindow/PopupWindow';
import UpdateImageForm from '../UI/Form/UpdateImageForm';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IUser } from '../../types/types';
import { getToken } from '../../store/slices/authSlice';
import { updateMe } from '../../store/slices/userSlice';
import { SubmitHandler } from 'react-hook-form';
import { AvatarButton, CommonButton } from '../UI/Button/Button';
import classes from './ProfileHeader.module.scss';
import defaultAvatar from '../../assets/defaultAvatar.png';
import defaultBg from '../../assets/defaultBg.png';
import penIcon from '../../assets/penIcon.png';
import birthdayIcon from '../../assets/birthdayIcon.svg';
import markerIcon from '../../assets/markerIcon.svg';
import universityIcon from '../../assets/universityIcon.svg';

const ProfileHeader = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const userRef = useRef<IUser | null>(user);

  const token = useAppSelector(getToken);

  const [bgHover, setBgHover] = useState(false);
  const bgHoverHandler = () => {
    setBgHover((prevState) => !prevState);
  };

  const [avatarPopupActive, setAvatarPopupActive] = useState(false);
  const avatarPopupHandler = () => {
    setAvatarPopupActive((prevState) => !prevState);
  };

  const [avatarHover, setAvatarHover] = useState(false);
  const avatarHoverHandler = () => {
    setAvatarHover((prevState) => !prevState);
  };

  const onSubmitAvatarHandler: SubmitHandler<{ url: string }> = async (data) => {
    userRef.current && (userRef.current = { ...userRef.current, avatarUrl: data.url });
    if (token && userRef.current) {
      dispatch(updateMe({ token, user: userRef.current }));
    }
    avatarPopupHandler();
  };

  return (
    <div className={classes.profileHeader}>
      <div
        className={classes.profileHeader__bg}
        onMouseEnter={bgHoverHandler}
        onMouseLeave={bgHoverHandler}>
        <img src={defaultBg} alt="bg" />
        {bgHover && (
          <div className={classes.profileHeader__bgChange}>
            <CommonButton image={penIcon} onClick={avatarPopupHandler}>
              Изменить обложку
            </CommonButton>
          </div>
        )}
        <PopupWindow popupActive={avatarPopupActive} setPopupActive={setAvatarPopupActive}>
          <UpdateImageForm onSubmitHandler={onSubmitAvatarHandler} />
        </PopupWindow>
      </div>
      <div className={classes.profileHeader__card}>
        <div
          className={classes.profileHeader__avatar}
          onMouseEnter={avatarHoverHandler}
          onMouseLeave={avatarHoverHandler}>
          <img src={user?.avatarUrl || defaultAvatar} alt="avatar" />

          {avatarHover && <AvatarButton onClick={avatarPopupHandler}>Изменить фото</AvatarButton>}
          <PopupWindow popupActive={avatarPopupActive} setPopupActive={setAvatarPopupActive}>
            <UpdateImageForm onSubmitHandler={onSubmitAvatarHandler} />
          </PopupWindow>
        </div>
        <div className={classes.profileHeader__information}>
          <div className={classes.profileHeader__fullname}>
            {user?.firstname} {user?.lastname}
          </div>
          <ul className={classes.profileHeader__description}>
            <li className={classes.profileHeader__descriptionItem}>
              <div className={classes.profileHeader__descriptionItemIcon}>
                <img src={markerIcon} alt="markerIcon" />
              </div>
              <span>{user?.city || <>Не указано</>}</span>
            </li>
            <li className={classes.profileHeader__descriptionItem}>
              <div className={classes.profileHeader__descriptionItemIcon}>
                <img src={universityIcon} alt="universityIcon" />{' '}
              </div>
              <span>{user?.university || <>Не указано</>}</span>
            </li>
            <li className={classes.profileHeader__descriptionItem}>
              <div className={classes.profileHeader__descriptionItemIcon}>
                <img src={birthdayIcon} alt="birthdayIcon" />
              </div>
              <span>{user?.birthday || <>Не указано</>}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
