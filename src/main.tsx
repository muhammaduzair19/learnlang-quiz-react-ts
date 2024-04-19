import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './utils/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>


    {/* MUI THEME PROVIDER  */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
