import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import userImage from '../assets/user.png';
import {useCreateConversationMutation} from '../api/conversationApi';
import {useAppSelector} from '../hooks/redux';
import {selectUser} from '../features/authSlice';

type Props = {
  user: {
    _id: string;
    avatar: string;
    name: string;
    email: string;
  };
  navigate: (id: string) => void;
};

const UserCard: React.FC<Props> = ({user, navigate}) => {
  const [createConversation] = useCreateConversationMutation();
  const loggedInUser = useAppSelector(selectUser);

  const handleCreateConversation = async () => {
    try {
      const data = await createConversation({
        members: [loggedInUser._id, user._id],
        type: 'private',
      }).unwrap();
      if (data) {
        navigate(data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleCreateConversation}
      className="flex flex-row gap-x-2 py-4">
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
    </TouchableOpacity>
  );
};

export default UserCard;
