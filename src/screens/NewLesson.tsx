import React from 'react'
import Title from '../components/Title'
import routes from '../routes/routes'

const NewLesson = () => {
  return (
    <Title
      title="Añadir nueva asignatura"
      subtitle="Aquí puedes añadir una asignatura a tu horario semanal"
      withButton={true}
      buttonType="back"
      to={routes.baseUrl.path}
    />
  )
}

export default NewLesson
