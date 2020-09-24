import DateFnsUtils from '@date-io/date-fns'
import { Box, Button, InputLabel, Paper } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { format } from 'date-fns'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { useAuth } from '../../../context/auth'
import routes from '../../../routes/routes'
import { createTimetableItem, getAll } from '../../../services/api'
import { Generic, Subject } from '../../../services/types'
import { styled } from '../../../theme'
import Toast from '../../Toast'
import CheckWeeks from './CheckWeeks'
import ColorPicker from './ColorPicker'
import DegreeSelect from './DegreeSelect'
import GroupsSelect from './GroupsSelect'
import HoursPicker from './HoursPicker'
import NormalSelect from './NormalSelect'
import SemesterSelect from './SemesterSelect'
import SubjectsSelect from './SubjectsSelect'

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`

export const StyledPaper = styled(Paper)`
  padding: 30px;
  width: inherit;
`

export const types = [
  'Clases de teoría',
  'Clases de problemas',
  'Prácticas de laboratorio',
  'Prácticas informáticas',
]

export const timetableItemValidationSchema = yup.object().shape({
  degree: yup.string().required('Por favor, elija un grado'),
  dayOfTheWeek: yup.string().required('Por favor, elija un día de la semana'),
  subject: yup.string().required('Por favor, elija una asignatura').nullable(),
  group: yup.string().required('Por favor, elija un grupo').nullable(),
  classRoom: yup.string().required('Por favor, elija un aula'),
  startHour: yup.date().required('Por favor, introduzca una hora de inicio'),
  semester: yup.boolean().required(),
  endHour: yup
    .date()
    .required('Por favor, introduzca una hora de fin')
    .when('startHour', (eventStartDate: any, schema: any) =>
      schema.min(
        eventStartDate,
        'La hora de fin ha de ser mayor a la de inicio',
      ),
    ),
  weeks: yup.array(),
  type: yup.string().required('Por favor, introduzca el tipo de clase'),
  colorAbrev: yup.string().required('Por favor, seleccione un color'),
})

interface SubmitFormData {
  classRoomId: number
  colorAbrev: string
  colorBg: string
  dayOfTheWeek: number
  endHour: string
  groupId: number
  semester: boolean
  startHour: string
  type: string
  weeks: boolean[]
}

const initialValues = {
  degree: '',
  semester: true,
  subject: { id: '' },
  classRoom: '',
  group: null,
  dayOfTheWeek: '',
  type: '',
  startHour: new Date(),
  endHour: new Date(),
  weeks: Array(15).fill(false),
  colorAbrev: '',
  colorBg: '',
}

const NewTimetableItem = () => {
  const [subjects, setSubjects] = useState<Subject[]>()
  const [classRooms, setClassRooms] = useState<Generic[]>()
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState<string>('')

  const history = useHistory()
  const { userToken } = useAuth()

  useEffect(() => {
    ;(async () => {
      const classRooms = await getAll('class-rooms/')
      setClassRooms(classRooms)
    })()
  }, [])

  const handleSubmit = (data: SubmitFormData, subjectId: string) => {
    if (userToken) {
      ;(async () => {
        try {
          await createTimetableItem(data, subjectId, userToken)
          setSnackOpen(true)
        } catch (e) {
          setSnackMessage(e.response.data.message)
          setSnackOpen(true)
        }
      })()
    }
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={timetableItemValidationSchema}
        onSubmit={(values) => {
          if (classRooms) {
            const data = {
              classRoomId: +classRooms[+values.classRoom].id,
              // @ts-ignore
              groupId: values.group.id,
              dayOfTheWeek: +values.dayOfTheWeek,
              colorAbrev: values.colorAbrev,
              colorBg: values.colorBg,
              semester: values.semester,
              startHour: format(values.startHour, 'HH:mm'),
              endHour: format(values.endHour, 'HH:mm'),
              weeks: values.weeks,
              type: types[+values.type],
            }
            handleSubmit(data, values.subject.id)
          }
        }}
      >
        {({ values, errors, setFieldValue, isSubmitting, submitForm }) => (
          <StyledPaper>
            <StyledForm>
              {/* DEGREE FIELD */}
              <Box display="flex">
                <DegreeSelect
                  error={errors.degree}
                  idDegree={values.degree}
                  semester={values.semester}
                  setSubjects={setSubjects}
                  setFieldValue={setFieldValue}
                />
                <Box m={1} />
                <SemesterSelect value={values.semester} />
              </Box>
              {/* SUBJECT AND GROUPS */}
              <SubjectsSelect subjects={subjects} error={errors.subject} />
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
              {/* DAY OF THE WEEK AND CLASS TYPE */}
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
                  error={errors.colorAbrev}
                  disabled={isSubmitting}
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
                  Crear
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
        status={snackMessage === '' ? 'success' : 'error'}
        successMessage="Item creado con éxito..."
        errorMessage={snackMessage + '...'}
      />
    </MuiPickersUtilsProvider>
  )
}

export default NewTimetableItem
