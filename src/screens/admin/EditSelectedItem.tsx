import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import EditItem from '../../components/forms/edit-timetable-item/EditItem'
import Title from '../../components/Title'
import routes from '../../routes/routes'
import { getAll } from '../../services/api'
import { Generic, TimetableItemRelations } from '../../services/types'

const EditSelectedItem = () => {
  const history = useHistory<TimetableItemRelations>()
  const item = history.location.state
  const subjectName = item.subject.name.toLowerCase()
  const [degree, setDegree] = useState<Generic>()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getAll(`subjects/${item.subjectId}`)
        setDegree(res.degrees[0].degree)
      } catch (error) {}
    })()
  }, [item.subjectId])

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
            <EditItem degree={degree} {...item} />
          </>
        )
      ) : (
        <Redirect to={routes.modifyTimeTableItem.path} />
      )}
    </>
  )
}

export default EditSelectedItem
