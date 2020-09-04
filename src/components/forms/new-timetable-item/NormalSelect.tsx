import { Box, InputLabel, MenuItem } from '@material-ui/core'
import { Field, FormikErrors } from 'formik'
import { Select } from 'formik-material-ui'
import React from 'react'
import { Generic } from '../../../services/types'
import { Error } from './DegreeSelect'

interface NormalSelectProps {
  error: string | undefined | FormikErrors<Generic>
  opts: string[] | undefined
  label: string
  name: string
}

const NormalSelect = ({ error, opts, label, name }: NormalSelectProps) => {
  return (
    <Box display="flex" flexGrow={1} flexDirection="column">
      <InputLabel style={{ marginBottom: '5px' }}>{label}</InputLabel>
      <Field
        name={name}
        component={Select}
        options={opts}
        fullWidth
        error={error !== undefined}
      >
        {opts &&
          opts.map((opt, idk) => (
            <MenuItem value={idk} key={idk}>
              {opt}
            </MenuItem>
          ))}
      </Field>
      <Error variant="caption" color="error">
        {error}
      </Error>
    </Box>
  )
}
export default NormalSelect
