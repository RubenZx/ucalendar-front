import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useReducer } from 'react'
import { TimetableItemRelations } from '../services/types'
import { styled } from '../theme'
import { StyledPaper } from './forms/new-timetable-item'
import TimetableItem from './timetable-item'

const StyledBox = styled(Box)`
  margin: 0px 10px;
`

interface ItemsByDay {
  Lunes: TimetableItemRelations[]
  Martes: TimetableItemRelations[]
  Miércoles: TimetableItemRelations[]
  Jueves: TimetableItemRelations[]
  Viernes: TimetableItemRelations[]
}

const initialState: ItemsByDay = {
  Lunes: [],
  Martes: [],
  Miércoles: [],
  Jueves: [],
  Viernes: [],
}

function myReducer(
  state: { items: ItemsByDay },
  action: { type: number; payload: TimetableItemRelations },
) {
  switch (action.type) {
    case 0:
      return {
        items: {
          ...state.items,
          Lunes: [...state.items.Lunes, action.payload],
        },
      }
    case 1:
      return {
        items: {
          ...state.items,
          Martes: [...state.items.Martes, action.payload],
        },
      }
    case 2:
      return {
        items: {
          ...state.items,
          Miércoles: [...state.items.Miércoles, action.payload],
        },
      }
    case 3:
      return {
        items: {
          ...state.items,
          Jueves: [...state.items.Jueves, action.payload],
        },
      }
    case 4:
      return {
        items: {
          ...state.items,
          Viernes: [...state.items.Viernes, action.payload],
        },
      }
    default:
      return {
        items: {
          ...state.items,
        },
      }
  }
}

function Timetable({ items }: { items: TimetableItemRelations[] }) {
  const [itemsByDay, dispatch] = useReducer(myReducer, { items: initialState })

  useEffect(() => {
    if (items) {
      items.forEach((timeTableItem) => {
        dispatch({ type: timeTableItem.dayOfTheWeek, payload: timeTableItem })
      })
    }
  }, [items])

  return (
    <StyledPaper elevation={2}>
      <Box display="flex">
        {items.length < 1 ? (
          <Box
            display="flex"
            flexGrow={1}
            minHeight="200pt"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h6">
              Por favor, añada asignaturas a su horario
            </Typography>
          </Box>
        ) : (
          <>
            {Object.entries(itemsByDay.items).map(
              ([day, items]: [string, TimetableItemRelations[]]) => (
                <StyledBox
                  key={day}
                  width="100%"
                  display="flex"
                  flexGrow={1}
                  justifyContent="flex-start"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography variant="h6">{day}</Typography>
                  {items.map((item, key) => (
                    <TimetableItem key={key} timetableItem={item} />
                  ))}
                </StyledBox>
              ),
            )}
          </>
        )}
      </Box>
    </StyledPaper>
  )
}

export default Timetable
