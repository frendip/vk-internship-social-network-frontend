import React from 'react';
import classes from './Header.module.scss';
import vkLogo from '../../assets/vkLogo.png';
import signOutIcon from '../../assets/signOutIcon.png';
import signUpIcon from '../../assets/signUpIcon.png';
import signInIcon from '../../assets/signInIcon.png';
import { HeaderButton } from '../UI/Button/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

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
                <HeaderButton size={'large'} image={signUpIcon}>
                  Зарегистрироваться
                </HeaderButton>
              </Link>
            ) : path === '/registration' ? (
              <Link to={'/login'}>
                <HeaderButton size={'large'} image={signInIcon}>
                  Авторизоваться
                </HeaderButton>
              </Link>
            ) : (
              <Link to={'/login'}>
                <HeaderButton size={'large'} image={signOutIcon}>
                  Выйти
                </HeaderButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
