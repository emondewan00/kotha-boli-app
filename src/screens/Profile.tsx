import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import profile from '../assets/user.png';
import Icon from '@react-native-vector-icons/ant-design';
import Separator from '../components/Separator';

const data: Array<{
  id: number;
  icon: 'edit' | 'setting' | 'question-circle' | 'logout' | 'lock' | 'mail';
  title: string;
}> = [
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
  },
];

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-[#7B3FD3] items-center justify-center h-96">
        <View>
          <View>
            <Image
              source={profile}
              alt="user photo"
              resizeMode="cover"
              className="h-28 w-28 rounded-full border-2 border-white"
            />
            <View className="bg-white rounded-full absolute p-2 bottom-0 right-0">
              <Icon name="edit" color={'#7B3FD3'} size={20} />
            </View>
          </View>
          <Text className="text-white text-3xl font-bold mt-2">John Doe</Text>
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
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View className="flex-row justify-between items-center py-5">
              <View className="flex-row items-center gap-x-3">
                <Icon
                  name={item.icon}
                  color={`${item.icon === 'logout' ? '#ef4444' : '#7B3FD3'}`}
                  size={20}
                />
                <Text
                  className={`text-lg ${
                    item.icon === 'logout' ? 'text-red-500' : 'text-slate-700'
                  }`}>
                  {item.title}
                </Text>
              </View>
              <Icon
                name="arrow-right"
                color={`${item.icon === 'logout' ? '#ef4444' : '#d1d5db'}`}
                size={20}
              />
            </View>
          )}
          // eslint-disable-next-line react/no-unstable-nested-components
          ItemSeparatorComponent={() => <Separator color="#f3f4f6" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
