import { Box, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { styled } from '../../theme'
import { Subject as SubjectType } from '../../types/table'
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

const Subject = ({ subject }: { subject: SubjectType }) => {
  return (
    <StyledPaper elevation={2} variant="outlined" color={subject.color.bgc}>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        {/* Hour and classroom */}
        <Box display="flex" justifyContent="space-between">
          <Typography>{`${subject.startHour} a ${subject.endHour}`}</Typography>
          <Typography>Aula {subject.classRoom}</Typography>
        </Box>
        {/* Abrev. of the subject */}
        <Box display="flex" justifyContent="center">
          <StyledTypography abrevcolor={subject.color.abrev}>
            {subject.abrev}
          </StyledTypography>
        </Box>
        {/* Groups with weeks */}
        <Groups groups={subject.groups} type={subject.type} />
      </Box>
    </StyledPaper>
  )
}

export default Subject
