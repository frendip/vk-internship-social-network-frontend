import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
