import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import categoriesReducer from './categories.reducer';
import dataReducer from './data.reducer';

const persistConfig = {
  storage: AsyncStorage,
  key: "root",
};
const persistConfig2 = {
  storage: AsyncStorage,
  key: "root2",
};

const persistedReducer = persistReducer(persistConfig, categoriesReducer);
const persistedDataReducer = persistReducer(persistConfig2, dataReducer);

export const store = configureStore({
  reducer: {
    categories: persistedReducer,
    data: persistedDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
