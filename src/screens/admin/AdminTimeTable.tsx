import { Box } from '@material-ui/core'
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
        title="Añadir nuevo item de horario"
        body="Aquí puedes añadir un nuevo item a los ya existentes para cada horario"
        to={routes.newTimeTableItem.path}
      />
      <NewItemCard
        img=""
        title="Modificar un item de horario"
        body="Aquí puedes modificar un item de los ya existentes para cada horario"
        to={routes.modifyTimeTableItem.path}
      />
    </Box>
  )
}

export default AdminTimetable
