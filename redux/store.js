import {combineReducers, configureStore} from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

import authReducer from './features/auth';
import productReducer from "./features/product";

const persistConfig = {
    key: process.env.NEXT_PUBLIC_FINGERPRINT,
    storage,
    whitelist: ['auth', 'product']
};

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devtools: true
});

const persistor = persistStore(store);

export {store, persistor};