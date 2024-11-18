import {configureStore} from '@reduxjs/toolkit';

import {combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';

import storage from '@react-native-async-storage/async-storage';
import UserSlice from '../reduxtolkit/MyAdminSlice';

let persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

let rootReducer = combineReducers({
  user: UserSlice,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);
const Store = configureStore({reducer: persistedReducer});

export default Store;
