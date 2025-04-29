import {View, Text, Pressable, Image, TextInput, FlatList} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import user from '../assets/user.png';

const image = Icon.getImageSourceSync('image-outline', 20, 'gray');

type CreateGroupModalProps = {
  onClose: () => void;
};

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({onClose}) => {
  const renderItem = ({item}: {item: number}) => {
    return (
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2">
          <Image
            source={user}
            alt="user"
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <Text className="text-slate-700 text-base">user {item} </Text>
        </View>
        <Pressable className="flex flex-row items-center gap-x-1 bg-emerald-400 py-1.5 px-3">
          <Icon name="add" size={16} color={'white'} />
          <Text className="text-white text-sm">Add</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View className="items-center justify-center flex-1 bg-black/30">
      <View className="bg-white p-6 rounded-sm w-[80%]">
        <Pressable onPress={onClose} className="absolute right-4 top-4 z-10">
          <Icon name="close" size={20} color={'gray'} />
        </Pressable>
        <Text className="text-2xl text-[#7B3FD3] text-center">
          Create a group
        </Text>
        <View className="flex flex-row gap-x-3 mt-5">
          <Image
            source={image}
            alt="group photo"
            className="w-10 h-10 "
            resizeMode="cover"
          />
          <TextInput
            placeholder="Name your group"
            className="text-slate-700 text-sm mt-auto border-b border-dashed py-2 border-b-blue-500 grow"
            placeholderTextColor={'#334155'}
          />
        </View>
        <View className="flex flex-row gap-x-2 border-b border-blue-500 bg-blue-50 items-center my-6 pl-2">
          <Icon name="search" size={20} color={'gray'} />
          <TextInput
            placeholder="Search"
            className="grow text-slate-700 py-2"
            placeholderTextColor={'gray'}
          />
        </View>
        <View className="h-72">
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 8]}
            keyExtractor={item => item.toString()}
            // showsVerticalScrollIndicator={false}
            contentContainerClassName="gap-y-3 mr-2"
            scrollEnabled
            renderItem={renderItem}
          />
        </View>
        <Pressable className="bg-[#7B3FD3] py-2 rounded-sm mt-6">
          <Text className="text-white text-center text-base">Create Group</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateGroupModal;
