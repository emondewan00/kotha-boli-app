import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import loginBg from '../assets/login-bg.png';
import Icon from '@react-native-vector-icons/ionicons';
import PasswordInput from '../components/PasswordInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AuthNavigatorParamList from '../types/authNavigator';
import {useLoginMutation} from '../api/userApi';
import {setItem} from '../utils/storage';
import {useAppDispatch} from '../hooks/redux';
import {loginSuccess} from '../features/authSlice';
import Toast from 'react-native-toast-message';
type LoginProps = NativeStackScreenProps<AuthNavigatorParamList, 'Login'>;

const Login = ({navigation}: LoginProps) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      const {status, token, user} = await login({
        email,
        password,
      }).unwrap();

      if (status === 'success') {
        setItem('token', token as string);
        setItem('user', JSON.stringify(user));
        dispatch(loginSuccess({token: token, user: user}));
        Toast.show({
          type: 'success',
          text1: 'Login successfully.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Server error. Please try again.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error as string,
      });
    }
  };

  return (
    <SafeAreaView className=" flex-1 bg-white">
      <ScrollView>
        <ImageBackground
          source={loginBg}
          resizeMode="cover"
          className="w-full h-96 items-center justify-center">
          <Text className="text-white text-4xl font-bold uppercase ">
            Kotha Boli
          </Text>
          <Text className="text-slate-200 mt-1">
            Chat with your beloved person.
          </Text>
        </ImageBackground>
        <View className="flex items-center justify-center mt-4">
          <View className="w-80">
            <Text className="text-center text-slate-700">Welcome back</Text>
            <Text className="text-xl font-bold text-slate-700 text-center">
              Login your account.
            </Text>

            <View className="gap-y-2">
              <View className="gap-y-2">
                <Text className="text-slate-700">Email</Text>
                <View className="flex flex-row items-center gap-x-2 border rounded border-slate-300 px-2 ">
                  <Icon
                    size={20}
                    name="mail-outline"
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      color: '#64748b',
                    }}
                  />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    className=" rounded-sm py-2.5 text-slate-700 pr-6 grow"
                    placeholder="Enter your email"
                    placeholderTextColor="#64748b"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <PasswordInput
                onChangeText={setPassword}
                value={password}
                placeholder="Enter your password"
                label="Password"
                iconSize={20}
              />

              <Text className="text-slate-700 text-right my-2">
                Forgot Password?
              </Text>

              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-[#7F45D4] py-2.5 px-9 rounded-sm ">
                <Text className="text-white text-center">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text className="text-slate-700 text-center mt-3">
          New User?
          <Text
            onPress={() => navigation.navigate('SignUp')}
            className="text-[#5A0FC8]">
            {' '}
            Register.
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
