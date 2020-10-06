import { Box, InputLabel, MenuItem, Typography } from '@material-ui/core'
import { Field } from 'formik'
import { Select } from 'formik-material-ui'
import React, { useEffect, useState } from 'react'
import { getAll, getSubjects } from '../../../services/api'
import { Generic, Subject } from '../../../services/types'
import { styled } from '../../../theme'

export const Error = styled(Typography)`
  margin: 5px 0px;
`
interface DegreeSelectProps {
  idDegree: string | undefined
  semester: boolean
  error: string | undefined
  setSubjects: (subjects: Subject[]) => void
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void
}

const DegreeSelect = ({
  error,
  idDegree,
  semester,
  setSubjects,
  setFieldValue,
}: DegreeSelectProps) => {
  const [degrees, setDegrees] = useState<Generic[]>()

  useEffect(() => {
    ;(async () => {
      const degrees = await getAll('degrees/')
      setDegrees(degrees)
    })()
  }, [])

  useEffect(() => {
    if (idDegree) {
      ;(async () => {
        try {
          const res = await getSubjects(idDegree, semester)
          setSubjects(res)
        } catch (e) {
          setSubjects([])
        }
      })()
      setFieldValue('subject', null)
    }
  }, [semester, idDegree, setSubjects, setFieldValue])

  return (
    <Box display="flex" flexDirection="column" flexGrow={1} marginBottom="20px">
      <InputLabel style={{ marginBottom: '5px' }}>
        Elija un grado o máster
      </InputLabel>
      <Field
        fullWidth
        error={error !== undefined}
        component={Select}
        name="degree"
        label="Elija un grado"
      >
        {degrees?.map((degree) => (
          <MenuItem value={degree.id} key={degree.id}>
            <Typography>
              {degree.name} ({degree.id})
            </Typography>
          </MenuItem>
        ))}
      </Field>

      <Error variant="caption" color="error">
        {error}
      </Error>
    </Box>
  )
}
export default DegreeSelect
