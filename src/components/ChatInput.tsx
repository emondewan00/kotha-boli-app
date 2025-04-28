import {View, TextInput, Pressable} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';

const ChatInput = () => {
  return (
    <View className=" p-4 bg-white" >
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
  );
};

export default ChatInput;
