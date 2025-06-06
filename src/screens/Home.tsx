import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import Separator from '../components/Separator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TabNavigatorParamList from '../types/tabNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import AppNavigatorParamList from '../types/appNavigator';
import {
  useLazyFindUsersQuery,
  useLazyLoadMoreUsersByQueryQuery,
} from '../api/userApi';
import UserCard from '../components/UserCard';
import ConversationCard from '../components/ConversationCard';
import {useAppSelector} from '../hooks/redux';
import {selectUser} from '../features/authSlice';
import {
  useGetConversationsQuery,
  useLazyLoadMoreConversationsQuery,
} from '../api/conversationApi';
import {socket} from '../utils/socket';
import Toast from 'react-native-toast-message';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

type HomeParamList = CompositeScreenProps<
  NativeStackScreenProps<TabNavigatorParamList, 'Home'>,
  NativeStackScreenProps<AppNavigatorParamList>
>;

const Home = ({navigation}: HomeParamList) => {
  const [triggerGetUsers, {data, isLoading: isLoadingUsers}] =
    useLazyFindUsersQuery();
  const user = useAppSelector(selectUser);
  const {
    data: conversations,
    isLoading,
    refetch,
  } = useGetConversationsQuery(user._id, {
    refetchOnMountOrArgChange: true,
  });
  const [search, setSearch] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [conversationPage, setConversationPage] = useState(1);
  const [loadMoreConversations, {isLoading: isLoadingConversations}] =
    useLazyLoadMoreConversationsQuery();
  const [loadMoreUsers, {isLoading: isLoadingMoreUsers}] =
    useLazyLoadMoreUsersByQueryQuery();
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
    };
  }, [user._id]);

  const emptyList = () => {
    const isSearch = state === 'search';
    const hasMore = isSearch ? data?.hasMore : conversations?.hasMore;

    if (hasMore === undefined) {
      return (
        <View className="flex-1 items-center justify-center py-4">
          <ActivityIndicator size="large" color="#7B3FD3" />
        </View>
      );
    }

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

  const handleLoadMore = () => {
    if (
      isLoadingConversations ||
      isLoadingUsers ||
      isLoadingMoreUsers ||
      isLoading
    ) {
      return;
    }

    const isSearch = state === 'search';
    const hasMore = isSearch ? data?.hasMore : conversations?.hasMore;

    if (!hasMore) {
      return null;
    }
    if (state === 'search') {
      if (search.length === 0 || userPage <= 0) {
        return;
      }

      const nextUserPage = userPage + 1;
      loadMoreUsers({query: search, page: nextUserPage});
      setUserPage(nextUserPage);
      return;
    }

    if (conversationPage === 0) {
      return;
    }

    const nextConversationPage = conversationPage + 1;
    loadMoreConversations({page: nextConversationPage, userId: user._id});
    setConversationPage(nextConversationPage);
  };

  const triggerQueryUsers = (text: string) => {
    triggerGetUsers(text);
    setSearch(text);
  };

  const loader = () => {
    const isSearch = state === 'search';
    const hasMore = isSearch ? data?.hasMore : conversations?.hasMore;

    if (!hasMore) {
      return null;
    }

    return (
      <View className="flex-1 items-center justify-center py-4">
        <ActivityIndicator size="large" color="#7B3FD3" />
      </View>
    );
  };

  const fmc = async () => {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    console.log('result', result);
  };

  useEffect(() => {
    fmc();
    console.log('token', messaging().getToken());
  }, []);
  return (
    <SafeAreaView className="bg-white flex-1">
      <SearchBar triggerGetUsers={triggerQueryUsers} changeState={setState} />

      {state === 'search' ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoadingUsers}
              onRefresh={() => triggerGetUsers(search)}
            />
          }
          data={data?.data}
          keyExtractor={item => item._id.toString()}
          contentContainerClassName="gap-y-1 pb-20 px-5"
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Separator}
          ListFooterComponent={loader}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          renderItem={({item}) => {
            return (
              <UserCard
                user={item}
                navigate={(id: string, name: string) =>
                  navigateToChat(id, name)
                }
              />
            );
          }}
          ListEmptyComponent={emptyList}
        />
      ) : (
        <FlatList
          data={conversations?.data}
          keyExtractor={item => item._id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingConversations}
              onRefresh={() => refetch()}
            />
          }
          contentContainerClassName="gap-y-1 pb-20 px-5"
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Separator}
          ListFooterComponent={loader}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          renderItem={({item}) => {
            return (
              <ConversationCard
                onPress={(name: string) => navigateToChat(item._id, name)}
                conversation={item}
              />
            );
          }}
          ListEmptyComponent={emptyList}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
