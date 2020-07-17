import NewLesson from '../screens/NewLesson'
import Settings from '../screens/Settings'
import Timetable from '../screens/Timetable'

export interface RouteType {
  component: React.ReactNode
  name: string
  path: string
}

interface RoutesType {
  baseUrl: RouteType
  newLesson: RouteType
  settings: RouteType
}

const routes: RoutesType = {
  baseUrl: {
    component: Timetable,
    name: 'Horario',
    path: '/',
  },
  newLesson: {
    component: NewLesson,
    name: 'Añadir asignatura',
    path: '/newlesson',
  },
  settings: {
    component: Settings,
    name: 'Ajustes',
    path: '/settings',
  },
}

export default routes
