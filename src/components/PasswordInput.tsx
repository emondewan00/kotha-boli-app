import Icon from '@react-native-vector-icons/ionicons';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface PasswordInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  iconColor?: string;
  iconSize?: number;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  placeholder = 'Enter your password',
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  iconColor = '#64748b', // slate-500
  iconSize = 20,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={containerStyle} className="gap-y-2">
      {label && (
        <Text style={labelStyle} className="text-slate-700">
          {label}
        </Text>
      )}
      <View
        className={`flex flex-row items-center gap-x-2 border-2 ${
          error ? 'border-red-500' : 'border-slate-300'
        } rounded-md px-3`}>
        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
          <Icon
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={iconSize}
            color={iconColor}
          />
        </TouchableOpacity>
        <TextInput
          style={inputStyle}
          className="flex-1 py-2.5 text-slate-700"
          placeholder={placeholder}
          placeholderTextColor={iconColor}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
          accessibilityLabel="Password input field"
        />
      </View>
      {error && (
        <Text style={errorStyle} className="text-red-500 text-sm">
          {error}
        </Text>
      )}
    </View>
  );
};

export default PasswordInput;
