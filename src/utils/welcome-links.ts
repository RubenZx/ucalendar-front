import Calendar from '../assets/calendar.png'
import Delete from '../assets/delete.svg'
import Edit from '../assets/edit.svg'
import LibraryAdd from '../assets/library-add.svg'

export const userLinks = [
  {
    title: 'Primer semester',
    subTitle: 'Enlace al horario del primer semestre',
    icon: Calendar,
    to: '/timetable/first-semester',
  },
  {
    title: 'Segundo semester',
    subTitle: 'Enlace al horario del segundo semestre',
    icon: Calendar,
    to: '/timetable/second-semester',
  },
]

export const adminLinks = [
  {
    title: 'Crear un nuevo item',
    subTitle: 'Enlace para crear un nuevo item de horario',
    icon: LibraryAdd,
    to: '/timetable/add-item',
  },
  {
    title: 'Editar un item',
    subTitle: 'Enlace para editar un item ya existente',
    icon: Edit,
    to: '/timetable/edit-item',
  },
  {
    title: 'Eliminar un item',
    subTitle: 'Enlace para eliminar un item ya existente',
    icon: Delete,
    to: '/timetable/remove-item',
  },
]
