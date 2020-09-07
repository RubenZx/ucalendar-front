import DateFnsUtils from '@date-io/date-fns'
import { Box, Button, InputLabel } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import format from 'date-fns/format'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import routes from '../../../routes/routes'
import { getAll, updateTimeTableItem } from '../../../services/api'
import { Generic, TimetableItemRelations } from '../../../services/types'
import Loader from '../../Loader'
import Toast from '../../Toast'
import {
  StyledForm,
  StyledPaper,
  timetableItemValidationSchema,
  types,
} from '../new-timetable-item'
import CheckWeeks from '../new-timetable-item/CheckWeeks'
import ColorPicker from '../new-timetable-item/ColorPicker'
import GroupsSelect from '../new-timetable-item/GroupsSelect'
import HoursPicker from '../new-timetable-item/HoursPicker'
import NormalSelect from '../new-timetable-item/NormalSelect'

const EditItem = (
  props: TimetableItemRelations & { degree: Generic | undefined },
) => {
  const [classRooms, setClassRooms] = useState<Generic[]>()
  const [selectedClass, setSelectedClass] = useState<number>()
  const [snackOpen, setSnackOpen] = useState<boolean>(false)
  const [snackMessage, setSnackMessage] = useState<string>('')

  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      const res = await getAll('class-rooms/')
      setClassRooms(res)
      const index = res.findIndex(
        (value: Generic) => props.classRoomId === +value.id,
      )
      setSelectedClass(index)
    })()
  }, [props.classRoomId])

  const start = new Date()
  start.setHours(+props.startHour.slice(0, 2))
  start.setMinutes(+props.startHour.slice(3))

  const end = new Date()
  end.setHours(+props.endHour.slice(0, 2))
  end.setMinutes(+props.endHour.slice(3))

  return selectedClass !== undefined ? (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={{
          degree: props.degree,
          subject: props.subject,
          classRoom: selectedClass,
          group: props.group,
          dayOfTheWeek: props.dayOfTheWeek,
          type: types.findIndex((value) => value === props.type),
          startHour: start,
          endHour: end,
          weeks: props.weeks,
          colorAbrev: props.colorAbrev,
          colorBg: props.colorBg,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          if (classRooms) {
            ;(async () => {
              try {
                await updateTimeTableItem(
                  {
                    classRoomId: +classRooms[values.classRoom].id,
                    groupId: +values.group.id,
                    colorBg: values.colorBg,
                    colorAbrev: values.colorAbrev,
                    dayOfTheWeek: values.dayOfTheWeek,
                    startHour: format(values.startHour, 'HH:mm'),
                    endHour: format(values.endHour, 'HH:mm'),
                    type: types[values.type],
                    weeks: values.weeks,
                  },
                  props.id,
                )
                setSnackOpen(true)
              } catch (e) {
                setSnackMessage(e.response.data.message)
                setSnackOpen(true)
              }
            })()
          }
        }}
        validationSchema={timetableItemValidationSchema}
      >
        {({ submitForm, isSubmitting, errors, values, setFieldValue }) => (
          <StyledPaper>
            <StyledForm>
              {/* CLASSROOM AND GROUP SELECTION */}
              <Box
                display="flex"
                alignItems="center"
                flexGrow={1}
                marginBottom="20px"
              >
                <NormalSelect
                  error={errors.classRoom}
                  label="Seleccione un aula"
                  name="classRoom"
                  opts={classRooms?.map((c) => c.name)}
                />
                <Box m={2} />
                <GroupsSelect error={errors.group} disabled={isSubmitting} />
              </Box>

              {/* DAYOFTHEWEEK AND TYPE OF CLASS SELECTS */}
              <Box display="flex" flexGrow={1} marginBottom="20px">
                <NormalSelect
                  error={errors.dayOfTheWeek}
                  label="Elija un día de la semana"
                  name="dayOfTheWeek"
                  opts={['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']}
                />
                <Box m={2} />
                <NormalSelect
                  error={errors.type}
                  label="Elija el tipo de la clase"
                  name="type"
                  opts={types}
                />
              </Box>

              {/* START HOUR AND END HOUR */}
              <InputLabel>
                Elija las horas de inicio y fin de la clase
              </InputLabel>
              <Box m={1} />
              <Box display="flex" marginBottom="20px">
                <HoursPicker
                  value={values.startHour}
                  name="startHour"
                  label="Hora de inicio"
                />
                <Box m={2} />
                <HoursPicker
                  value={values.endHour}
                  name="endHour"
                  label="Hora de fin"
                />
              </Box>

              {/* CHECKBOXES FOR WEEKS SELECTION */}
              <Box m={2} />
              <Box display="flex">
                <CheckWeeks
                  weeks={values.weeks}
                  setFieldValue={setFieldValue}
                  disabled={isSubmitting}
                />
                <ColorPicker
                  setFieldValue={setFieldValue}
                  colorAbrev={values.colorAbrev}
                  error={errors.colorAbrev}
                />
              </Box>

              {/* SUBMIT BUTTON */}
              <Box
                display="flex"
                justifyContent="flex-end"
                style={{ paddingTop: '5px' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Actualizar item
                </Button>
              </Box>
            </StyledForm>
          </StyledPaper>
        )}
      </Formik>
      <Toast
        open={snackOpen}
        onClose={() => {
          setSnackOpen(false)
          history.push(routes.baseUrl.path)
        }}
        successMessage="Item actualizado con éxito, redirigiendo..."
        errorMessage={snackMessage + ', redirigiendo...'}
        status={snackMessage === '' ? 'success' : 'error'}
      />
    </MuiPickersUtilsProvider>
  ) : (
    <Loader alignItems="center" justifyContent="center" flexGrow={1} />
  )
}

export default EditItem
