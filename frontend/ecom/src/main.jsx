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
import { PayPalScriptProvider } from '@paypal/react-paypal-js'


const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_CLIENTID,
          currency: "USD",
          vault: true,
          intent: 'capture'
        }}
      >
        <BrowserRouter>
          <ToastContainer position="top-right" autoClose={2000} />
          <App />
        </BrowserRouter>
      </PayPalScriptProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
)
