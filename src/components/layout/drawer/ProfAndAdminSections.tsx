import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import MessageIcon from '@material-ui/icons/Message'
import React from 'react'
import { useHistory } from 'react-router-dom'
import routes from '../../../routes/routes'

const Elements = [
  {
    text: 'Mensajes',
    icon: <MessageIcon />,
    path: routes.messages.path,
  },
]

const ProfAndAdminSections = () => {
  const history = useHistory()

  return (
    <>
      {Elements.map(({ text, icon, path }, idk) => (
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
    </>
  )
}

export default ProfAndAdminSections
