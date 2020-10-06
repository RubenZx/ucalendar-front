import { Box, BoxProps, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'

export default (props: BoxProps) => (
  <Box display="flex" {...props}>
    <CircularProgress />
    <Box m={1} />
    <Typography>Cargando, por favor espere...</Typography>
  </Box>
)
