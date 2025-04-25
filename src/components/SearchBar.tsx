import {View, Text, TextInput} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';

const SearchBar = () => {
  return (
    <View className="bg-[#7B3FD3] h-36 rounded-b-[40px] px-8 py-6 z-10 mb-5">
      <Text className="text-white font-bold text-2xl uppercase ml-2">
        Kotha Boli
      </Text>
      <View className="flex flex-row bg-white rounded-full items-center px-3  gap-x-4 mt-2">
        <Icon name="search" size={20} color="gray" />
        <TextInput placeholder="Search" className="py-4 grow " />
      </View>
    </View>
  );
};

export default SearchBar;
