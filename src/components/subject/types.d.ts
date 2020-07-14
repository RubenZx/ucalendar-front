export interface SubjectProps {
  id: string
  title: string
  color: string
  textColor: string
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
