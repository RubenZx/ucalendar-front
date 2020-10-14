import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AddItem from '../components/forms/add-subject-to-timetable'
import Title from '../components/Title'
import { useAuth } from '../context/auth'
import { useUser } from '../context/user'
import routes from '../routes/routes'
import { getTimetable, getUserSubjects } from '../services/api'
import { Subject, TimetableItemRelations } from '../services/types'

const NewLesson = () => {
  const { userToken } = useAuth()
  const { user } = useUser()

  const uid = user?.uid

  const history = useHistory<TimetableItemRelations[]>()
  const semester = history.location.pathname.includes('first')

  const [itemsAdded, setItemsAdded] = useState(history.location.state)
  const [subjects, setSubjects] = useState<Subject[]>([])

  if (itemsAdded === undefined && userToken) {
    ;(async () => {
      const res = await getTimetable(uid, semester, userToken)
      setItemsAdded(res)
    })()
  }

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
        onClick={() => history.push(routes.baseUrl.path)}
      />
      <AddItem itemsAdded={itemsAdded} subjects={subjects} />
    </Box>
  )
}

export default NewLesson
