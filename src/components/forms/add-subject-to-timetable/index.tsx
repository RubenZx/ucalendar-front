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
`

const subjects: SubjectType[] = [
  {
    abrev: 'OGE',
    id: '21714001',
    name: 'ORGANIZACIÓN Y GESTIÓN DE EMPRESAS',
  },
  {
    abrev: 'EST',
    id: '21714002',
    name: 'ESTADÍSTICA',
  },
  {
    abrev: 'FFE',
    id: '21714003',
    name: 'FUNDAMENTOS FÍSICOS Y ELECTRÓNICOS DE LA INFORMÁTICA',
  },
  {
    abrev: 'FEC',
    id: '21714004',
    name: 'FUNDAMENTOS DE ESTRUCTURA DE COMPUTADORES',
  },
  {
    abrev: 'IG',
    id: '21714005',
    name: 'INFORMÁTICA GENERAL',
  },
]

const AddItem = () => {
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

  useEffect(() => {
    ;(async () => {
      if (selectedId !== 0) {
        try {
          const items = await getTimetableItems(selectedId.toString())
          setItems(items)
          setCheckedItem(Array(items.length).fill(false))
        } catch (error) {
          setItems([])
          setCheckedItem([])
        }
      }
    })()
  }, [selectedId])

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
              <HoverableBox key={idk} onClick={() => handleSelect(idk)}>
                <TimetableItem timetableItem={item} border={checkedItem[idk]} />
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
        <Button type="submit" color="primary">
          Añadir items
        </Button>
      </Box>
    </StyledPaper>
  )
}

export default AddItem
