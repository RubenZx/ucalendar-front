import AddTimetableItem from '../screens/admin/AddTimetableItem'
import EditSelectedItem from '../screens/admin/EditSelectedItem'
import editTimetableItem from '../screens/admin/EditTimeTableItem'
import RemoveTimetableItem from '../screens/admin/RemoveTimetableItem'
import Base from '../screens/Base'
import Messages from '../screens/Messages'
import NewLesson from '../screens/NewLesson'
import UserTimetable from '../screens/user/UserTimetable'

export interface RouteType {
  Component: React.ReactNode
  name: string
  path: string
  roles: string[]
}

interface RoutesType {
  baseUrl: RouteType
  messages: RouteType
  firstNewLesson: RouteType
  secondNewLesson: RouteType
  firstSemester: RouteType
  secondSemester: RouteType
  newTimetableItem: RouteType
  modifyTimetableItem: RouteType
  editTimetableItem: RouteType
  removeTimetableItem: RouteType
}

const routes: RoutesType = {
  baseUrl: {
    Component: Base,
    name: 'Horario',
    path: '/',
    roles: ['ALL'],
  },
  messages: {
    Component: Messages,
    name: 'Mensajes',
    path: '/messages',
    roles: ['ADMINISTRATOR', 'PROFESSOR'],
  },
  newTimetableItem: {
    Component: AddTimetableItem,
    name: 'Añadir item',
    path: '/timetable/add-item',
    roles: ['ADMINISTRATOR'],
  },
  modifyTimetableItem: {
    Component: editTimetableItem,
    name: 'Modificar item',
    path: '/timetable/edit-item',
    roles: ['ADMINISTRATOR'],
  },
  editTimetableItem: {
    Component: EditSelectedItem,
    name: 'Editar item',
    path: '/timetable/edit-item/:id',
    roles: ['ADMINISTRATOR'],
  },
  removeTimetableItem: {
    Component: RemoveTimetableItem,
    name: 'Eliminar item',
    path: '/timetable/remove-item',
    roles: ['ADMINISTRATOR'],
  },
  firstSemester: {
    Component: UserTimetable,
    name: 'Horario',
    path: '/timetable/first-semester',
    roles: ['ALUMN', 'PROFESSOR'],
  },
  secondSemester: {
    Component: UserTimetable,
    name: 'Horario',
    path: '/timetable/second-semester',
    roles: ['ALUMN', 'PROFESSOR'],
  },
  firstNewLesson: {
    Component: NewLesson,
    name: 'Añadir asignatura',
    path: '/timetable/first-semester/add-lesson',
    roles: ['ALUMN', 'PROFESSOR'],
  },
  secondNewLesson: {
    Component: NewLesson,
    name: 'Añadir asignatura',
    path: '/timetable/second-semester/add-lesson',
    roles: ['ALUMN', 'PROFESSOR'],
  },
}

export default routes
