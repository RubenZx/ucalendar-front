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
import { getAll, getSubjects } from '../../../services/api'
import { Generic, Subject as SubjectType } from '../../../services/types'
import SubjectItems from '../../timetable-item/SubjectItems'
import { StyledPaper } from '../new-timetable-item'

const TimetableItemSelecion = () => {
  const [degree, setDegree] = useState('')
  const [degrees, setDegrees] = useState<Generic[]>()
  const [subject, setSubject] = useState<SubjectType | null>(null)
  const [subjects, setSubjects] = useState<SubjectType[]>()
  const [semester, setSemester] = useState(true)

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
              Seleccione una asignatura a modificar
            </InputLabel>
            {subjects ? (
              <Autocomplete
                fullWidth
                value={subject}
                options={subjects}
                onChange={(_event, value) => {
                  if (value) {
                    setSubject(value)
                  } else {
                    setSubject(null)
                  }
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
              onChange={() => setSemester(!semester)}
            />
          </Box>
        </Box>

        <Box m={1} />
        {subject && <SubjectItems semester={semester} subjectId={subject.id} />}
      </Box>
    </StyledPaper>
  )
}

export default TimetableItemSelecion
