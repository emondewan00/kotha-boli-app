import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ionicons';
import userPhoto from '../assets/user.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ChatInput from '../components/ChatInput';
import {socket} from '../utils/socket';
import AppNavigatorParamList from '../types/appNavigator';
import {selectUser} from '../features/authSlice';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {useGetMessagesQuery, messageApi} from '../api/messageApi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

type ChatParamList = NativeStackScreenProps<AppNavigatorParamList, 'Chat'>;

const Chat = ({navigation, route}: ChatParamList) => {
  const {conversationName, chatId} = route.params;
  const [page, setPage] = useState(1);
  const {data: messages, isLoading} = useGetMessagesQuery(chatId, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.emit('joinRoom', chatId);
    return () => {
      socket.emit('leaveRoom', chatId);
    };
  }, [chatId]);

  useEffect(() => {
    if (page > 1) {
      dispatch(messageApi.endpoints.loadMoreMessages.initiate({chatId, page}));
    }
  }, [page, dispatch, chatId]);

  const loggedInUser = useAppSelector(selectUser);

  const loadMore = () => {
    if (isLoading) {
      return;
    }
    setPage(prev => prev + 1);
  };

  const loader = () => {
    if (!messages?.hasMore) {
      return null;
    }
    return (
      <View className="flex flex-row items-center justify-center">
        <ActivityIndicator size="large" color="#7B3FD3" />
      </View>
    );
  };

  const formatMessageTime = (timestamp: string) => {
    const now = dayjs();
    const sentTime = dayjs(timestamp);

    if (now.diff(sentTime, 'minute') < 1) {
      return 'Just now';
    }
    if (now.isSame(sentTime, 'day')) {
      return sentTime.format('h:mm A');
    }
    if (now.subtract(1, 'day').isSame(sentTime, 'day')) {
      return `Yesterday at ${sentTime.format('h:mm A')}`;
    }

    return sentTime.format('MM/DD/YY [at] h:mm A');
  };

  return (
    <SafeAreaView className="bg-[#7B3FD3] flex-1">
      <View className="flex flex-row gap-x-2 p-4">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            size={24}
            color="white"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginVertical: 'auto',
            }}
          />
        </Pressable>
        <View>
          <Text className="text-white text-xl font-bold">
            {conversationName}
          </Text>
          <Text className="text-white text-sm">{}</Text>
        </View>
        <View
          className="flex flex-row "
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginLeft: 'auto'}}>
          <Icon name="notifications-outline" size={24} color="white" />
          <Icon name="ellipsis-vertical-sharp" size={24} color="white" />
        </View>
      </View>

      <View className="rounded-t-[40px] flex-1 overflow-hidden bg-white px-4 border-b border-b-gray-200">
        <FlatList
          data={messages?.data || []}
          inverted
          showsVerticalScrollIndicator={false}
          scrollEnabled
          keyboardShouldPersistTaps="always"
          keyExtractor={item => item._id}
          ListFooterComponent={loader}
          contentContainerClassName="pb-4"
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          renderItem={({item, index}) => {
            const isMe = item.sender._id === loggedInUser._id;
            const nextMessageSender = messages?.data?.[index - 1]?.sender?._id;
            const isProfileShow = item.sender._id !== nextMessageSender;

            return (
              <View
                className={`flex flex-row items-end mb-4 ${
                  isMe ? 'justify-end' : 'justify-start'
                } `}>
                {!isMe && isProfileShow && (
                  <Image
                    source={userPhoto}
                    resizeMode="cover"
                    className="h-10 w-10 rounded-full mr-2"
                  />
                )}

                <View
                  className={`max-w-[80%] ${
                    isMe ? 'items-end' : 'items-start'
                  } ${!isMe && !isProfileShow && 'ml-12'}`}>
                  <Text
                    className={`text-white rounded-3xl px-4 py-2 ${
                      isMe ? 'bg-[#7B3FD3]' : 'bg-[#AD87E4]'
                    }`}>
                    {item.content}
                  </Text>
                  <Text
                    className={`text-xs text-slate-500 mt-1 ${
                      isMe ? 'text-right pr-2' : 'text-left pl-2'
                    }`}>
                    {formatMessageTime(item.createdAt)}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>

      <ChatInput conversationId={chatId} />
    </SafeAreaView>
  );
};

export default Chat;
