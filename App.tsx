import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import './global.css';
import RootNavigator from './src/navigation/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
