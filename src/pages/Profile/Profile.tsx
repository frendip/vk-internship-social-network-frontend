import React, { useCallback, useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteUser, fetchMe } from '../../store/slices/userSlice';
import { deleteToken, getToken } from '../../store/slices/authSlice';
import Loading from '../../components/Loading/Loading';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);

  const token = useAppSelector(getToken);
  const fetchMeHandler = useCallback(async () => {
    if (token) {
      const val = await dispatch(fetchMe(token));
      if (val.type.endsWith('rejected')) {
        dispatch(deleteToken());
        dispatch(deleteUser());
      }
    }
  }, [dispatch, token]);
  useEffect(() => {
    if (token) {
      fetchMeHandler().then();
    }
  }, [fetchMeHandler, token]);

  if (status === 'loading') {
    return <Loading />;
  } else {
    return <ProfileHeader />;
  }
};

export default Profile;
