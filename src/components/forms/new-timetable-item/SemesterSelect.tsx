import { Box, InputLabel, Typography } from '@material-ui/core'
import { Field } from 'formik'
import { Switch } from 'formik-material-ui'
import React from 'react'

const SemesterSelect = ({ value }: { value: boolean }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <InputLabel style={{ marginBottom: '5px' }}>
        Seleccione semestre:
      </InputLabel>
      <Typography variant="caption">
        {value ? '1er semestre' : '2do semestre'}
      </Typography>
      <Field component={Switch} checked={value} name="semester" />
    </Box>
  )
}

export default SemesterSelect
