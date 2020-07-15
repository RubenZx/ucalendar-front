import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Subjects from './subject'
import { Subject as SubjectProps } from './subject/types'

const data = [
  {
    id: '1',
    title: 'MD',
    color: '#ede4f0',
    textColor: '#8e529e',
    hours: '08:30 a 10:00',
    classRoom: 'B04',
    type: 'teoria',
    dayOfTheWeek: 1,
    groups: [
      {
        group: 'A1',
        weeks: [
          true,
          true,
          false,
          true,
          true,
          true,
          false,
          false,
          true,
          true,
          true,
          false,
          false,
          false,
          false,
        ],
      },
      {
        group: 'A2',
        weeks: [
          false,
          false,
          true,
          false,
          false,
          false,
          true,
          true,
          false,
          false,
          false,
          true,
          true,
          true,
          true,
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'CAL',
    color: 'rgb(245, 221, 221)',
    textColor: 'rgb(209, 52, 43)',
    hours: '10:00 a 11:30',
    classRoom: 'B04',
    type: 'teoria',
    dayOfTheWeek: 1,
    groups: [
      {
        group: 'A1',
        weeks: [
          true,
          true,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
        ],
      },
    ],
  },
]

const Calendar = () => {
  const [items, setItems] = useState<SubjectProps[]>(data)

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="subjects-column">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Subjects items={items} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Calendar
