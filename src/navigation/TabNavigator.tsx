import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import TabNavigatorParamList from '../types/tabNavigator';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
