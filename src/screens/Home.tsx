import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {socket} from '../utils/socket';

const Home = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <View>
      <Text>Welcome to home page</Text>
    </View>
  );
};

export default Home;
