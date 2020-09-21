import { Box, InputLabel, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getTimetableItems } from '../../services/api'
import { TimetableItemRelations } from '../../services/types'
import { styled } from '../../theme'
import Loader from '../Loader'
import TimetableItem from './index'

const HoverBox = styled(Box)`
  :hover {
    cursor: pointer;
  }
`
const SubjectItems = ({
  subjectId,
  semester,
}: {
  subjectId: string
  semester: boolean
}) => {
  const [items, setItmes] = useState<TimetableItemRelations[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const items = await getTimetableItems(subjectId, semester)
        setItmes(items)
      } catch (error) {
        setItmes([])
      }
      setLoading(false)
    }, 500)
  }, [subjectId, semester])

  return (
    <>
      {loading ? (
        <Loader alignItems="center" />
      ) : items.length > 0 ? (
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
        <Typography variant="subtitle2">
          No se encuentran items disponibles para la asignatura seleccionada...
        </Typography>
      )}
    </>
  )
}

export default SubjectItems
