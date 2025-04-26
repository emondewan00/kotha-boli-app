import {NavigatorScreenParams} from '@react-navigation/native';
import RootStackParamList from './rootStackNavigator';

type TabNavigatorParamList = {
  Home: NavigatorScreenParams<RootStackParamList>;
  Profile: undefined;
};

export default TabNavigatorParamList;
