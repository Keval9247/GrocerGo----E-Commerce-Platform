import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={2000} />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
)
