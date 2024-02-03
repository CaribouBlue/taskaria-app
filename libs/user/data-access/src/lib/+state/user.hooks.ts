import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser, selectUserLoadingStatus } from './user.slice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

export const useUser = () => {
  const dispatch = useDispatch<ThunkDispatch<unknown, unknown, AnyAction>>();
  const userLoadingStatus = useSelector(selectUserLoadingStatus);

  useEffect(() => {
    if (userLoadingStatus === 'not loaded') {
      dispatch(fetchUser());
    }
  }, [dispatch, userLoadingStatus]);

  return useSelector(selectUser);
};
