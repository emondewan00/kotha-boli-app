import {View, Text, TextInput, Pressable, Modal} from 'react-native';
import React, {useState} from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import CreateGroupModal from './CreateGroupModal';

type Props = {
  triggerGetUsers: (text: string) => void;
  changeState: (state: 'conversation' | 'search') => void;
};

const SearchBar: React.FC<Props> = ({triggerGetUsers, changeState}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  let timer: NodeJS.Timeout;

  const handleSearch = (text: string) => {
    if (text.length === 0) {
      changeState('conversation');
    } else {
      changeState('search');
    }

    timer && clearTimeout(timer);

    timer = setTimeout(() => {
      const encodedText = encodeURIComponent(text);
      if (encodedText.length === 0) {return;}
      triggerGetUsers(encodedText);
    }, 1000);
  };

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
            onChangeText={handleSearch}
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
