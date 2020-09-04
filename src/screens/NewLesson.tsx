import { Box } from '@material-ui/core'
import React from 'react'
import AddSubject from '../components/forms/add-subject-to-timetable/AddSubject'
import Title from '../components/Title'
import routes from '../routes/routes'

const NewLesson = () => {
  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Title
        title="Añadir nueva asignatura"
        subtitle="Aquí puedes añadir una asignatura a tu horario semanal"
        withButton={true}
        buttonType="back"
        to={routes.baseUrl.path}
      />
      <AddSubject />
    </Box>
  )
}

export default NewLesson
