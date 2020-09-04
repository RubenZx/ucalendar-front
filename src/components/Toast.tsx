import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import React from 'react'

interface ToastProps {
  open: boolean
  status: 'success' | 'error'
  errorMessage: string
  successMessage: string
  onClose: () => void
}

const Toast = ({
  open,
  onClose,
  errorMessage,
  successMessage,
  status,
}: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={status}>
        {status === 'success' ? successMessage : errorMessage}
      </Alert>
    </Snackbar>
  )
}

export default Toast
