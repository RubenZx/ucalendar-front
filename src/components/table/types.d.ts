export interface color {
  bgc: string
  abrev: string
}

export interface colors {
  [key: string]: color
}

export interface Data {
  subjects: Subjects
  columns: Columns
  columnOrder: string[]
}

export interface Subjects {
  [key: string]: Subject
}

export interface Subject {
  id: string
  content: SubjectContent
}

export interface SubjectContent {
  title: string
  hours: string
  classRoom: string
  type: string
  dayOfTheWeek: number
  groups: Group[]
}

export interface Group {
  group: string
  weeks: boolean[]
}

export interface Columns {
  [key: string]: Column
}

export interface Column {
  id: string
  title: string
  subjectsIds: string[]
}
