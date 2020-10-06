import { Box, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { TimetableItemRelations } from '../../services/types'
import { styled } from '../../theme'
import Groups from './Groups'

const StyledPaper = styled(Paper)<{ border?: string; bordercolor?: string }>`
  background-color: ${({ color }) => color}!important;
  border: ${({ border, bordercolor }) =>
    bordercolor ? 'solid' : border === 'true' && 'solid'}!important;
  border-color: ${({ border, bordercolor, theme }) =>
    bordercolor
      ? bordercolor
      : border === 'true' && theme.palette.primary.main}!important;
  width: 100%;
  padding: 10px;
  margin: 10px;
`

const StyledTypography = styled(Typography)<{ abrevcolor: string }>`
  color: ${({ abrevcolor }) => abrevcolor};
  margin: 20px 0px;
`

const dayToLetter: { [key: number]: string } = {
  0: 'L',
  1: 'M',
  2: 'X',
  3: 'J',
  4: 'V',
}

const TimetableItem = ({
  border,
  borderColor,
  showDay = false,
  timetableItem,
}: {
  border?: boolean
  showDay?: boolean
  borderColor?: string
  timetableItem: TimetableItemRelations
}) => {
  return (
    <StyledPaper
      elevation={2}
      border={border ? 'true' : 'false'}
      variant="outlined"
      color={borderColor ? '#d8d8d8' : timetableItem.colorBg}
      bordercolor={borderColor}
      style={{ width: '260px' }}
    >
      <Box display="flex" flexDirection="column" flexGrow={1}>
        {/* Hour and classroom */}
        <Box display="flex" justifyContent="space-between">
          <Typography>
            {showDay && `${dayToLetter[timetableItem.dayOfTheWeek]} - `}
            {`${timetableItem.startHour} a ${timetableItem.endHour}`}
          </Typography>
          <Typography>Aula {timetableItem.classRoom.name}</Typography>
        </Box>
        {/* Abrev. of the subject */}
        <Box display="flex" justifyContent="center">
          <StyledTypography
            abrevcolor={borderColor ? '#828282' : timetableItem.colorAbrev}
          >
            {timetableItem.subject.abrev}
          </StyledTypography>
        </Box>
        {/* Groups with weeks */}
        <Groups
          group={timetableItem.group.name}
          type={timetableItem.type}
          weeks={timetableItem.weeks}
        />
      </Box>
    </StyledPaper>
  )
}

export default TimetableItem
