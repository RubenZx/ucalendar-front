import { Box, Button, CircularProgress } from '@material-ui/core'
import RestorePageIcon from '@material-ui/icons/RestorePage'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Timetable from '../../components/Timetable'
import Title from '../../components/Title'
import { useAuth } from '../../context/auth'
import { useUser } from '../../context/user'
import routes from '../../routes/routes'
import { removeTimetable } from '../../services/api'

const UserTimetable = () => {
  const { location } = useHistory()
  const semester = location.pathname.includes('first')

  const { userToken } = useAuth()
  const { user, timetableItems, removeTimetableItems } = useUser()
  const uid = user?.uid

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timetableItemsState, setTimetableItemsState] = useState(
    timetableItems?.filter((item) => item.semester === semester),
  )
  const [loading, setLoading] = useState(false)

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
        state={timetableItemsState}
      />
      <Timetable items={timetableItemsState || []} />
      <Box display="flex" justifyContent="flex-end">
        <Box display="flex" style={{ position: 'relative' }}>
          <Button
            startIcon={<RestorePageIcon />}
            variant="text"
            color="primary"
            disabled={
              loading || (timetableItemsState && timetableItemsState.length < 1)
            }
            onClick={async () => {
              let error = false
              if (userToken && uid) {
                try {
                  await removeTimetable(userToken, uid)
                } catch (e) {
                  error = true
                }
              }
              if (!error) {
                setLoading(true)
                setTimeout(() => {
                  setTimetableItemsState([])
                  removeTimetableItems()
                  setLoading(false)
                }, 2000)
              }
            }}
            style={{ marginTop: '25px' }}
          >
            Restablecer horario
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default UserTimetable
