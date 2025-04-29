import React from 'react';
import AuthNavigatorParamList from '../types/authNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="SignUp"
        component={Register}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
