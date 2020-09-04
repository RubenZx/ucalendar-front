import { Box, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { TimetableItemRelations } from '../../services/types'
import { styled } from '../../theme'
import Groups from './Groups'

const StyledPaper = styled(Paper)`
  background-color: ${(props) => props.color}!important;
  width: 100%;
  padding: 10px;
  margin: 10px;
`

const StyledTypography = styled(Typography)<{ abrevcolor: string }>`
  color: ${({ abrevcolor }) => abrevcolor};
  margin: 20px 0px;
`
const TimetableItem = (props: TimetableItemRelations) => {
  return (
    <StyledPaper
      elevation={2}
      variant="outlined"
      color={props.colorBg}
      style={{ width: '260px' }}
    >
      <Box display="flex" flexDirection="column" flexGrow={1}>
        {/* Hour and classroom */}
        <Box display="flex" justifyContent="space-between">
          <Typography>{`${props.startHour} a ${props.endHour}`}</Typography>
          <Typography>Aula {props.classRoom.name}</Typography>
        </Box>
        {/* Abrev. of the subject */}
        <Box display="flex" justifyContent="center">
          <StyledTypography abrevcolor={props.colorAbrev}>
            {props.subject.abrev}
          </StyledTypography>
        </Box>
        {/* Groups with weeks */}
        <Groups
          group={props.group.name}
          type={props.type}
          weeks={props.weeks}
        />
      </Box>
    </StyledPaper>
  )
}

export default TimetableItem
