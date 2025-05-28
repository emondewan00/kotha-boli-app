import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import Separator from '../components/Separator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TabNavigatorParamList from '../types/tabNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import AppNavigatorParamList from '../types/appNavigator';
import {useLazyFindUsersQuery} from '../api/userApi';
import UserCard from '../components/UserCard';
import ConversationCard from '../components/ConversationCard';
import {useAppSelector} from '../hooks/redux';
import {selectUser} from '../features/authSlice';
import {useGetConversationsQuery} from '../api/conversationApi';
import {socket} from '../utils/socket';
import Toast from 'react-native-toast-message';

type HomeParamList = CompositeScreenProps<
  NativeStackScreenProps<TabNavigatorParamList, 'Home'>,
  NativeStackScreenProps<AppNavigatorParamList>
>;

const Home = ({navigation}: HomeParamList) => {
  const [triggerGetUsers, {data, isLoading: isLoadingUsers}] =
    useLazyFindUsersQuery();
  const user = useAppSelector(selectUser);
  const {data: conversations, isLoading} = useGetConversationsQuery(user._id, {
    refetchOnMountOrArgChange: true,
  });
  const [state, setState] = useState<'conversation' | 'search'>('conversation');

  useEffect(() => {
    socket.on('newConversation', conversationData => {
      Toast.show({
        type: 'success',
        text1: 'New Conversation',
        text2: conversationData.name,
      });
    });

    return () => {
      socket.off('newConversation');
      socket.disconnect();
    };
  }, [user._id]);

  const emptyList = () => {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-slate-700 text-lg">
          {state === 'search' ? 'No User Found' : 'No Conversation Found'}
        </Text>
      </View>
    );
  };

  const navigateToChat = (id: string, name: string) => {
    navigation.navigate('Chat', {
      chatId: id,
      conversationName: name,
    });
  };

  let content = <></>;

  if (isLoading || isLoadingUsers) {
    content = (
      <SafeAreaView className="bg-white flex-1">
        <SearchBar triggerGetUsers={triggerGetUsers} changeState={setState} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#7B3FD3" />
        </View>
      </SafeAreaView>
    );
  } else {
    content = (
      <FlatList
        key={state}
        data={state === 'search' ? data : conversations}
        keyExtractor={item => item._id.toString()}
        contentContainerClassName="gap-y-1 by-20 px-5"
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => {
          return state === 'search' ? (
            <UserCard
              user={item}
              navigate={(id: string, name: string) => navigateToChat(id, name)}
            />
          ) : (
            <ConversationCard
              onPress={(name: string) => navigateToChat(item._id, name)}
              conversation={item}
            />
          );
        }}
        ListEmptyComponent={emptyList}
      />
    );
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <SearchBar triggerGetUsers={triggerGetUsers} changeState={setState} />

      {content}
    </SafeAreaView>
  );
};

export default Home;
