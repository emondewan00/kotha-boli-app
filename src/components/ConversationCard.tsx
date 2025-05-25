import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import user from '../assets/user.png';
import {selectUser} from '../features/authSlice';
import {useAppSelector} from '../hooks/redux';

type Props = {
  onPress: (name: string) => void;
  conversation: {
    _id: string;
    name: string;
    type: 'group' | 'private';
    image?: string;
    lastMessage?: {
      _id: string;
      content: string;
      createdAt: string;
      sender: {
        _id: string;
        name: string;
      };
    };
    members: {_id: string; name: string}[];
    isOnline: string;
    updatedAt: string;
  };
};

const ConversationCard: React.FC<Props> = ({onPress, conversation}) => {
  const {name, lastMessage, members, isOnline} = conversation;

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
    <Pressable
      onPress={() => onPress(name)}
      className="flex flex-row gap-x-2 py-4">
      <Image
        source={user}
        className={`h-13 w-13 rounded-full my-auto ${
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
          {nameOfSender}: {lastMessage?.content || 'No message'}
        </Text>
      </View>

      <View className="justify-around items-end">
        <Text className="text-sm text-slate-700">10 min </Text>
        <Text className="px-1 rounded text-sm bg-[#5A0FC8] text-white">2</Text>
      </View>
    </Pressable>
  );
};

export default ConversationCard;
