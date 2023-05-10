import React from 'react';
import classes from './NavBar.module.scss';
import { Link } from 'react-router-dom';
import { CommonButton } from '../UI/Button/Button';
import friendsIcon from '../../assets/friendsIcon.png';
import mesIcon from '../../assets/mesIcon.png';
import newsIcon from '../../assets/newsIcon.png';
import pageIcon from '../../assets/pageIcon.png';

const NavBar = () => {
  return (
    <div className={classes.navBar}>
      <ul className={classes.navBar__items}>
        <li className={classes.navBar__item}>
          <Link to="/me">
            <CommonButton size={'large'} image={pageIcon} stretched={true} textPositionLeft={true}>
              Моя страница
            </CommonButton>
          </Link>
        </li>
        <li className={classes.navBar__item}>
          <Link to="/mes">
            <CommonButton size={'large'} image={mesIcon} stretched={true} textPositionLeft={true}>
              Мои сообщения
            </CommonButton>
          </Link>
        </li>
        <li className={classes.navBar__item}>
          <Link to="/friends">
            <CommonButton
              size={'large'}
              image={friendsIcon}
              stretched={true}
              textPositionLeft={true}>
              Мои друзья
            </CommonButton>
          </Link>
        </li>
        <li className={classes.navBar__item}>
          <Link to="/news">
            <CommonButton size={'large'} image={newsIcon} stretched={true} textPositionLeft={true}>
              Мои новости
            </CommonButton>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
