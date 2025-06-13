import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Chat from '../screens/Chat';
import AppNavigatorParamList from '../types/appNavigator';
import {selectUser} from '../features/authSlice';
import {useAppSelector} from '../hooks/redux';
import {useEffect} from 'react';
import {socket} from '../utils/socket';
import useFcmToken from '../hooks/useFcmToken';

const AppStack = createNativeStackNavigator<AppNavigatorParamList>();

const AppNavigator = () => {
  const user = useAppSelector(selectUser);
  useFcmToken(user._id);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.emit('user-connected', user._id);

    return () => {
      socket.disconnect();
    };
  }, [user._id]);

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="TabNavigator"
        component={TabNavigator}
      />
      <AppStack.Screen
        options={{
          headerShown: false,
        }}
        name="Chat"
        component={Chat}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
