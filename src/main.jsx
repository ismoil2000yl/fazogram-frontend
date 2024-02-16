import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './assets/style/index.scss'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from "redux-persist/es/persistStore";
import store from './store/store'

const persistedStore = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
