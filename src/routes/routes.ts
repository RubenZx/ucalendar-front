import AddTimeTableItem from '../screens/admin/AddTimeTableItem'
import EditSelectedItem from '../screens/admin/EditSelectedItem'
import EditTimeTableItem from '../screens/admin/EditTimeTableItem'
import Base from '../screens/Base'
import NewLesson from '../screens/NewLesson'
import Settings from '../screens/Settings'

export interface RouteType {
  component: React.ReactNode
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
    component: Base,
    name: 'Horario',
    path: '/',
  },
  newTimeTableItem: {
    component: AddTimeTableItem,
    name: 'Añadir item',
    path: '/add-timetable-item',
  },
  modifyTimeTableItem: {
    component: EditTimeTableItem,
    name: 'Modificar item',
    path: '/edit-timetable-item',
  },
  editTimeTableItem: {
    component: EditSelectedItem,
    name: 'Editar item',
    path: '/edit-timetable-item/:id',
  },
  newLesson: {
    component: NewLesson,
    name: 'Añadir asignatura',
    path: '/add-lesson',
  },
  settings: {
    component: Settings,
    name: 'Ajustes',
    path: '/settings',
  },
}

export default routes
