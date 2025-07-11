import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers/index';

// Cấu hình redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Tạo persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với configureStore
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Bỏ qua action của redux-persist để tránh lỗi serializable
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Tạo persistor
const persistor = persistStore(store);

export { store, persistor };