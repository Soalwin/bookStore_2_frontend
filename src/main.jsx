import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ContextShare from './context/ContextShare.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='925829110740-6uo3vun0b6g0tgeusirgseik3i0767qb.apps.googleusercontent.com'>
        <ContextShare>
          <App />
        </ContextShare>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
