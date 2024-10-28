import './gesture-handler.js';
import './gesture-handler.native.js';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store/store.js';

import App from './App.js';

const MyApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text> app loading..</Text>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
