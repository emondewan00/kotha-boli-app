import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import {useAppSelector} from '../hooks/redux';
import {useCreateMessageMutation} from '../api/messageApi';
import {selectUser} from '../features/authSlice';

type Props = {
  conversationId: string;
};

const ChatInput: React.FC<Props> = ({conversationId}) => {
  const user = useAppSelector(selectUser);
  const [message, setMessage] = useState('');
  const [createMessage] = useCreateMessageMutation();

  const handleSendMessage = async () => {
    if (!message.trim()) {
      return null;
    }
    try {
      await createMessage({
        content: message,
        sender: user._id,
        conversationId,
      }).unwrap();

      setMessage('');
    } catch (error) {}
  };

  return (
    <View className="p-4 bg-white">
      <View
        className="shadow-2xl rounded-full flex flex-row bg-white items-center gap-x-4"
        style={styles.inputContainer}>
        <Icon name="happy-outline" size={26} color={'#334155'} />
        <TextInput
          placeholder="Type message here..."
          className="py-4 grow text-slate-700"
          placeholderTextColor="gray"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleSendMessage}
          className="bg-[#5A0FC8] rounded-full p-2.5">
          <Icon name="paper-plane-outline" size={20} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
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
  },
});

export default ChatInput;
