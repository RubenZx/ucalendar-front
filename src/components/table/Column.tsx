import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Subject from './Subject'
import { Column as ColumnType, Subject as SubjectType } from './types'

const SubjectList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? '#f0f0f0' : 'inherit'};
  flex-grow: 1;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Column = ({
  column,
  subjects,
}: {
  column: ColumnType
  subjects: SubjectType[]
}) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      style={{ width: '280px' }}
    >
      <Typography variant="h5" align="center" style={{ padding: '8px' }}>
        {column.title}
      </Typography>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <SubjectList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {subjects.map((subject, idk) => (
              <Subject
                key={subject.id}
                index={idk}
                subjectId={subject.id}
                subject={subject.content}
              />
            ))}
            {provided.placeholder}
          </SubjectList>
        )}
      </Droppable>
    </Grid>
  )
}

export default Column
