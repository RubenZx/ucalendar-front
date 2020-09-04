import React from 'react'
import NewTimeTableItem from '../../components/forms/new-timetable-item'
import Title from '../../components/Title'

const AddTimeTableItem = () => {
  return (
    <>
      <Title
        title="Añadir nuevo item"
        subtitle="Aquí puedes crear un nuevo item para los horarios de la ESI"
      />
      <NewTimeTableItem />
    </>
  )
}

export default AddTimeTableItem
