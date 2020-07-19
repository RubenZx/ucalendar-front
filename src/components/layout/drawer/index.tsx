import {
  Box,
  createStyles,
  Drawer,
  List,
  makeStyles,
  Theme,
} from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import SettingsIcon from '@material-ui/icons/Settings'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Logo from '../../../assets/logo.gif'
import { styled } from '../../../theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: 240,
    },
  }),
)

const StyledDrawer = styled(Drawer)`
  width: 240px;
  flex-shrink: 0;
`

const MenuElements = [
  { text: 'Horario', icon: <CalendarTodayIcon />, route: '/' },
  { text: 'Ajustes', icon: <SettingsIcon />, route: '/settings' },
]

const MyDrawer = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <StyledDrawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80px"
        style={{ marginTop: '10px' }}
      >
        <img width={180} src={Logo} alt="logoUCA" />
      </Box>
      <Divider />
      <List>
        {MenuElements.map(({ text, icon, route }) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              history.push(route)
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </StyledDrawer>
  )
}

export default MyDrawer
