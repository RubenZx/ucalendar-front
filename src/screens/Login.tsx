import { Box, Dialog, DialogTitle, Typography } from '@material-ui/core'
import React from 'react'
import Logo from '../assets/logo.gif'
import LoginForm from '../components/forms/Login'

const Login = () => {
  return (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <img width={200} src={Logo} alt="logoUCA" />
          <Box m={1} />
          <Typography variant="h5">Iniciar sesión</Typography>
          <Box m={1} />
        </Box>
      </DialogTitle>
      <LoginForm />
    </Dialog>
  )
}

export default Login
