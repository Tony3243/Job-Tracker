import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  Main from './main.jsx'
import Header from './components/header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Main />
  </StrictMode>
)
