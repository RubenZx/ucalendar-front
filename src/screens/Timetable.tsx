import { Box } from '@material-ui/core'
import React from 'react'
import subjects from '../assets/subjects.json'
import Table from '../components/Table'
import Title from '../components/Title'
import routes from '../routes/routes'

const Timetable = () => {
  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Title
        title="Horario - Rubén Montero Domínguez"
        subtitle="Aquí puedes crear y planificar tu horario semanal"
        withButton={true}
        buttonType="add"
        to={routes.newLesson.path}
      />
      <Table tableData={subjects} />
    </Box>
  )
}

export default Timetable
