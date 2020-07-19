import { yupResolver } from '@hookform/resolvers'
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
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  user: yup.string().required('Usuario requerido'),
  password: yup.string().required('Por favor, introduzca su contraseña'),
})

interface FormInput {
  user: string
  password: string
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { handleSubmit, control, errors } = useForm({
    resolver: yupResolver(validationSchema),
  })
  console.log(errors)

  const onSubmit = (data: FormInput) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <DialogContentText>
          Para iniciar sesión, introduzca su usuario y contraseña
        </DialogContentText>
        <Controller
          as={TextField}
          name="user"
          label="Usuario"
          margin="dense"
          fullWidth
          defaultValue=""
          control={control}
          error={errors.user !== undefined}
          helperText={errors.user?.message}
        />
        <Box display="flex" alignItems="center">
          <Controller
            as={TextField}
            name="password"
            label="Contraseña"
            margin="dense"
            fullWidth
            defaultValue=""
            control={control}
            error={errors.password !== undefined}
            helperText={errors.password?.message}
            type={showPassword ? 'text' : 'password'}
          />
          <IconButton
            onClick={(event) => {
              event.preventDefault()
              setShowPassword(!showPassword)
            }}
            style={
              errors.password === undefined
                ? { margin: '8px 0px 4px' }
                : undefined
            }
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
