import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import TabNavigatorParamList from '../types/tabNavigator';
import Profile from '../screens/Profile';
import TabButton from '../components/TabButton';
import React from 'react';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          height: 60,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          elevation: 5,
          width: '65%',
          backgroundColor: '#fff',
          borderRadius: 8,
          marginHorizontal: '17.5%',
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          title: 'Chats',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarButton: props => (
            <TabButton {...props} title="Chats" icon="chatbox-outline" />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarButton: props => (
            <TabButton {...props} icon="person-outline" title="Profile" />
          ), //this is a false error from typescript reference https://github.com/react-navigation/react-navigation/issues/11536#issuecomment-1682119691
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
