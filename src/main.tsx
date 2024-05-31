import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './Context/UserContext';
import { WatchlistProvider } from './Context/WatchListContext';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <UserProvider>
        <WatchlistProvider>
        <App />
        </WatchlistProvider>
      </UserProvider>
    </React.StrictMode>
  </BrowserRouter>
)
