import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'reduxjs-toolkit-persist/integration/react';

import persistStore from 'redux-persist/es/persistStore';
import Store from './src/reduxtolkit/Store';
import Roots from './src/navigation/Roots';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';

const persistor = persistStore(Store);

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Roots />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
