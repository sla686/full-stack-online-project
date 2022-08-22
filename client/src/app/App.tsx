import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

import '../styles/App.css'
import theme from '../styles/theme'
import MainRouter from '../components/MainRouter'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
