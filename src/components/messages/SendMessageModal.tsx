import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core'
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete'
import React, { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../../context/auth'
import { useUser } from '../../context/user'
import { getAll, sendMessage } from '../../services/api'

interface SendMessageModalProps {
  open: boolean
  handleOpen: (open: boolean) => void
  onClose: (uid: string) => void
}

interface UserInfo {
  name: string
  lastName: string
  uid: string
}

interface StateType {
  message: string
  messageTo: string
}

const initialState: StateType = {
  message: '',
  messageTo: '',
}

const reducer = (state: StateType, action: { type: string }) => {
  switch (action.type) {
    case 'errorMessage':
      return { ...state, message: 'Introduzca un mensaje, mín.10 caracteres' }
    case 'clearErrorMessage':
      return { ...state, message: '' }
    case 'errorTo':
      return { ...state, messageTo: 'Por favor, seleccione un destinatario' }
    case 'clearErrorTo':
      return { ...state, messageTo: '' }
    default:
      return initialState
  }
}

const SendMessageModal = ({
  open,
  handleOpen,
  onClose,
}: SendMessageModalProps) => {
  const { userToken } = useAuth()
  const { user } = useUser()

  const [max, setMax] = useState(0)
  const [users, setUsers] = useState<UserInfo[]>([])
  const [message, setMessage] = useState('')
  const [messageTo, setMessageTo] = useState<UserInfo>()
  const [errors, dispatch] = useReducer(reducer, initialState)

  const handleClose = () => {
    if (messageTo && message) {
      onClose(messageTo.uid)
    }
    dispatch({ type: '' })
    setMessage('')
    setMessageTo(undefined)
    handleOpen(false)
  }

  useEffect(() => {
    if (userToken) {
      ;(async () => {
        const users = await getAll('/users', userToken)
        setUsers(users)
      })()
    }
  }, [userToken])

  const handleSend = () => {
    if (!message || message.length < 10) {
      dispatch({ type: 'errorMessage' })
    } else {
      dispatch({ type: 'clearErrorMessage' })
    }

    if (!messageTo) {
      dispatch({ type: 'errorTo' })
    } else {
      dispatch({ type: 'clearErrorTo' })
    }

    if (Object.values(errors).every((attri) => attri === '')) {
      ;(async () => {
        if (messageTo && user && userToken) {
          await sendMessage(
            {
              sentToUid: messageTo.uid,
              sentFromUid: user.uid,
              content: message,
            },
            userToken,
          )
          handleClose()
        }
      })()
    }
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Nuevo mensaje</DialogTitle>
      <DialogContent>
        <DialogContentText>
          A continuación seleccione un destinatario y escriba el mensaje a
          enviar
        </DialogContentText>
        <Autocomplete
          options={users}
          onChange={(_event, value) => setMessageTo(value ? value : undefined)}
          noOptionsText="Usuario no encontrado"
          getOptionLabel={(option) => `${option.name} ${option.lastName}`}
          renderInput={(props: AutocompleteRenderInputParams) => (
            <TextField
              error={errors.messageTo !== ''}
              placeholder="Seleccione un destinatario"
              {...props}
            />
          )}
        />
        <Typography color="error" variant="caption">
          {errors.messageTo}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TextField
            style={{ marginTop: '14px' }}
            multiline
            fullWidth
            rowsMax={3}
            value={message}
            error={errors.message !== ''}
            onChange={(event) => {
              if (event.target.value.length < 190) {
                setMax((event.target.value.length * 100) / 190)
                setMessage(event.target.value)
              }
            }}
            placeholder="Escriba su mensaje aquí..."
          />
          <Box m={1} />
          <CircularProgress variant="static" value={max} />
        </Box>
        <Typography color="error" variant="caption">
          {errors.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSend} color="primary">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SendMessageModal
