import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../context/auth'
import { useUser } from '../../../context/user'
import { addTimetableItem, getTimetableItems } from '../../../services/api'
import {
  Subject as SubjectType,
  TimetableItemRelations,
} from '../../../services/types'
import { styled } from '../../../theme'
import { cannotAdd } from '../../../utils/timetable-items-functions'
import TimetableItem from '../../timetable-item'
import Toast from '../../Toast'
import { StyledPaper } from '../new-timetable-item'

const StyledBox = styled(Box)`
  margin: 20px 0px;
`

const HoverableBox = styled(Box)<{ hover?: string }>`
  :hover {
    cursor: ${({ hover }) => (hover === 'true' ? 'pointer' : 'not-allowed')};
  }
`

const AddItem = ({
  subjects,
  itemsAdded,
}: {
  subjects: SubjectType[]
  itemsAdded: TimetableItemRelations[]
}) => {
  const history = useHistory()
  const { userToken } = useAuth()
  const { user, setTimetableItems } = useUser()
  const uid = user?.uid

  const [subjectId, setSubjectId] = useState(0)
  const [checkedItem, setCheckedItem] = useState<boolean[]>()
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')

  const [items, setItems] = useState<TimetableItemRelations[]>()
  const [selectedItems, setSelectecItems] = useState<TimetableItemRelations[]>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event: any) => {
    setSubjectId(event.target.value)
  }

  const handleSelect = (idk: number) => {
    if (checkedItem && checkedItem?.length > 0) {
      const newItems = checkedItem.map((item, index) =>
        index === idk ? !item : item,
      )
      setCheckedItem([...newItems])
      setSelectecItems(items?.filter((_item, idk) => newItems[idk]))
    }
  }

  const handleAdd = async () => {
    let salir = false
    if (userToken && uid && selectedItems) {
      let i = 0
      while (!salir && i < selectedItems.length) {
        try {
          await addTimetableItem(userToken, uid, selectedItems[i].id)
          i += 1
        } catch (e) {
          salir = true

          setSnackMessage(
            e.response.data.statusCode === 403
              ? 'Recurso no disponible'
              : e.response.data.message,
          )
          setSnackOpen(true)
        }
      }
      if (!salir) setTimetableItems(selectedItems)
      setSnackOpen(true)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (subjectId !== 0 && userToken) {
        try {
          const items = await getTimetableItems(subjectId.toString(), userToken)
          // Quitamos los items que ya estén en nuestro horario
          setItems([
            ...items.filter(
              (item) => !itemsAdded.find((i) => i.id === item.id),
            ),
          ])
          setCheckedItem(Array(items.length).fill(false))
        } catch (error) {
          setItems([])
          setCheckedItem([])
        }
      }
    })()
  }, [subjectId, itemsAdded, userToken])

  return (
    <StyledPaper elevation={2}>
      <StyledBox display="flex">
        <Select
          displayEmpty
          fullWidth
          value={subjectId}
          onChange={handleChange}
        >
          <MenuItem disabled value={0}>
            <em style={{ fontWeight: 'lighter' }}>Seleccione una asignatura</em>
          </MenuItem>
          {subjects.map((subject, idk) => (
            <MenuItem key={idk} value={subject.id}>
              {subject.name}
            </MenuItem>
          ))}
        </Select>
      </StyledBox>

      <StyledBox display="flex" flexDirection="column">
        <InputLabel style={{ marginBottom: '5px' }}>
          Seleccione los items a añadir:
        </InputLabel>
        <Box display="flex" flexWrap="wrap">
          {subjectId === 0 ? (
            <Typography style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>
              No se ha seleccionado ninguna asignatura
            </Typography>
          ) : items && checkedItem && items.length > 0 ? (
            items.map((item, idk) => {
              const dontAdd = cannotAdd(itemsAdded, item)
              return (
                <HoverableBox
                  hover={dontAdd ? 'false' : 'true'}
                  key={idk}
                  onClick={() => {
                    !dontAdd && handleSelect(idk)
                  }}
                >
                  <TimetableItem
                    timetableItem={item}
                    showDay
                    border={checkedItem[idk]}
                    borderColor={dontAdd ? '#f44336' : undefined}
                  />
                </HoverableBox>
              )
            })
          ) : (
            <Typography style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>
              No hay items disponibles para la asignatura seleccionada...
            </Typography>
          )}
        </Box>
      </StyledBox>

      <Box display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          color="primary"
          onClick={() => {
            setIsSubmitting(true)
            handleAdd()
          }}
          disabled={!selectedItems || isSubmitting}
        >
          Añadir items
        </Button>
      </Box>

      <Toast
        open={snackOpen}
        onClose={() => {
          setSnackOpen(false)
          history.goBack()
        }}
        successMessage={
          (selectedItems && selectedItems?.length > 1
            ? 'Items añadidos'
            : 'Item añadido') + ' con éxito...'
        }
        errorMessage={snackMessage + '...'}
        status={snackMessage === '' ? 'success' : 'error'}
      />
    </StyledPaper>
  )
}

export default AddItem
