import { Box, InputLabel, TextField } from '@material-ui/core'
import { Field, FormikErrors } from 'formik'
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab'
import React from 'react'
import { Subject } from '../../../services/types'
import { Error } from './DegreeSelect'

// onInputChange={(_event: any, value: any) => {
//   const res = subjects.find((subject) => subject.name === value)
//   setFieldValue('subject', res?.id)
// }}

const SubjectsSelect = ({
  subjects,
  error,
}: {
  subjects: Subject[] | undefined
  error: string | undefined | FormikErrors<Subject>
}) => {
  return (
    <Box display="flex" flexGrow={1} flexDirection="column" marginBottom="20px">
      <InputLabel style={{ marginBottom: '5px' }}>
        Elija una asignatura
      </InputLabel>
      {subjects ? (
        <Field
          name="subject"
          component={Autocomplete}
          options={subjects}
          fullWidth
          noOptionsText="No hay asignaturas"
          getOptionLabel={(option: Subject) => (option.name ? option.name : '')}
          getOptionSelected={(option: Subject, value: any) =>
            value.id !== '' ? option.id === value.id : false
          }
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField {...params} error={error !== undefined} />
          )}
        />
      ) : (
        <TextField
          error={error !== undefined}
          placeholder="Primero ha de seleccionar un grado..."
          disabled
        />
      )}
      <Error variant="caption" color="error">
        {error}
      </Error>
    </Box>
  )
}

export default SubjectsSelect
