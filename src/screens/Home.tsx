import {View, Text, Image, FlatList, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import user from '../assets/user.png';
import SearchBar from '../components/SearchBar';
import Separator from '../components/Separator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TabNavigatorParamList from '../types/tabNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import AppNavigatorParamList from '../types/appNavigator';

type HomeParamList = CompositeScreenProps<
  NativeStackScreenProps<TabNavigatorParamList, 'Home'>,
  NativeStackScreenProps<AppNavigatorParamList>
>;

const Home = ({navigation}: HomeParamList) => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <SearchBar />
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={item => item.toString()}
        contentContainerClassName="gap-y-1 by-20 px-5"
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
        renderItem={({item, index}) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate('Chat', {
                  chatId: item.toString(),
                })
              }
              key={index}
              className="flex flex-row gap-x-2 py-4">
              <Image
                source={user}
                className="h-13 w-13 rounded-full my-auto"
                resizeMode="cover"
              />

              <View className="flex-1 flex flex-col gap-y-2 ">
                <Text
                  className="text-xl font-bold text-slate-700"
                  numberOfLines={1}>
                  John Doe
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  className="text-slate-700 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </View>

              <View className="justify-around items-end">
                <Text className="text-sm text-slate-700">10 min </Text>
                <Text className="px-1 rounded text-sm bg-[#5A0FC8] text-white">
                  2
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
