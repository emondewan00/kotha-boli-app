import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import user from '../assets/user.png';

type Props = {
  onPress: () => void;
  conversation: {
    _id: string;
    name: string;
    type: 'group' | 'private';
    image?: string;
    lastMessage?: {};
  };
};

const ConversationCard: React.FC<Props> = ({onPress, conversation}) => {

  return (
    <Pressable onPress={onPress} className="flex flex-row gap-x-2 py-4">
      <Image
        source={user}
        className="h-13 w-13 rounded-full my-auto"
        resizeMode="cover"
      />

      <View className="flex-1 flex flex-col gap-y-2 ">
        <Text className="text-xl font-bold text-slate-700" numberOfLines={1}>
          {conversation.name}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="text-slate-700 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
