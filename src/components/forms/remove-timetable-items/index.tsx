import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../context/auth'
import { removeTimetableItem } from '../../../services/api'
import { TimetableItemRelations } from '../../../services/types'
import TimetableItem from '../../timetable-item'
import Toast from '../../Toast'
import { HoverableBox } from '../add-subject-to-timetable'

interface ItemsToRemoveProps {
  items: TimetableItemRelations[]
}

const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']

const ItemsToRemove = ({ items }: ItemsToRemoveProps) => {
  const [chosenItems, setChosenItems] = useState<boolean[]>(
    Array(items.length).fill(false),
  )
  const [selectedItems, setSelectedItems] = useState<TimetableItemRelations[]>()
  const [checked, setChecked] = useState(false)
  const [open, setOpen] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')

  const { userToken } = useAuth()
  const history = useHistory()

  const handleClose = () => {
    setOpen(false)
  }

  const handleSelect = (idk: number) => {
    const newItems = chosenItems.map((item, index) =>
      index === idk ? !item : item,
    )
    setChosenItems([...newItems])
    setSelectedItems(items.filter((_item, idk) => newItems[idk]))
  }

  const selectAll = () => {
    setChecked(!checked)
    setChosenItems(Array(items.length).fill(!checked))
    setSelectedItems(!checked ? [...items] : [])
  }

  const handleRemove = () => {
    if (userToken) {
      setRemoving(true)
      selectedItems?.forEach(({ id }) => {
        ;(async () => {
          try {
            await removeTimetableItem(id, userToken)
          } catch (e) {
            setSnackMessage(e.response.data.message)
          }
        })()
      })
      setSnackOpen(true)
    }
  }

  const toastClose = () => {
    setSnackOpen(false)
    history.go(0)
  }

  useEffect(() => {
    setChecked(selectedItems?.length === items.length)
  }, [selectedItems, items])

  return (
    <>
      <Box display="flex" flexDirection="column">
        <InputLabel style={{ marginBottom: '5px' }}>
          Seleccione los items a eliminar:
        </InputLabel>
      </Box>
      <Box display="flex" flexWrap="wrap">
        {items.length > 0 ? (
          items.map((item, idk) => (
            <HoverableBox
              key={idk}
              hover="true"
              onClick={() => {
                handleSelect(idk)
              }}
            >
              <TimetableItem timetableItem={item} border={chosenItems[idk]} />
            </HoverableBox>
          ))
        ) : (
          <Typography style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>
            No hay items disponibles para la asignatura seleccionada...
          </Typography>
        )}
      </Box>
      <Box m={1} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {items.length > 0 ? (
          <Box display="flex" alignItems="center">
            <InputLabel style={{ marginBottom: '5px' }}>
              Seleccionar todos:
            </InputLabel>
            <Checkbox checked={checked} onChange={selectAll} />
          </Box>
        ) : (
          <Box m={1} />
        )}
        <Button
          disabled={chosenItems.every((item) => item === false)}
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(true)
          }}
        >
          Eliminar
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          ¿Seguro que desea eliminar los siguientes items?
        </DialogTitle>
        <DialogContent>
          {selectedItems?.map((item, idk) => (
            <DialogContentText key={idk}>
              {item.id} - {item.type} de {item.startHour} a {item.endHour},{' '}
              {days[item.dayOfTheWeek]}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button disabled={removing} onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            disabled={removing}
            onClick={handleRemove}
            color="primary"
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Toast
        open={snackOpen}
        onClose={toastClose}
        successMessage={
          (selectedItems && selectedItems?.length > 1
            ? 'Items eliminados'
            : 'Item eliminado') + ' con éxito...'
        }
        errorMessage={snackMessage + '...'}
        status={snackMessage === '' ? 'success' : 'error'}
      />
    </>
  )
}

export default ItemsToRemove
