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
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../../assets/logo.gif'
import routes from '../../../routes/routes'
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
  { text: 'Horario', icon: <CalendarTodayIcon />, route: '/timetable' },
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
        <Link to={routes.baseUrl.path}>
          <img src={Logo} width="180pt" alt="logoUCA" />
        </Link>
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
