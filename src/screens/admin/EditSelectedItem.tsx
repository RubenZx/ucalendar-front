import React, { useEffect, useState } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import EditItemById from '../../components/forms/edit-timetable-item'
import Loader from '../../components/Loader'
import Title from '../../components/Title'
import { useAuth } from '../../context/auth'
import routes from '../../routes/routes'
import { getTimetableItemById } from '../../services/api'
import { TimetableItemRelations } from '../../services/types'

const EditSelectedItem = () => {
  const { location } = useHistory<TimetableItemRelations>()
  const [item, setItem] = useState<TimetableItemRelations>(location.state)
  const [isLoading, setIsLoading] = useState(!item ? true : false)

  const { userToken } = useAuth()
  const { id } = useParams<{ id: string }>()
  useEffect(() => {
    if (userToken && !item) {
      ;(async () => {
        try {
          const res = await getTimetableItemById(+id, userToken)
          setItem(res)
        } catch (e) {}
        setIsLoading(false)
      })()
    }
  }, [userToken, id, item])

  return (
    <>
      {isLoading ? (
        <Loader
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
          height="50vh"
        />
      ) : item ? (
        <>
          <Title
            title={`Editando el item ${id} de ${
              item.subject.name[0].toUpperCase() + item.subject.name.slice(1)
            }`}
            subtitle="Aquí puedes editar los campos del item seleccionado anteriormente"
          />
          <EditItemById {...item} />
        </>
      ) : (
        <Redirect to={routes.modifyTimetableItem.path} />
      )}
    </>
  )
}

export default EditSelectedItem
