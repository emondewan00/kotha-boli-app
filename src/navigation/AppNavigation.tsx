import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import RootStackParamList from '../types/rootStackNavigator';
import Login from '../screens/Login';
import Register from '../screens/Register';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
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
