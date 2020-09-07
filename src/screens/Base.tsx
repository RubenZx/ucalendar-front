import React, { useState } from 'react'
import AdminTimetable from './admin/AdminTimetable'
import Timetable from './Timetable'

const Base = () => {
  const [loggedUser] = useState('admin')
  return loggedUser === 'admin' ? <AdminTimetable /> : <Timetable />
}

export default Base
