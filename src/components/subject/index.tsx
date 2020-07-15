import { Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Groups from './Groups'
import { Subject as SubjectProps } from './types'

const StyledPaper = styled(Paper)`
  background-color: ${(props) => props.color}!important;
  width: 220px;
  padding: 10px;
`

const Subject = ({
  id,
  index,
  title,
  color,
  textColor,
  classRoom,
  hours,
  groups,
  type,
}: SubjectProps & { index: any }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <StyledPaper elevation={2} variant="outlined" color={color}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>
                <Grid container justify="space-between">
                  <Typography>{hours}</Typography>
                  <Typography>Aula {classRoom}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ color: textColor }}>{title}</Typography>
              </Grid>
              <Groups groups={groups} type={type} />
            </Grid>
          </StyledPaper>
        </div>
      )}
    </Draggable>
  )
}

const Subjects = ({ items }: { items: SubjectProps[] }) => (
  <>
    {items.map((item, index) => (
      <div key={index}>
        <Subject {...item} index={index} />
      </div>
    ))}
  </>
)

export default Subjects
