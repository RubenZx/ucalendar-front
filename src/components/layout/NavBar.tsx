import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core'
import DateRangeIcon from '@material-ui/icons/DateRange'
import React from 'react'
import styled from 'styled-components'

const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
`

const StyledToolbar = styled(Toolbar)`
  flex-grow: 1;
`
const NavBar = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <DateRangeIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">uCalendar</Typography>
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default NavBar
