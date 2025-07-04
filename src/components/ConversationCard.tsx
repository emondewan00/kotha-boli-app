import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import user from '../assets/user.png';
import {selectUser} from '../features/authSlice';
import {useAppSelector} from '../hooks/redux';
import relativeTime from '../utils/relativeTime';
import {
  Conversation,
  useDeleteConversationMutation,
} from '../api/conversationApi';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from '@react-native-vector-icons/ionicons';

type Props = {
  onPress: (name: string) => void;
  conversation: Conversation;
};

const ConversationCard: React.FC<Props> = ({onPress, conversation}) => {
  const {name, lastMessage, members, isOnline, updatedAt, _id} = conversation;
  const [deleteHandler] = useDeleteConversationMutation();

  const loggedInUser = useAppSelector(selectUser);
  const whoIsSender = members.find(
    member => member._id === lastMessage?.sender._id,
  );

  let nameOfSender = '';

  if (whoIsSender?._id === loggedInUser._id) {
    nameOfSender = 'You';
  } else {
    nameOfSender = whoIsSender?.name || '';
  }

  return (
    <Swipeable
      rightThreshold={100}
      containerStyle={styles.swipeAbleContainer}
      renderRightActions={() => (
        <TouchableOpacity
          onPress={() => deleteHandler(_id)}
          className="items-center justify-center w-20">
          <Icon name="trash" color="white" size={30} />
        </TouchableOpacity>
      )}>
      <Pressable
        onPress={() => onPress(name)}
        className="flex flex-row gap-x-2 py-4 bg-white rounded-lg ">
        <Image
          source={user}
          className={`h-14 w-14 rounded-full my-auto ${
            isOnline.includes('online') ? 'border-2 border-green-500' : ''
          }`}
          resizeMode="cover"
        />

        <View className="flex-1 flex flex-col gap-y-2 ">
          <Text className="text-xl font-bold text-slate-700" numberOfLines={1}>
            {name}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="text-slate-700 text-sm">
            {nameOfSender} {nameOfSender && ': '}
            {lastMessage?.content || 'No message'}
          </Text>
        </View>

        <View className="justify-around items-end">
          <Text className="text-sm text-slate-700">
            {relativeTime(updatedAt)}
          </Text>

          {conversation.unreadMessageCount ? (
            <Text className="px-1 rounded text-sm bg-[#5A0FC8] text-white">
              {conversation.unreadMessageCount || 0}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Swipeable>
  );
};

export default ConversationCard;

const styles = StyleSheet.create({
  swipeAbleContainer: {
    backgroundColor: '#F33055',
    borderRadius: 8,
  },
});
