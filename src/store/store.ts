// store.ts
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers/reducers';
import  indexedDB  from 'redux-persist/lib/storage';

// Configuration object for redux-persist
const persistConfig = {
  key: 'root',
  storage: indexedDB,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = createStore(persistedReducer);

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
