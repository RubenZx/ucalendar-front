import { Box, Typography } from '@material-ui/core'
import React from 'react'

const NoMessagesText = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    style={{ height: '65vh', width: '100%' }}
  >
    <Typography variant="h5">No tienes ningún mensaje seleccionado</Typography>
    <Typography variant="body1">
      Elige uno de tus mensajes existentes o comienza uno nuevo.
    </Typography>
  </Box>
)

export default NoMessagesText
