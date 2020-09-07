import {
  Box,
  InputLabel,
  MenuItem,
  Select,
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
          const subjects = await getSubjects({ id: degree })
          setSubjects(subjects)
        } catch (e) {}
      })()
    }
    setSubject(null)
  }, [degree])

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
        <Box m={2} />
        {subject && <SubjectItems subjectId={subject.id} />}
      </Box>
    </StyledPaper>
  )
}

export default TimetableItemSelecion
