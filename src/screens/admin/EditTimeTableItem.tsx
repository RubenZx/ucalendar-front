import React from 'react'
import ModifyTimeTableItem from '../../components/forms/edit-timetable-item/ModifyTimeTableItem'
import Title from '../../components/Title'

const EditTimetableItem = () => {
  return (
    <>
      <Title
        title="Editar un item existente"
        subtitle="Aquí puedes editar uno de los items de los horarios de la ESI que hayas creado con anterioridad"
      />
      <ModifyTimeTableItem />
    </>
  )
}

export default EditTimetableItem
