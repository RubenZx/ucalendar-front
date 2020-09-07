import React from 'react'
import NewTimetableItem from '../../components/forms/new-timetable-item'
import Title from '../../components/Title'

const AddTimetableItem = () => {
  return (
    <>
      <Title
        title="Añadir nuevo item"
        subtitle="Aquí puedes crear un nuevo item para los horarios de la ESI"
      />
      <NewTimetableItem />
    </>
  )
}

export default AddTimetableItem
