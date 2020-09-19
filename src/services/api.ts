import axios from 'axios'
import { TimetableItem, UpdateTimetableItem } from './types'

export const api = axios.create({ baseURL: 'http://localhost:3000/' })

export const login = async (uid: string, password: string) => {
  const res = await api.post('auth/login', { uid, password })
  return res.data
}

export const getProfile = async (token: string, uid: string) => {
  const res = await api.get(`user/${uid}`, {
    headers: {
      Authorization: 'bearer ' + token,
    },
  })
  return res.data
}

export const getUserSubjects = async (
  token: string,
  uid: string,
  semester: boolean,
) => {
  const res = await api.get(`user/${uid}/subjects/${semester}`, {
    headers: {
      Authorization: 'bearer ' + token,
    },
  })
  return res.data
}

export const getTimetable = async (
  uid: string | undefined,
  semester: boolean,
  token: string,
) => {
  const res = await api.get(`user/${uid}/timetable/${semester}`, {
    headers: {
      Authorization: 'bearer ' + token,
    },
  })
  return res.data
}

export const getAll = async (endpoint: string) => {
  const res = await api.get(endpoint)
  return res.data
}

export const getSubjects = async ({ id }: { id: string }) => {
  const res = await api.get(`degrees/${id}/subjects`)
  return res.data
}

export const createGroup = async ({ name }: { name: string }) => {
  const res = await api.post('groups/', { name })
  return res.data
}

export const getTimetableItems = async (id: string, semester?: boolean) => {
  const res = await api.get(
    `subjects/${id}/timetable-items` +
      (semester !== undefined ? `?semester=${semester}` : ''),
  )
  return res.data
}

export const createTimetableItem = async (
  data: Omit<TimetableItem, 'id' | 'subjectId'>,
  subjectId: string,
) => {
  const res = await api.post(`subjects/${subjectId}/timetable-items`, data)
  return res.data
}

export const updateTimeTableItem = async (
  data: UpdateTimetableItem,
  itemId: number,
) => {
  const res = await api.put('timetable-items/' + itemId, data)
  return res.data
}
