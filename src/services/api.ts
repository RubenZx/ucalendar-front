import axios from 'axios'
import {
  Subject,
  TimetableItem,
  TimetableItemRelations,
  UpdateTimetableItem,
  User,
} from './types'

// Change the baseURL to the 3000 port to dev or to localhost/api/ to prod
export const api = axios.create({ baseURL: 'http://localhost:3000/' })

export const login = async (
  uid: string,
  password: string,
): Promise<{ access_token: string }> => {
  const res = await api.post('auth/login', { uid, password })
  return res.data
}

export const getProfile = async (
  token: string,
  uid: string,
): Promise<User & { timetableItems: TimetableItemRelations[] }> => {
  const res = await api.get(`users/${uid}`, {
    headers: { Authorization: `bearer ${token}` },
  })
  return res.data
}

export const getUserSubjects = async (
  token: string,
  uid: string,
  semester: boolean,
): Promise<Subject[]> => {
  const res = await api.get(`users/${uid}/subjects/${semester}`, {
    headers: { Authorization: `bearer ${token}` },
  })
  return res.data
}

export const addTimetableItem = async (
  token: string,
  uid: string,
  timetableItemId: number,
) => {
  const res = await api.put(
    `users/${uid}/timetable-items`,
    { timetableItemId },
    { headers: { Authorization: `bearer ${token}` } },
  )

  return res.data
}

export const removeTimetable = async (
  token: string,
  uid: string,
  semester: boolean,
) => {
  const res = await api.delete(`users/${uid}/timetable-items/${semester}`, {
    headers: { Authorization: `bearer ${token}` },
  })
  return res.data
}

export const getTimetable = async (
  uid: string | undefined,
  semester: boolean,
  token: string,
): Promise<TimetableItemRelations[]> => {
  const res = await api.get(`users/${uid}/timetable-items/${semester}`, {
    headers: { Authorization: `bearer ${token}` },
  })
  return res.data
}

export const getAll = async (endpoint: string, token?: string) => {
  let res
  if (token) {
    res = await api.get(endpoint, {
      headers: { Authorization: `bearer ${token}` },
    })
  } else {
    res = await api.get(endpoint)
  }

  return res.data
}

export const getSubjects = async (
  id: string,
  semester: boolean,
): Promise<Subject[]> => {
  const res = await api.get(`degrees/${id}/subjects/${semester}`)
  return res.data
}

export const createGroup = async (name: string, token: string) => {
  const res = await api.post(
    'groups/',
    { name },
    {
      headers: { Authorization: `bearer ${token}` },
    },
  )
  return res.data
}

export const getTimetableItems = async (
  id: string,
  token: string,
  semester?: boolean,
): Promise<TimetableItemRelations[]> => {
  const res = await api.get(
    `subjects/${id}/timetable-items` +
      (semester !== undefined ? `?semester=${semester}` : ''),
    { headers: { Authorization: `bearer ${token}` } },
  )
  return res.data
}

export const createTimetableItem = async (
  data: Omit<TimetableItem, 'id' | 'subjectId'>,
  subjectId: string,
  token: string,
) => {
  const res = await api.post(`subjects/${subjectId}/timetable-items`, data, {
    headers: { Authorization: `bearer ${token}` },
  })
  return res.data
}

export const updateTimetableItem = async (
  data: UpdateTimetableItem,
  id: number,
  token: string,
) => {
  const res = await api.put(`timetable-items/${id}`, data, {
    headers: { Authorization: `bearer ${token}` },
  })
  return res.data
}

export const removeTimetableItem = async (id: number, token: string) => {
  const res = await api.delete(`timetable-items/${id}`, {
    headers: { Authorization: `bearer ${token}` },
  })
  return res.data
}

export const getTimetableItemById = async (
  id: number,
  token: string,
): Promise<TimetableItemRelations> => {
  const res = await api.get(`timetable-items/${id}`, {
    headers: { Authorization: `bearer ${token}` },
  })
  return res.data
}

export const sendMessage = async (
  data: {
    sentToUid: string
    sentFromUid: string
    content: string
  },
  token: string,
): Promise<any> => {
  const res = await api.post('messages', data, {
    headers: { Authorization: `bearer ${token}` },
  })
  return res.data
}

export const getMessages = async (
  id: string,
  idFrom: string,
  token: string,
): Promise<any> => {
  const res = await api.get(`users/${id}/messages/${idFrom}`, {
    headers: { Authorization: `bearer ${token}` },
  })
  return res.data
}
