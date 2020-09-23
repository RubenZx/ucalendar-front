import { Box, InputLabel } from '@material-ui/core'
import React, { useState } from 'react'
import { CirclePicker } from 'react-color'
import { Error } from './DegreeSelect'

interface indexedObject {
  [key: string]: string
}

const colors: indexedObject = {
  '#d1332b': '#f5dddd',
  '#ef8532': '#fcebda',
  '#67ab57': '#e6f1e4',
  '#4a7db3': '#e2ebf3',
  '#8e529e': '#faedf4',
  '#e787bd': '#ede4f0',
  '#9b5932': '#efe5e9',
  '#9a9a9a': '#efefef',
}

interface ColorPickerProps {
  error: string | undefined
  colorAbrev?: string
  disabled?: boolean
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void
}

export default ({
  setFieldValue,
  error,
  colorAbrev,
  disabled = false,
}: ColorPickerProps) => {
  const [color, setColor] = useState(colorAbrev)

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <InputLabel style={{ marginBottom: '5px' }}>
        Seleccione un color para el item
      </InputLabel>
      <Box m={1} />
      <CirclePicker
        color={color}
        colors={Object.keys(colors)}
        width="100%"
        onChange={(color) => {
          if (!disabled) {
            setColor(color.hex)
            setFieldValue('colorBg', colors[color.hex])
            setFieldValue('colorAbrev', color.hex)
          }
        }}
      />
      <Error variant="caption" color="error">
        {error}
      </Error>
    </Box>
  )
}
