import React from 'react';
import AppNavigator from './AppNavigation';
import AuthNavigator from './AuthNavigator';
import {useAppSelector} from '../hooks/redux';
import {selectIsAuthenticated} from '../features/authSlice';

const RootNavigator = () => {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);

  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
