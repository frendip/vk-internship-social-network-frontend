import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const param = useParams();
  return <div style={{ color: 'white' }}>it is my profile {param.id}</div>;
};

export default Profile;
