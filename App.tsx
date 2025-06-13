import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import './global.css';
import RootNavigator from './src/navigation/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import './src/utils/fireMessage';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};

export default App;
