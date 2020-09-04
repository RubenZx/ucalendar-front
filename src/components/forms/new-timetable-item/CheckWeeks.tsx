import {
  Box,
  Checkbox,
  InputLabel,
  Switch,
  Typography,
} from '@material-ui/core'
import { FieldArray } from 'formik'
import React, { useState } from 'react'

interface CheckWeeksProps {
  weeks: boolean[]
  disabled: boolean
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void
}

const CheckWeeks = ({ weeks, setFieldValue, disabled }: CheckWeeksProps) => {
  const [allWeeks, setAllWeeks] = useState(false)

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <InputLabel style={{ marginBottom: '6px' }}>
        Elija las semanas de clase (1-15)
      </InputLabel>
      <Box display="flex" marginBottom="20px" flexWrap="wrap">
        <FieldArray
          name="weeks"
          render={({ replace }) =>
            weeks.map((value: boolean, idk) => (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                key={idk}
              >
                <Typography variant="caption">{idk + 1}</Typography>
                <Checkbox
                  disabled={disabled}
                  checked={value}
                  onChange={(_event, value) => replace(idk, value)}
                />
              </Box>
            ))
          }
        />
      </Box>
      <Box display="flex" alignItems="center">
        <InputLabel>Seleccionar todas las semanas:</InputLabel>
        <Switch
          checked={allWeeks}
          disabled={disabled}
          onChange={(_event) => {
            setAllWeeks(!allWeeks)
            setFieldValue('weeks', Array(15).fill(!allWeeks))
          }}
        />
      </Box>
    </Box>
  )
}

export default CheckWeeks
