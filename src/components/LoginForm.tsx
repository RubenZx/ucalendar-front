import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface FormInput {
  user: string
  password: string
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { handleSubmit, control } = useForm()

  const onSubmit = (data: FormInput) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <DialogContentText>
          Para iniciar sesión, por favor, introduzca su usuario y contraseña
        </DialogContentText>
        <Controller
          as={TextField}
          name="user"
          label="Usuario"
          margin="dense"
          fullWidth
          control={control}
          defaultValue=""
        />
        <Box display="flex" alignItems="flex-end">
          <Controller
            as={TextField}
            name="password"
            label="Contraseña"
            margin="dense"
            control={control}
            fullWidth
            defaultValue=""
            type={showPassword ? 'text' : 'password'}
          />
          <IconButton
            onClick={(event) => {
              event.preventDefault()
              setShowPassword(!showPassword)
            }}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="submit" color="primary">
          Entrar
        </Button>
      </DialogActions>
    </form>
  )
}

export default LoginForm
