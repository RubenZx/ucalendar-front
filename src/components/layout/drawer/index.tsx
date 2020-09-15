import {
  Box,
  Collapse,
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
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import SettingsIcon from '@material-ui/icons/Settings'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../../assets/logo.gif'
import routes from '../../../routes/routes'
import { styled } from '../../../theme'
import AdminSections from './AdminSections'
import UserSections from './UserSections'

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

const CommonElements = [
  { text: 'Ajustes', icon: <SettingsIcon />, path: '/settings' },
]

const MyDrawer = () => {
  const classes = useStyles()
  const history = useHistory()

  const [loggedUserRole, setLoggedUserRole] = useState<'admin' | 'user'>('user')
  const [open, setOpen] = useState(false)

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
        <ListItem
          button
          onClick={() => {
            setOpen(!open)
          }}
        >
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Horario" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {loggedUserRole === 'admin' ? <AdminSections /> : <UserSections />}
          </List>
        </Collapse>

        {CommonElements.map(({ text, icon, path }) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              history.push(path)
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
