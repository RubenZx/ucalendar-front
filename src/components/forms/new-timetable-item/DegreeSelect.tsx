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

  return (
    <Box marginBottom="20px">
      <InputLabel style={{ marginBottom: '5px' }}>
        Elija un grado o máster
      </InputLabel>
      <Field
        fullWidth
        error={error !== undefined}
        component={Select}
        name="degree"
        label="Elija un grado"
        onChange={async (event: any) => {
          setFieldValue('degree', event.target.value)
          const subjects = await getSubjects({ id: event.target.value })
          setSubjects(subjects)
        }}
        onClick={async () => {
          if (idDegree) {
            const subjects = await getSubjects({ id: idDegree })
            setSubjects(subjects)
          }
        }}
      >
        {degrees?.map((degree) => (
          <MenuItem value={degree.id} key={degree.id}>
            {degree.name}
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