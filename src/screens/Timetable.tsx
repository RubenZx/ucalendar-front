import { Grid } from '@material-ui/core'
import React from 'react'
import subjects from '../assets/subjects.json'
import Table from '../components/Table'
import Title from '../components/Title'
import routes from '../routes/routes'

const Timetable = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Title
          title="Horario - Rubén Montero Domínguez"
          subtitle="Aquí puedes crear y planificar tu horario semanal"
          withButton={true}
          buttonType="add"
          to={routes.newLesson.path}
        />
      </Grid>
      <Grid item xs={12}>
        <Table tableData={subjects} />
      </Grid>
    </Grid>
  )
}

export default Timetable
