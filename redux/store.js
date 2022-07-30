import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './features/authSlice';
import productReducer from "./features/productSlice";
import productCategoryReducer from "./features/productCategorySlice";

// Persisted reducer configuration
const persistConfig = {
    key: process.env.NEXT_PUBLIC_FINGER_PRINT,
    storage,
    whiteList: [],
    blacklist: []
};

// Would have to combine the reducers
const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    productCategory: productCategoryReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);
const wrapper = createWrapper(() => store);

export {wrapper, persistor};

