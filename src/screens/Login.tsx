import { Box, Dialog, DialogTitle } from '@material-ui/core'
import React from 'react'
import Logo from '../assets/logo.gif'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <Dialog open>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <img width={180} src={Logo} alt="logoUCA" />
          Iniciar sesión
        </Box>
      </DialogTitle>
      <LoginForm />
    </Dialog>
  )
}

export default Login
