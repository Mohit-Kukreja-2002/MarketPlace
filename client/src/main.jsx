import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductContextProvider } from './context/SellerProductContext.jsx'
import { ChatContextProvider } from './context/ChatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <ProductContextProvider>
            <ChatContextProvider>
              <Toaster />
              <App />
            </ChatContextProvider>
          </ProductContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
