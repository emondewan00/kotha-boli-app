import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import RootStackParamList from '../types/rootStackNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={Home} />
    </RootStack.Navigator>
  );
};

export default Navigation;
