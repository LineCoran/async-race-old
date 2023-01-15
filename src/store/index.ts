import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { productsApi } from '../features/apiSlice';
import carsReducer from './carsSlice';

const store = configureStore({
    reducer: {
        carsReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
        middleware: (getDefaultMiddleware) => 
          getDefaultMiddleware().concat(productsApi.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;