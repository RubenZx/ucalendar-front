import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/auth'
import { getAll, getSubjects, getTimetableItems } from '../../../services/api'
import {
  Generic,
  Subject as SubjectType,
  TimetableItemRelations,
} from '../../../services/types'
import Loader from '../../Loader'
import SubjectItems from '../../timetable-item/SubjectItems'
import { StyledPaper } from '../new-timetable-item'
import ItemsToRemove from '../remove-timetable-items'

const TimetableItemSelection = ({ edit }: { edit: boolean }) => {
  const [degree, setDegree] = useState('')
  const [degrees, setDegrees] = useState<Generic[]>()
  const [subject, setSubject] = useState<SubjectType | null>(null)
  const [subjects, setSubjects] = useState<SubjectType[]>()
  const [semester, setSemester] = useState(true)

  const [items, setItmes] = useState<TimetableItemRelations[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { userToken } = useAuth()

  useEffect(() => {
    ;(async () => {
      const degrees = await getAll('degrees/')
      setDegrees(degrees)
    })()
  }, [])

  useEffect(() => {
    if (degree) {
      ;(async () => {
        try {
          const subjects = await getSubjects(degree, semester)
          setSubjects(subjects)
        } catch (e) {}
      })()
    }
    setSubject(null)
  }, [degree, semester])

  useEffect(() => {
    if (subject) {
      setLoading(true)
      setTimeout(async () => {
        if (userToken) {
          try {
            const items = await getTimetableItems(
              subject?.id,
              userToken,
              semester,
            )
            setItmes(items)
          } catch (error) {
            setItmes([])
          }
        }
        setLoading(false)
      }, 500)
    }
  }, [subject, semester, userToken])

  return (
    <StyledPaper>
      <Box display="flex" flexDirection="column">
        <InputLabel style={{ marginBottom: '5px' }}>
          Seleccione un grado
        </InputLabel>
        <Select
          fullWidth
          value={degree}
          onChange={(event) => {
            event.preventDefault()
            setDegree(event.target.value as string)
          }}
        >
          {degrees?.map((degree) => (
            <MenuItem value={degree.id} key={degree.id}>
              <Typography>
                {degree.name} ({degree.id})
              </Typography>
            </MenuItem>
          ))}
        </Select>
        <Box m={2} />
        <Box display="flex">
          <Box display="flex" flexGrow={1} flexDirection="column">
            <InputLabel style={{ marginBottom: '5px' }}>
              Seleccione una asignatura
            </InputLabel>
            {subjects ? (
              <Autocomplete
                fullWidth
                value={subject}
                options={subjects}
                onChange={(_event, value) => {
                  setSubject(value ? value : null)
                }}
                noOptionsText="No hay asignaturas"
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} />}
              />
            ) : (
              <TextField
                disabled
                fullWidth
                placeholder="Primero ha de seleccionar un grado..."
              />
            )}
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <InputLabel style={{ marginBottom: '5px' }}>
              Seleccione semestre:
            </InputLabel>
            <Typography variant="caption">
              {semester ? '1er semestre' : '2do semestre'}
            </Typography>
            <Switch
              disabled={!subjects}
              checked={semester}
              onChange={() => {
                setSemester(!semester)
                setSubject(null)
              }}
            />
          </Box>
        </Box>

        <Box m={1} />
        {subject &&
          (loading ? (
            <Loader alignItems="center" />
          ) : edit ? (
            <SubjectItems items={items} semester={semester} />
          ) : (
            <ItemsToRemove items={items} />
          ))}
      </Box>
    </StyledPaper>
  )
}

export default TimetableItemSelection
