import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { ApplicationContainer } from './core/AppContainer/AppContainer.tsx'
import { AuthProvider } from './core/Auth/AuthProvider.tsx'
import AppRouter from './AppRouter.tsx'
import { store } from './store'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ApplicationContainer>
          <AppRouter />
        </ApplicationContainer>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)
