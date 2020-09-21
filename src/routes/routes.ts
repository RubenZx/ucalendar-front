import AddTimetableItem from '../screens/admin/AddTimetableItem'
import EditSelectedItem from '../screens/admin/EditSelectedItem'
import editTimetableItem from '../screens/admin/EditTimetableItem'
import Base from '../screens/Base'
import NewLesson from '../screens/NewLesson'
import Settings from '../screens/Settings'
import UserTimetable from '../screens/user/UserTimetable'

export interface RouteType {
  Component: React.ReactNode
  name: string
  path: string
  roles: string[]
}

interface RoutesType {
  baseUrl: RouteType
  firstNewLesson: RouteType
  secondNewLesson: RouteType
  firstSemester: RouteType
  secondSemester: RouteType
  newTimetableItem: RouteType
  modifyTimetableItem: RouteType
  editTimetableItem: RouteType
  settings: RouteType
}

const routes: RoutesType = {
  baseUrl: {
    Component: Base,
    name: 'Horario',
    path: '/',
    roles: ['ALL'],
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
  settings: {
    Component: Settings,
    name: 'Ajustes',
    path: '/settings',
    roles: ['ALL'],
  },
}

export default routes
