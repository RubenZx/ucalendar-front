import { Box } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import EditIcon from '@material-ui/icons/Edit'
import React from 'react'
import NewItemCard from '../../components/NewItemCard'
import routes from '../../routes/routes'

const AdminTimetable = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-evenly"
      flexGrow={1}
    >
      <NewItemCard
        img=""
        title={
          <Box display="flex" alignItems="center">
            Añadir nuevo item de horario
            <Box m={0.5} />
            <AddCircleOutlineIcon />
          </Box>
        }
        body="Aquí puedes añadir un nuevo item a los ya existentes para cada horario"
        to={routes.newTimetableItem.path}
      />
      <NewItemCard
        img=""
        title={
          <Box display="flex" alignItems="center">
            Modificar un item de horario
            <Box m={0.5} />
            <EditIcon />
          </Box>
        }
        body="Aquí puedes modificar un item de los ya existentes para cada horario"
        to={routes.modifyTimetableItem.path}
      />
    </Box>
  )
}

export default AdminTimetable
