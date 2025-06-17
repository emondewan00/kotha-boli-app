import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import './global.css';
import RootNavigator from './src/navigation/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import './src/utils/fireMessage';
import {createChannelOnce, onMessageReceived} from './src/utils/notifee';
import {getMessaging, onMessage} from '@react-native-firebase/messaging';
import Bootsplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    createChannelOnce();
    const messaging = getMessaging();
    const unsubscribe = onMessage(messaging, onMessageReceived);

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer onReady={() => Bootsplash.hide({fade: true})}>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};

export default App;
