import {
  CssBaseline,
  MuiThemeProvider,
  NoSsr,
  StylesProvider,
} from '@material-ui/core'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import Router from './routes'
import theme from './theme'

const App = () => {
  return (
    <>
      <CssBaseline />
      <NoSsr>
        <StylesProvider injectFirst>
          {/* To override the current theme */}
          <MuiThemeProvider theme={theme}>
            {/* Allow share the theme with styled components */}
            <ThemeProvider theme={theme}>
              <Router />
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </NoSsr>
    </>
  )
}

export default App
