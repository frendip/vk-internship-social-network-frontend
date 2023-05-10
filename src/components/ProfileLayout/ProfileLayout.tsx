import React from 'react';
import classes from './ProfileLayout.module.scss';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const ProfileLayout = () => {
  return (
    <>
      <div className={classes.profileLayout}>
        <NavBar />
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
