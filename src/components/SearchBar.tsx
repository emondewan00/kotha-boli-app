import {View, Text, TextInput, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import CreateGroupModal from './CreateGroupModal';

const SearchBar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <View className="bg-[#7B3FD3] h-36 rounded-b-[40px] px-8 py-6 z-10 mb-5">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-white font-bold text-2xl uppercase ml-2">
            Kotha Boli
          </Text>
          <Pressable onPress={() => setShowModal(true)}>
            <FontAwesome name="pencil-square-o" size={20} color="white" />
          </Pressable>
        </View>
        <View className="flex flex-row bg-white rounded-full items-center px-3  gap-x-4 mt-2">
          <Icon name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search"
            className="py-4 grow text-slate-700"
            placeholderTextColor={'gray'}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <CreateGroupModal onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default SearchBar;
