import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getTimetableItems } from '../../../services/api'
import {
  Subject as SubjectType,
  TimetableItemRelations,
} from '../../../services/types'
import { styled } from '../../../theme'
import TimetableItem from '../../timetable-item'
import { StyledPaper } from '../new-timetable-item'

const StyledBox = styled(Box)`
  margin: 20px 0px;
`

const HoverableBox = styled(Box)`
  :hover {
    cursor: pointer;
  }
  color: ${(props: { color: string }) => props.color}!important;
`

const AddItem = ({
  subjects,
  itemsAdded,
  semester,
}: {
  subjects: SubjectType[]
  itemsAdded: TimetableItemRelations[]
  semester: boolean
}) => {
  const [selectedId, setSelectedId] = useState(0)
  const [items, setItems] = useState<TimetableItemRelations[]>()
  const [checkedItem, setCheckedItem] = useState<boolean[]>()

  const handleChange = (event: any) => {
    setSelectedId(event.target.value)
  }

  const handleSelect = (idk: number) => {
    if (checkedItem && checkedItem?.length > 0) {
      const newItems = checkedItem.map((item, index) =>
        index === idk ? !item : item,
      )
      setCheckedItem([...newItems])
    }
  }

  console.log(checkedItem)

  const handleAdd = () => {
    console.log()
  }

  useEffect(() => {
    ;(async () => {
      if (selectedId !== 0) {
        try {
          const items = await getTimetableItems(selectedId.toString())
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
    console.log('aaaah')
  }, [selectedId, itemsAdded])

  return (
    <StyledPaper elevation={2}>
      <StyledBox display="flex">
        <Select
          displayEmpty
          fullWidth
          value={selectedId}
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
        <Box display="flex">
          {selectedId === 0 ? (
            <Typography style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>
              No se ha seleccionado ninguna asignatura
            </Typography>
          ) : items && checkedItem && items.length > 0 ? (
            items.map((item, idk) => (
              <HoverableBox
                color="#000"
                key={idk}
                onClick={() => handleSelect(idk)}
              >
                <TimetableItem
                  timetableItem={item}
                  showDay
                  border={checkedItem[idk]}
                  borderColor={itemsAdded.includes(item) ? 'red' : undefined}
                />
              </HoverableBox>
            ))
          ) : (
            <Typography style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>
              No hay items disponibles para la asignatura seleccionada...
            </Typography>
          )}
        </Box>
      </StyledBox>

      <Box display="flex" justifyContent="flex-end">
        <Button type="submit" color="primary" onClick={handleAdd}>
          Añadir items
        </Button>
      </Box>
    </StyledPaper>
  )
}

export default AddItem
