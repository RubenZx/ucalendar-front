export interface Generic {
  id: string
  name: string
}

export interface Subject {
  id: string
  abrev: string
  name: string
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

export type UpdateTimetableItem = Partial<TimetableItem>

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
