export interface Generic {
  id: string
  name: string
}

export interface Subject {
  id: string
  abrev: string
  name: string
  semester: boolean
}

export interface User {
  lastName: string
  name: string
  role: 'ALUMN' | 'ADMINISTRATOR' | 'PROFESSOR'
  uid: string
}

export interface Message {
  content: string
  id: number
  sentDate: string
  sentFrom: SentFrom
  sentFromUid: string
  sentToUid: string
}

export interface SentFrom {
  lastName: string
  name: string
  uid: string
}

export interface TimetableItem {
  classRoomId: number
  colorAbrev: string
  colorBg: string
  dayOfTheWeek: number
  endHour: string
  groupId: number
  semester: boolean
  id: number
  startHour: string
  subjectId: number
  type: string
  weeks: boolean[]
}

export interface TimetableItemRelations {
  classRoom: Generic
  classRoomId: number
  group: Generic
  groupId: number
  semester: boolean
  subject: Subject
  subjectId: number
  colorBg: string
  colorAbrev: string
  dayOfTheWeek: number
  endHour: string
  id: number
  startHour: string
  type: string
  weeks: boolean[]
}

export type UpdateTimetableItem = Partial<TimetableItem>
