import {
  CssBaseline,
  MuiThemeProvider,
  NoSsr,
  StylesProvider,
} from '@material-ui/core'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Layout from './components/layout'
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
              <BrowserRouter>
                <Layout>
                  <Router />
                </Layout>
              </BrowserRouter>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </NoSsr>
    </>
  )
}

export default App
