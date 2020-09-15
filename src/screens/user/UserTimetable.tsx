import React from 'react'
import { useParams } from 'react-router-dom'

const UserTimetable = () => {
  const { id } = useParams<{ id: string }>()
  console.log(id)

  return <>ESTAMOS EN EL COMPONENTE DE UNO DE LOS HORARIOS</>
}

export default UserTimetable
