import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import EditItemById from '../../components/forms/edit-timetable-item'
import Title from '../../components/Title'
import { useAuth } from '../../context/auth'
import routes from '../../routes/routes'
import { getAll } from '../../services/api'
import { Generic, TimetableItemRelations } from '../../services/types'

const EditSelectedItem = () => {
  const history = useHistory<TimetableItemRelations>()
  const item = history.location.state
  const subjectName = item.subject.name.toLowerCase()
  const [degree, setDegree] = useState<Generic>()

  const { userToken } = useAuth()

  const subjectId = item.subjectId
  useEffect(() => {
    if (userToken) {
      ;(async () => {
        try {
          const res = await getAll(`subjects/${subjectId}`, userToken)
          setDegree(res.degrees[0].degree)
        } catch (error) {}
      })()
    }
  }, [subjectId, userToken])

  return (
    <>
      {item ? (
        degree && (
          <>
            <Title
              title={`Editando el item ${item.id} de ${
                subjectName[0].toUpperCase() + subjectName.slice(1)
              }, ${degree?.name}`}
              subtitle="Aquí puedes editar los campos del item seleccionado anteriormente"
            />
            <EditItemById degree={degree} {...item} />
          </>
        )
      ) : (
        <Redirect to={routes.modifyTimetableItem.path} />
      )}
    </>
  )
}

export default EditSelectedItem
