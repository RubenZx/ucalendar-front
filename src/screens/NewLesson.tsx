import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AddItem from '../components/forms/add-subject-to-timetable'
import Title from '../components/Title'
import { useAuth } from '../context/auth'
import routes from '../routes/routes'
import { getUserSubjects } from '../services/api'

const NewLesson = () => {
  const { user, userToken } = useAuth()
  const uid = user?.uid

  const { location } = useHistory()
  const semester = location.pathname.includes('first')

  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    ;(async () => {
      if (userToken && uid) {
        try {
          const res = await getUserSubjects(userToken, uid, semester)
          setSubjects(res)
        } catch (error) {}
      }
    })()
  }, [userToken, uid, semester])

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Title
        title="Añadir nueva asignatura"
        subtitle="Aquí puedes añadir una asignatura a tu horario semanal"
        withButton={true}
        buttonType="back"
        to={routes.baseUrl.path}
      />
      <AddItem subjects={subjects} semester={semester} />
    </Box>
  )
}

export default NewLesson
