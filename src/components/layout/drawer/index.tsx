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
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.gif'
import { useAuth } from '../../../context/auth'
import { useUser } from '../../../context/user'
import routes from '../../../routes/routes'
import { styled } from '../../../theme'
import AdminSections from './AdminSections'
import ProfAndAdminSections from './ProfAndAdminSections'
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

const MyDrawer = () => {
  const classes = useStyles()
  const { signOut } = useAuth()
  const { user, removeUser } = useUser()

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
            {user?.role === 'ADMINISTRATOR' ? (
              <AdminSections />
            ) : (
              <UserSections />
            )}
          </List>
        </Collapse>

        {user?.role !== 'ALUMN' && <ProfAndAdminSections />}

        <ListItem
          button
          onClick={() => {
            signOut()
            removeUser()
          }}
        >
          <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItem>
      </List>
      <Divider />
    </StyledDrawer>
  )
}

export default MyDrawer
