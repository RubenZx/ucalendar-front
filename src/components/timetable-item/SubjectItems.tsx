import { Box, CircularProgress, InputLabel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getTimetableItems } from '../../services/api'
import { TimetableItemRelations } from '../../services/types'
import { styled } from '../../theme'
import TimetableItem from './index'

const HoverBox = styled(Box)`
  :hover {
    cursor: pointer;
  }
`
const SubjectItems = ({ subjectId }: { subjectId: string }) => {
  const [items, setItmes] = useState<TimetableItemRelations[]>()
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      try {
        const items = await getTimetableItems({ id: subjectId })
        setItmes(items)
      } catch (error) {
        setItmes([])
      }
      setLoading(false)
    })()
  }, [subjectId])

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : items && items.length > 0 ? (
        <>
          <InputLabel style={{ marginBottom: '5px' }}>
            Haga click en el item a editar
          </InputLabel>
          <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
            {items.map((item, idk) => (
              <HoverBox
                key={idk}
                onClick={() =>
                  history.push(history.location.pathname + '/' + item.id, item)
                }
              >
                <TimetableItem timetableItem={item} />
              </HoverBox>
            ))}
          </Box>
        </>
      ) : (
        <Box display="flex" justifyContent="center">
          NOT FOUND
        </Box>
      )}
    </>
  )
}

export default SubjectItems
