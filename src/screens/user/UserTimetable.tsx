import { Box, Button } from '@material-ui/core'
import RestorePageIcon from '@material-ui/icons/RestorePage'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Timetable from '../../components/Timetable'
import Title from '../../components/Title'
import { useAuth } from '../../context/auth'
import routes from '../../routes/routes'
import { getTimetable } from '../../services/api'
import { TimetableItemRelations } from '../../services/types'

const UserTimetable = () => {
  const { user, userToken } = useAuth()
  const uid = user?.uid

  const { location } = useHistory()
  const semester = location.pathname.includes('first')

  const [timetableItems, setTimetableItems] = useState<
    { timeTableItem: TimetableItemRelations }[]
  >()

  useEffect(() => {
    if (userToken && uid) {
      ;(async () => {
        const timetable = await getTimetable(uid, semester, userToken)
        setTimetableItems(timetable.timeTableItems)
      })()
    }
  }, [userToken, uid, semester])

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Title
        title={`${semester ? 'Primer' : 'Segundo'} semestre - ${user?.name} ${
          user?.lastName
        }`}
        subtitle="Aquí puedes crear y planificar tu horario semanal"
        withButton={true}
        buttonType="add"
        to={semester ? routes.firstNewLesson.path : routes.secondNewLesson.path}
      />
      <Timetable items={timetableItems || []} />
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

export default UserTimetable
