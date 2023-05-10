import React from 'react';
import { Outlet } from 'react-router-dom';

const ProfileLayout = () => {
  return (
    <>
      <div style={{ color: 'white' }}>Test div layout</div>
      <Outlet />
    </>
  );
};

export default ProfileLayout;
