import { InputAdornment, TextField } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { Field } from 'formik'
import { TimePicker } from 'formik-material-ui-pickers'
import React, { useState } from 'react'
import { styled } from '../../../theme'

const StyledTimeIcon = styled(AccessTimeIcon)`
  :hover {
    cursor: pointer;
  }
`

const HoursPicker = ({
  name,
  label,
  value,
}: {
  name: string
  label: string
  value?: Date
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Field
      component={TimePicker}
      value={value}
      label={label}
      name={name}
      open={open}
      fullWidth
      onClose={() => setOpen(!open)}
      onAccept={() => setOpen(!open)}
      TextFieldComponent={(props: any) => (
        <TextField onFocus={() => setOpen(!open)} {...props} />
      )}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" onClick={() => setOpen(true)}>
            <StyledTimeIcon />
          </InputAdornment>
        ),
      }}
      ampm={false}
    />
  )
}

export default HoursPicker
