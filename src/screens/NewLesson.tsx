import React from 'react'
import Title from '../components/Title'

const NewLesson = () => {
  return (
    <Title
      title="Añadir nueva asignatura"
      subtitle="Aquí puedes añadir una asignatura a tu horario semanal"
      withButton={true}
      buttonType="back"
    />
  )
}

export default NewLesson
