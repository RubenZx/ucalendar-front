import { Snackbar } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React, { useState } from 'react'
import { createGroup } from '../../../services/api'
import { Generic } from '../../../services/types'

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

interface NewGroupModalProps {
  open: boolean
  groups: Generic[] | undefined
  setGroups: (groups: any) => void
  setOpen: (opt: boolean) => void
}

const NewGroupModal = ({
  open,
  groups,
  setOpen,
  setGroups,
}: NewGroupModalProps) => {
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [snackOpen, setSnackOpen] = useState<boolean>()
  const [disabled, setDisabled] = useState<boolean>(false)

  const handleClose = () => {
    setName('')
    setError('')
    setMessage('')
    setOpen(false)
  }

  const handleSubmit = () => {
    ;(async () => {
      try {
        const res = await createGroup({ name: name.toUpperCase() })
        setName('')
        setError('')
        setDisabled(true)
        setMessage(`Grupo ${res.name} creado correctamente`)
        if (groups) {
          setGroups([...groups, res])
        } else {
          setGroups([res])
        }
        setSnackOpen(true)
        setTimeout(() => {
          setOpen(false)
          setDisabled(false)
        }, 4000)
      } catch (error) {
        setError(error.response.data.message)
        setSnackOpen(true)
      }
    })()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nuevo grupo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Aqui puedes crear un nuevo grupo para las clases, introduzca el nombre
          del grupo a continuación.
        </DialogContentText>
        <Snackbar
          open={snackOpen}
          autoHideDuration={4000}
          onClose={() => setSnackOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackOpen(false)}
            severity={message !== '' ? 'success' : 'error'}
          >
            {message !== '' ? message : error}
          </Alert>
        </Snackbar>
        <TextField
          autoFocus
          margin="dense"
          value={name}
          error={error !== ''}
          disabled={disabled}
          onChange={(event) => setName(event.target.value)}
          label="Nombre del grupo"
          placeholder="Ej: A1"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={disabled} onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button disabled={disabled} onClick={handleSubmit} color="primary">
          Crear grupo
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewGroupModal
