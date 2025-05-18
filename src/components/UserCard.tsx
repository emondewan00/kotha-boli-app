import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import userImage from '../assets/user.png';

type Props = {
  user: {
    _id: string;
    avatar: string;
    name: string;
    email: string;
  };
  onPress: () => void;
};

const UserCard: React.FC<Props> = ({user, onPress}) => {
  return (
    <Pressable onPress={onPress} className="flex flex-row gap-x-2 py-4">
      <Image
        source={userImage}
        className="h-13 w-13 rounded-full my-auto"
        resizeMode="cover"
      />

      <View className="flex-1 flex flex-col gap-y-2 ">
        <Text className="text-xl font-bold text-slate-700" numberOfLines={1}>
          {user.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-slate-700 text-sm">
          {user.email}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserCard;
