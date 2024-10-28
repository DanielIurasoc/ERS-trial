import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appDataReducer from './reducers.js';

// reducer setup, to be updated
const rootReducer = combineReducers({
  appData: appDataReducer,
  // add other reducers here
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['allEmployeesList', 'clockedEmployeesList'], // list of reducers that need to be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), //.concat(ReduxThunk),
  // add other store configuration here
});

const persistor = persistStore(store);

export { store, persistor };
