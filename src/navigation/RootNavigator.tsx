import React from 'react';
import AppNavigator from './AppNavigation';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
  const isLoggedIn = false;
  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
