import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  // palette: {
  //   primary: {
  //     light: '#8eacbb',
  //     main: '#607d8b',
  //     dark: '#34515e',
  //     contrastText: '#fff',
  //   },
  //   secondary: {
  //     light: '#e7ff8c',
  //     main: '#b2ff59',
  //     dark: '#7ecb20',
  //     contrastText: '#000',
  //   },
  //   mode: 'light',
  // },
  palette: {
    primary: {
      light: '#5c67a3',
      main: '#3f4771',
      dark: '#2e355b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#000',
    },
    mode: 'light',
  },
})

export default theme
