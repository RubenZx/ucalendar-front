import { createMuiTheme, Theme } from '@material-ui/core'
import baseStyled, { ThemedStyledInterface } from 'styled-components'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#455a64',
    },
    secondary: {
      main: '#495963',
    },
  },
})

export const styled = baseStyled as ThemedStyledInterface<Theme>
export default theme
