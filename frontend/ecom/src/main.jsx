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
import { Auth0Provider } from '@auth0/auth0-react'


const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement)

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
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
    </Auth0Provider>
  </Provider >
  // </React.StrictMode>,
)
