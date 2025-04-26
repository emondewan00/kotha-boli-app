import {View, Text, FlatList, Image, TextInput, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ionicons';
import userPhoto from '../assets/user.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from '../types/rootStackNavigator';

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
        contentContainerClassName="bg-white flex-1 rounded-t-[40px] py-8 px-4 gap-y-6"
        renderItem={({item}) => {
          return (
            <View
              className={`flex  gap-x-2 ${
                item.user.email === user ? 'flex-row' : 'flex-row-reverse'
              }`}>
              <View className="grow w-[80%]">
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
              <Image
                source={userPhoto}
                resizeMode="cover"
                className="h-12 rounded-full w-12"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{marginTop: 'auto'}}
              />
            </View>
          );
        }}
      />
      <View className=" p-4 bg-white">
        <View
          className="shadow-2xl rounded-full flex flex-row bg-white items-center gap-x-4"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            paddingLeft: 8,
            paddingRight: 6,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 1,
            shadowRadius: 3.84,
            elevation: 10,
          }}>
          <Icon name="happy-outline" size={26} color={'#334155'} />
          <TextInput
            placeholder="Type message here..."
            className=" py-4 grow text-slate-700"
            placeholderTextColor="gray"
          />
          <Pressable className="bg-[#5A0FC8] rounded-full p-2.5">
            <Icon name="paper-plane-outline" size={20} color={'white'} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
