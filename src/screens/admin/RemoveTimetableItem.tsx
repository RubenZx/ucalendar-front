import React from 'react'
import TimetableItemSelection from '../../components/forms/edit-timetable-item/TimetableItemSelection'
import Title from '../../components/Title'

const RemoveTimetableItem = () => {
  return (
    <>
      <Title
        title="Eliminar items existentes"
        subtitle="Aquí puedes eliminar uno o varios de los items de los horarios de la ESI que hayas creado anteriormente"
      />
      <TimetableItemSelection edit={false} />
    </>
  )
}

export default RemoveTimetableItem
