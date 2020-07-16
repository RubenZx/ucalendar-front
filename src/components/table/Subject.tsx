import { Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { subjectAbrevColor, subjectBgColor } from '../../utils/colors'
import Groups from './Groups'
import { SubjectContent } from './types'

const StyledPaper = styled(Paper)<{
  isdragging: string
  draggedcolor: string
}>`
  background-color: ${(props) => props.color}!important;
  border-color: ${({ isdragging, draggedcolor }) =>
    isdragging === 'true' ? draggedcolor : undefined}!important;
  width: 220px;
  padding: 10px;
  margin: 10px;
`

const Subject = ({
  subject,
  subjectId,
  index,
}: {
  subject: SubjectContent
  subjectId: string
  index: number
}) => {
  return (
    <Draggable draggableId={subjectId} index={index}>
      {(provided, snapshot) => (
        <StyledPaper
          elevation={2}
          variant="outlined"
          color={subjectBgColor(subject.title)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={snapshot.isDragging.toString()}
          draggedcolor={subjectAbrevColor(subject.title)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="space-between">
                <Typography>{`${subject.startHour} a ${subject.endHour}`}</Typography>
                <Typography>Aula {subject.classRoom}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Typography style={{ color: subjectAbrevColor(subject.title) }}>
                  {subject.title}
                </Typography>
              </Grid>
            </Grid>
            <Groups groups={subject.groups} type={subject.type} />
          </Grid>
        </StyledPaper>
      )}
    </Draggable>
  )
}

export default Subject
