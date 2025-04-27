import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {NavigationItem} from '../screens/Profile';
import Icon from '@react-native-vector-icons/ant-design';

type NavigationItemProps = NavigationItem & {
  onPress?: () => void;
};

const NavigationComponent: React.FC<NavigationItemProps> = ({
  icon,
  title,
}) => {
  return (
    <Pressable className="flex-row justify-between items-center py-5">
      <View className="flex-row items-center gap-x-3">
        <Icon
          name={icon}
          color={`${icon === 'logout' ? '#ef4444' : '#7B3FD3'}`}
          size={20}
        />
        <Text
          className={`text-lg ${
            icon === 'logout' ? 'text-red-500' : 'text-slate-700'
          }`}>
          {title}
        </Text>
      </View>
      <Icon
        name="arrow-right"
        color={`${icon === 'logout' ? '#ef4444' : '#d1d5db'}`}
        size={20}
      />
    </Pressable>
  );
};

export default NavigationComponent;
