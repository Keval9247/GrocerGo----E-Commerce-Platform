import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import storage from 'redux-persist/lib/storage';
import authReducer from './slice/AuthSlice';
import productsReducer from './slice/ProductSlice';

const persistConfig = {
    key: 'root',
    // storage: storageSession, // for saving data into session storage.
    storage: storage, // for localstorage.
};

const rootReducer = combineReducers({
    authReducer,
    productsReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        });
    }
});

export const persistor = persistStore(store);
