import AddTimeTableItem from '../screens/admin/AddTimeTableItem'
import EditSelectedItem from '../screens/admin/EditSelectedItem'
import EditTimeTableItem from '../screens/admin/EditTimeTableItem'
import Base from '../screens/Base'
import NewLesson from '../screens/NewLesson'
import Settings from '../screens/Settings'

export interface RouteType {
  Component: React.ReactNode
  name: string
  path: string
}

interface RoutesType {
  baseUrl: RouteType
  newLesson: RouteType
  newTimeTableItem: RouteType
  modifyTimeTableItem: RouteType
  editTimeTableItem: RouteType
  settings: RouteType
}

const routes: RoutesType = {
  baseUrl: {
    Component: Base,
    name: 'Horario',
    path: '/timetable',
  },
  newLesson: {
    Component: NewLesson,
    name: 'Añadir asignatura',
    path: '/timetable/add-lesson',
  },
  newTimeTableItem: {
    Component: AddTimeTableItem,
    name: 'Añadir item',
    path: '/timetable/add-item',
  },
  modifyTimeTableItem: {
    Component: EditTimeTableItem,
    name: 'Modificar item',
    path: '/timetable/edit-item',
  },
  editTimeTableItem: {
    Component: EditSelectedItem,
    name: 'Editar item',
    path: '/timetable/edit-item/:id',
  },
  settings: {
    Component: Settings,
    name: 'Ajustes',
    path: '/settings',
  },
}

export default routes
