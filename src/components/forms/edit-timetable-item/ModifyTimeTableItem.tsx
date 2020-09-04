import { Formik } from 'formik'
import React, { useState } from 'react'
import { isNull } from 'util'
import { Subject, Subject as SubjectType } from '../../../services/types'
import SubjectItems from '../../timetable-item/SubjectItems'
import { StyledForm, StyledPaper } from '../new-timetable-item'
import DegreeSelect from '../new-timetable-item/DegreeSelect'
import SubjectsSelect from '../new-timetable-item/SubjectsSelect'

const initialValues: { degree: string; subject: Subject } = {
  degree: '',
  subject: { id: '', name: '', abrev: '' },
}

const ModifyTimeTableItem = () => {
  const [subjects, setSubjects] = useState<SubjectType[]>()

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values, errors, setFieldValue }) => (
        <StyledPaper>
          <StyledForm>
            <DegreeSelect
              idDegree={values.degree}
              error={errors.degree}
              setFieldValue={setFieldValue}
              setSubjects={setSubjects}
            />
            <SubjectsSelect subjects={subjects} error={errors.subject} />
            {!isNull(values.subject) && values.subject.id !== '' && (
              <SubjectItems subjectId={values.subject.id} />
            )}
          </StyledForm>
        </StyledPaper>
      )}
    </Formik>
  )
}

export default ModifyTimeTableItem
