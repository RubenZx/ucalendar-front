import { Data } from './types'

const initialData: Data = {
  subjects: {
    'subject-1': {
      id: 'subject-1',
      content: {
        title: 'MD',
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
    },
    'subject-2': {
      id: 'subject-2',
      content: {
        title: 'CAL',
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
    },
    'subject-3': {
      id: 'subject-3',
      content: {
        title: 'IP',
        hours: '11:30 a 13:00',
        classRoom: 'B04',
        type: 'teoria',
        dayOfTheWeek: 2,
        groups: [
          {
            group: 'A1',
            weeks: [
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              false,
              true,
            ],
          },
        ],
      },
    },
  },
  columns: {
    'column-0': {
      id: 'column-0',
      title: 'Asignaturas',
      subjectsIds: ['subject-1', 'subject-2', 'subject-3'],
    },
    'column-1': {
      id: 'column-1',
      title: 'Lunes',
      subjectsIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'Martes',
      subjectsIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Miércoles',
      subjectsIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Jueves',
      subjectsIds: [],
    },
    'column-5': {
      id: 'column-5',
      title: 'Viernes',
      subjectsIds: [],
    },
  },
  columnOrder: [
    'column-0',
    'column-1',
    'column-2',
    'column-3',
    'column-4',
    'column-5',
  ],
}

export default initialData
