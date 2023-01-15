import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/index'
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { productsApi } from './features/apiSlice';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
      <App /> 
  </Provider>,
);
