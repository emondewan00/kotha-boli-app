import React from 'react';
import AppNavigator from './AppNavigation';
import AuthNavigator from './AuthNavigator';
import {useAppSelector} from '../hooks/redux';
import {selectIsAuthenticated, selectUser} from '../features/authSlice';
import useFcmToken from '../hooks/useFcmToken';

const RootNavigator = () => {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  useFcmToken(user._id);

  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
