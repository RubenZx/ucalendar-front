import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Field, Formik } from 'formik'
import { TextField } from 'formik-material-ui'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { useAuth } from '../../context/auth'
import { useUser } from '../../context/user'
import routes from '../../routes/routes'
import { getProfile, login } from '../../services/api'

const validationSchema = yup.object().shape({
  user: yup.string().required('Usuario requerido'),
  password: yup.string().required('Por favor, introduzca su contraseña'),
})

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const { setUser } = useUser()

  const history = useHistory()

  return (
    <Formik
      initialValues={{ user: '', password: '' }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (values) => {
        setError('')
        try {
          const res = await login(values.user, values.password)
          signIn(res.access_token)
          if (res.access_token) {
            const user = await getProfile(res.access_token, values.user)
            setUser(user)
          }
          history.push(routes.baseUrl.path)
        } catch (error) {
          setError('Usuario o contraseña incorrectos')
        }
      }}
    >
      {({ submitForm, isSubmitting, errors }) => (
        <>
          <DialogContent>
            <DialogContentText>
              Para iniciar sesión, introduzca su usuario y contraseña
            </DialogContentText>
            <Field
              component={TextField}
              name="user"
              label="Usuario"
              fullWidth
              error={errors.user !== undefined}
              helperText={errors.user}
            />
            <Box display="flex" alignItems="center">
              <Field
                component={TextField}
                label="Contraseña"
                name="password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                error={errors.password !== undefined || error !== ''}
                helperText={errors.password || error}
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
            <Button
              type="submit"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Entrar
            </Button>
          </DialogActions>
        </>
      )}
    </Formik>
  )
}

export default LoginForm
