import React from 'react'
import TimetableItemSelection from '../../components/forms/edit-timetable-item/TimetableItemSelection'
import Title from '../../components/Title'

const editTimetableItem = () => {
  return (
    <>
      <Title
        title="Editar un item existente"
        subtitle="Aquí puedes editar uno de los items de los horarios de la ESI que hayas creado con anterioridad"
      />
      <TimetableItemSelection edit />
    </>
  )
}

export default editTimetableItem
