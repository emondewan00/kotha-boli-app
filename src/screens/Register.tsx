import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import loginBg from '../assets/login-bg.png';
import PasswordInput from '../components/PasswordInput';
import RootStackParamList from '../types/rootStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const Register = ({navigation}: RegisterProps) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ImageBackground
        source={loginBg}
        resizeMode="cover"
        className="w-full h-80 items-center justify-center">
        <Text className="text-white text-4xl font-bold uppercase">Join Us</Text>
        <Text className="text-slate-200 mt-1">
          Create your account to get started.
        </Text>
      </ImageBackground>
      <View className=" items-center justify-center mt-4">
        <View className="w-80">
          <Text className="text-center text-slate-700">Create an account</Text>
          <Text className="text-xl font-bold text-slate-700 text-center">
            Sign up now.
          </Text>
          <View className="gap-y-2">
            <View className=" gap-y-2">
              <Text className="text-slate-700">Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                className=" py-2.5 text-slate-700  border rounded border-slate-300 px-2 grow"
                placeholder="Enter your name"
              />
            </View>

            <View className=" gap-y-2">
              <Text className="text-slate-700">Email</Text>
              <View className="flex flex-row items-center gap-x-2 border rounded border-slate-300 px-2">
                <Text className="text-slate-700 text-xl">@</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  className="rounded-sm py-2.5 text-slate-700 pr-6 grow"
                  placeholder="Enter your email"
                />
              </View>
            </View>
            <PasswordInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
            />
            <View className="my-2">
              <Text className="text-right text-slate-700">
                Already have an account?{' '}
                <Text
                  onPress={() => navigation.navigate('Login')}
                  className=" text-[#5A0FC8]">
                  Login.
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#7F45D4] py-2.5 px-9 rounded-sm">
              <Text className="text-white text-center">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
