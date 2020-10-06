import { Box, Typography } from '@material-ui/core'
import React from 'react'

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h2">404</Typography>
        <Typography>Página no encontrada</Typography>
      </Box>
    </Box>
  )
}

export default NotFound
