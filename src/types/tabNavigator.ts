import {NavigatorScreenParams} from '@react-navigation/native';
import AppNavigatorParamList from './appNavigator';

type TabNavigatorParamList = {
  Home: NavigatorScreenParams<AppNavigatorParamList>;
  Profile: undefined;
};

export default TabNavigatorParamList;
