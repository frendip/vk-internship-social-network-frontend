import React from 'react';
import classes from './Header.module.scss';
import vkLogo from '../../assets/vkLogo.png';
import signOutIcon from '../../assets/signOutIcon.png';
import { HeaderButton } from '../UI/Button/Button';

const Header = () => {
  return (
    <>
      <div className={classes.header}>
        <div className={classes.header__wrapper}>
          <div className={classes.header__row}>
            <div className={classes.header__col}>
              <div className={classes.header__logo}>
                <img src={vkLogo} alt="logo" />
              </div>
              <div className={classes.header__title}>ВКОНТАКТЕ</div>
            </div>
            <div className={classes.header__col}>
              <HeaderButton size={'large'} image={signOutIcon}>
                Выйти
              </HeaderButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
