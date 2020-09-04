import axios from 'axios'
import { TimetableItem } from './types'

export const api = axios.create({ baseURL: 'http://localhost:3000/' })

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

export const getTimetableItems = async ({ id }: { id: string }) => {
  const res = await api.get(`subjects/${id}/timetable-items`)
  return res.data
}

export const createTimetableItem = async (
  data: Omit<TimetableItem, 'id' | 'subjectId'>,
  subjectId: string,
) => {
  const res = await api.post(`subjects/${subjectId}/timetable-items`, data)
  return res.data
}
