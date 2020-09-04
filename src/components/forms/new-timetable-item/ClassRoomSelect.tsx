import { Box, InputLabel, TextField } from '@material-ui/core'
import { Field } from 'formik'
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab'
import React, { useEffect, useState } from 'react'
import { getAll } from '../../../services/api'
import { Generic } from '../../../services/types'
import { Error } from './DegreeSelect'

/**
 *
 *
 *
 * UNUSED
 */
const ClassRoomSelect = ({ error }: { error: string | undefined }) => {
  const [classRooms, setClassRooms] = useState<Generic>()

  useEffect(() => {
    ;(async () => {
      const classRooms = await getAll('class-rooms/')
      setClassRooms(classRooms)
    })()
  }, [])

  return (
    <Box display="flex" flexGrow={1} flexDirection="column">
      <InputLabel style={{ marginBottom: '5px' }}>Elija un aula</InputLabel>
      {classRooms ? (
        <Field
          name="classRoom"
          component={Autocomplete}
          options={classRooms}
          fullWidth
          noOptionsText="El aula introducida no existe"
          getOptionLabel={(option: Generic) => (option.name ? option.name : '')}
          getOptionSelected={(option: Generic, value: any) =>
            option.id === value.id
          }
          renderInput={(props: AutocompleteRenderInputParams) => (
            <TextField {...props} error={error !== undefined} />
          )}
        />
      ) : (
        <TextField error={error !== undefined} disabled />
      )}
      <Error variant="caption" color="error">
        {error}
      </Error>
    </Box>
  )
}

export default ClassRoomSelect
