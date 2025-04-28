import {View, Text, FlatList, Image, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ionicons';
import userPhoto from '../assets/user.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../types/rootStackNavigator';
import ChatInput from '../components/ChatInput';

type ChatParamList = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const Chat = ({navigation}: ChatParamList) => {
  const user = 'emon@gmail.com';
  const data = [
    {
      id: 1,
      message: 'Hello',
      user: {
        name: 'Emon Hossain',
        email: 'emon@gmail.com',
      },
    },
    {
      id: 2,
      message: 'Hello',
      user: {
        name: 'Emon Hossain',
        email: 'hossain@gmail.com',
      },
    },
    {
      id: 3,
      message: 'Test',
      user: {
        name: 'Emon Hossain',
        email: 'hossain@gmail.com',
      },
    },
  ];

  return (
    <SafeAreaView className="bg-[#7B3FD3] flex-1">
      <View className="flex flex-row gap-x-2 p-4">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            size={24}
            color="white"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginVertical: 'auto',
            }}
          />
        </Pressable>
        <View>
          <Text className="text-white text-xl font-bold">Emon Hossain</Text>
          <Text className="text-white text-sm">emon@gmail.com</Text>
        </View>
        <View
          className="flex flex-row "
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginLeft: 'auto'}}>
          <Icon name="notifications-outline" size={24} color="white" />
          <Icon name="ellipsis-vertical-sharp" size={24} color="white" />
        </View>
      </View>
      <FlatList
        data={data}
        contentContainerClassName="bg-white flex-1 rounded-t-[40px] py-8 px-4"
        renderItem={({item, index}) => {
          const isProfileShow = data[index + 1]?.user.email !== item.user.email;

          return (
            <View
              className={`flex  gap-x-2 ${
                item.user.email === user ? 'flex-row' : 'flex-row-reverse'
              } ${isProfileShow ? '' : 'mt-4'}`}>
              <View className={`grow w-[80%] ${isProfileShow ? '' : 'ml-12'}`}>
                <Text
                  className={`text-white rounded-3xl p-3  ${
                    item.user.email === user ? 'bg-[#7B3FD3]' : 'bg-[#AD87E4]'
                  }`}>
                  {item.message}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam veritatis expedita tempora quis, dolorum quidem at
                  quos molestias ratione, architecto aliquid maiores cumque ut
                  minus incidunt atque? Nulla, assumenda dolores.
                </Text>
                <Text
                  className={`text-xs text-slate-700 ${
                    item.user.email === user
                      ? 'text-right pr-4'
                      : 'text-left pl-4'
                  }`}>
                  10 min
                </Text>
              </View>
              {isProfileShow && (
                <Image
                  source={userPhoto}
                  resizeMode="cover"
                  className="h-12 rounded-full w-12"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{marginTop: 'auto'}}
                />
              )}
            </View>
          );
        }}
      />
      {<ChatInput />}
    </SafeAreaView>
  );
};

export default Chat;
