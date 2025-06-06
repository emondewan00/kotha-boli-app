import {View, Text, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import profile from '../assets/user.png';
import Icon from '@react-native-vector-icons/ant-design';
import NavigationComponent from '../components/NavigationComponent';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {logout, selectUser} from '../features/authSlice';

export type NavigationItem = {
  id: number;
  icon: 'edit' | 'setting' | 'question-circle' | 'logout' | 'lock' | 'mail';
  title: string;
  onPress?: () => void;
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const data: Array<NavigationItem> = [
    {
      id: 1,
      icon: 'edit',
      title: 'Edit Profile',
    },
    {
      id: 2,
      icon: 'lock',
      title: 'Change Password',
    },
    {
      id: 3,
      icon: 'mail',
      title: 'Change Email Address',
    },
    {
      id: 4,
      icon: 'setting',
      title: 'Settings',
    },
    {
      id: 5,
      icon: 'question-circle',
      title: 'Help & Support',
    },
    {
      id: 6,
      icon: 'logout',
      title: 'Logout',
      onPress: () => dispatch(logout()),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-[#7B3FD3] items-center justify-center h-96">
        <View className="items-center">
          <View className="relative ">
            <Image
              source={profile}
              alt="user photo"
              resizeMode="cover"
              className="h-28 w-28 rounded-full border-2 border-white relative"
            />
            <View className="bg-white rounded-full absolute p-2 bottom-0 right-0">
              <Icon name="edit" color={'#7B3FD3'} size={20} />
            </View>
          </View>
          <Text className="text-white text-3xl font-bold mt-2 text-center">
            {user.name}
          </Text>
        </View>
      </View>

      <View
        className="rounded-lg mx-8 px-5 bg-white relative -top-20"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
        }}>
        {data.map(item => (
          <NavigationComponent {...item} key={item.id} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
