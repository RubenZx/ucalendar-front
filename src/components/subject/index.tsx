import { Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { styled } from '../../theme'
import { Subject as SubjectType } from '../../types/table'
import Groups from './Groups'

const StyledPaper = styled(Paper)`
  background-color: ${(props) => props.color}!important;
  width: 220px;
  padding: 10px;
  margin: 10px;
`

const Subject = ({ subject }: { subject: SubjectType }) => {
  return (
    <StyledPaper elevation={2} variant="outlined" color={subject.color.bgc}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="space-between">
            <Typography>{`${subject.startHour} a ${subject.endHour}`}</Typography>
            <Typography>Aula {subject.classRoom}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Typography style={{ color: subject.color.abrev }}>
              {subject.title}
            </Typography>
          </Grid>
        </Grid>
        <Groups groups={subject.groups} type={subject.type} />
      </Grid>
    </StyledPaper>
  )
}

export default Subject
