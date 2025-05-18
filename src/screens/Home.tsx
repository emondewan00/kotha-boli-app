import {View, Text, Image, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import user from '../assets/user.png';
import SearchBar from '../components/SearchBar';
import Separator from '../components/Separator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TabNavigatorParamList from '../types/tabNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import AppNavigatorParamList from '../types/appNavigator';
import {useLazyFindUserQuery} from '../api/userApi';
import UserCard from '../components/UserCard';
import ConversationCard from '../components/conversationCard';

type HomeParamList = CompositeScreenProps<
  NativeStackScreenProps<TabNavigatorParamList, 'Home'>,
  NativeStackScreenProps<AppNavigatorParamList>
>;

const Home = ({navigation}: HomeParamList) => {
  const [triggerGetUsers, {data, isLoading, isError}] = useLazyFindUserQuery();
  const [state, setState] = useState<'conversation' | 'search'>('conversation');

  const emptyList = () => {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-slate-700 text-lg">
          {state === 'search' ? 'No User Found' : 'No Conversation Found'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <SearchBar triggerGetUsers={triggerGetUsers} changeState={setState} />
      <FlatList
        data={state === 'search' ? data : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={item => item._id.toString()}
        contentContainerClassName="gap-y-1 by-20 px-5"
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => {
          return state === 'search' ? (
            <UserCard
              user={item}
              onPress={() => navigation.navigate('Chat', {chatId: item._id})}
            />
          ) : (
            <ConversationCard
              onPress={() => navigation.navigate('Chat', {chatId: item._id})}
            />
          );
        }}
        ListEmptyComponent={emptyList}
      />
    </SafeAreaView>
  );
};

export default Home;
