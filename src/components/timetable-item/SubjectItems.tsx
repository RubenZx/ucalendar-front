import { Box, InputLabel, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { TimetableItemRelations } from '../../services/types'
import { styled } from '../../theme'
import TimetableItem from './index'

const HoverBox = styled(Box)`
  :hover {
    cursor: pointer;
  }
`

interface SubjectItemsProps {
  items: TimetableItemRelations[]
  semester: boolean
}

const SubjectItems = ({ items, semester }: SubjectItemsProps) => {
  const history = useHistory()
  return (
    <>
      {items.length > 0 ? (
        <>
          <InputLabel style={{ marginBottom: '5px' }}>
            Haga click en el item a editar
          </InputLabel>
          <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
            {items.map(
              (item, idk) =>
                item.semester === semester && (
                  <HoverBox
                    key={idk}
                    onClick={() =>
                      history.push(
                        history.location.pathname + '/' + item.id,
                        item,
                      )
                    }
                  >
                    <TimetableItem timetableItem={item} />
                  </HoverBox>
                ),
            )}
          </Box>
        </>
      ) : (
        <Typography style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>
          No hay items disponibles para la asignatura seleccionada...
        </Typography>
      )}
    </>
  )
}

export default SubjectItems
