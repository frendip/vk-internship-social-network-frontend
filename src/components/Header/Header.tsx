import React from 'react';
import classes from './Header.module.scss';
import vkLogo from '../../assets/vkLogo.png';
import signOutIcon from '../../assets/signOutIcon.png';
import { HeaderButton } from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

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
            <HeaderButton size={'large'} image={signOutIcon}>
              Выйти
            </HeaderButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
