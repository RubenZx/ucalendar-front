import { Box, Button } from '@material-ui/core'
import RestorePageIcon from '@material-ui/icons/RestorePage'
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
      <Box display="flex" justifyContent="flex-end">
        <Button
          startIcon={<RestorePageIcon />}
          variant="text"
          color="primary"
          onClick={() => {}}
          style={{ marginTop: '25px' }}
        >
          Restablecer horario
        </Button>
      </Box>
    </Box>
  )
}

export default Timetable
