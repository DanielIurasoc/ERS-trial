import { configureStore } from '@reduxjs/toolkit';

import appDataReducer from './reducers.js';

// reducer setup, to be updated
const rootReducer = {
  appData: appDataReducer,
  // add other reducers here
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), //.concat(ReduxThunk),
  // add other store configuration here
});

export default store;
