import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootStackParamList from '../types/rootStackNavigator';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabNavigator from './TabNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <RootStack.Navigator initialRouteName="TabNavigator">
      <RootStack.Screen
        options={{
          headerShown: false,
        }}
        name="TabNavigator"
        component={TabNavigator}
      />
      <RootStack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
      <RootStack.Screen
        options={{
          headerShown: false,
        }}
        name="SignUp"
        component={Register}
      />
    </RootStack.Navigator>
  );
};

export default Navigation;
