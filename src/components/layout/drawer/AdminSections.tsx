import { ListItemIcon, ListItemText } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import routes from '../../../routes/routes'
import { StyledListItem } from './UserSections'

const MenuElements = [
  {
    text: 'Crear nuevo item',
    icon: <LibraryAddIcon />,
    path: routes.newTimetableItem.path,
  },
  {
    text: 'Editar un item',
    icon: <EditIcon />,
    path: routes.modifyTimetableItem.path,
  },
]

const AdminSections = () => {
  const history = useHistory()

  return (
    <>
      {MenuElements.map(({ text, icon, path }) => (
        <StyledListItem
          button
          key={text}
          onClick={() => {
            history.push(path)
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </StyledListItem>
      ))}
    </>
  )
}

export default AdminSections
