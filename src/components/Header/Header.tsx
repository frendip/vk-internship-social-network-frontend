import React from 'react';
import classes from './Header.module.scss';
import vkLogo from '../../assets/vkLogo.png';
import signOutIcon from '../../assets/signOutIcon.png';
import signUpIcon from '../../assets/signUpIcon.png';
import signInIcon from '../../assets/signInIcon.png';
import { CommonButton } from '../UI/Button/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { signOut } from '../../store/slices/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const { pathname: path } = useLocation();
  const dispatch = useAppDispatch();

  const onClickSignOut = () => {
    dispatch(signOut());
    window.localStorage.removeItem('token');
  };

  return (
    <>
      <div className={classes.header}>
        <div className={classes.header__wrapper}>
          <div className={classes.header__row}>
            <div onClick={() => navigate('/')} className={classes.header__logoButton}>
              <div className={classes.header__logo}>
                <img src={vkLogo} alt="logo" />
              </div>
              <div className={classes.header__title}>ВКОНТАКТЕ</div>
            </div>
            {path === '/login' ? (
              <Link to={'/registration'}>
                <CommonButton size={'large'} image={signUpIcon}>
                  Зарегистрироваться
                </CommonButton>
              </Link>
            ) : path === '/registration' ? (
              <Link to={'/login'}>
                <CommonButton size={'large'} image={signInIcon}>
                  Авторизоваться
                </CommonButton>
              </Link>
            ) : (
              <Link onClick={onClickSignOut} to={'/login'}>
                <CommonButton size={'large'} image={signOutIcon}>
                  Выйти
                </CommonButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
