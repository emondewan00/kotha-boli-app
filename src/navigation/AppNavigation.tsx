import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Chat from '../screens/Chat';
import AppNavigatorParamList from '../types/appNavigator';

const AppStack = createNativeStackNavigator<AppNavigatorParamList>();

const AppNavigator = () => {
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
