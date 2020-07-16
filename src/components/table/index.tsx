import { Divider, Grid, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Column from './Column'
import initialData from './data'

const Table = () => {
  const [data, setData] = useState(initialData)

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return
    }

    const start = data.columns[source.droppableId]
    const finish = data.columns[destination.droppableId]
    if (start === finish) {
      const newSubjectsIds = Array.from(start.subjectsIds)
      newSubjectsIds.splice(source.index, 1)
      newSubjectsIds.splice(destination.index, 0, draggableId)

      setData({
        ...data,
        columns: {
          ...data.columns,
          [start.id]: {
            ...start,
            subjectsIds: newSubjectsIds,
          },
        },
      })
    } else {
      const startSubjectsIds = Array.from(start.subjectsIds)
      startSubjectsIds.splice(source.index, 1)

      const finishSubjectsIds = Array.from(finish.subjectsIds)
      finishSubjectsIds.splice(destination.index, 0, draggableId)

      setData({
        ...data,
        columns: {
          ...data.columns,
          [start.id]: {
            ...start,
            subjectsIds: startSubjectsIds,
          },
          [finish.id]: {
            ...finish,
            subjectsIds: finishSubjectsIds,
          },
        },
      })
    }
  }

  return (
    <Paper elevation={2} style={{ margin: '8px', padding: '8px' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container justify="space-around">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const subjects = column.subjectsIds.map(
              (subjectId) => data.subjects[subjectId],
            )
            return (
              <Grid
                key={column.id}
                item
                style={{ display: 'flex', flexGrow: 1 }}
              >
                <Column column={column} subjects={subjects} />
                {column.id === 'column-0' && <Divider orientation="vertical" />}
              </Grid>
            )
          })}
        </Grid>
      </DragDropContext>
    </Paper>
  )
}

export default Table
