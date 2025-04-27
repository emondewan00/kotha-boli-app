import {Text, Pressable} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';

type TabButtonProps = BottomTabBarButtonProps & {
  title: string;
  icon: 'chatbox-outline' | 'person-outline';
};

const iconName: Record<
  'chatbox-outline' | 'person-outline',
  'chatbox' | 'person'
> = {
  'chatbox-outline': 'chatbox',
  'person-outline': 'person',
};

const TabButton: React.FC<TabButtonProps> = ({
  icon,
  title,
  accessibilityState,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="justify-center items-center flex-1 ">
      <Icon
        name={accessibilityState?.selected ? iconName[icon] : icon}
        color={accessibilityState?.selected ? '#7B3FD3' : 'gray'}
        size={18}
      />
      <Text
        className={`text-base ${
          accessibilityState?.selected ? 'text-[#7B3FD3]' : 'text-slate-700'
        }`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default TabButton;
