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
}

interface RoutesType {
  baseUrl: RouteType
  newLesson: RouteType
  semester: RouteType
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
  },
  // TODO: edit the following route
  newLesson: {
    Component: NewLesson,
    name: 'Añadir asignatura',
    path: '/timetable/add-lesson',
  },
  newTimetableItem: {
    Component: AddTimetableItem,
    name: 'Añadir item',
    path: '/timetable/add-item',
  },
  modifyTimetableItem: {
    Component: editTimetableItem,
    name: 'Modificar item',
    path: '/timetable/edit-item',
  },
  editTimetableItem: {
    Component: EditSelectedItem,
    name: 'Editar item',
    path: '/timetable/edit-item/:id',
  },
  semester: {
    Component: UserTimetable,
    name: 'Horario',
    path: '/timetable/:id',
  },
  settings: {
    Component: Settings,
    name: 'Ajustes',
    path: '/settings',
  },
}

export default routes
