import React from 'react';
import classes from './SidebarLayout.module.scss';
import Sidebar from '../UI/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
  return (
    <>
      <div className={classes.sidebarLayout}>
        <Sidebar />
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
