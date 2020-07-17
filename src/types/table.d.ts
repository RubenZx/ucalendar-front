export interface Data {
  Lunes: Subject[]
  Martes: Subject[]
  Miércoles: Subject[]
  Jueves: Subject[]
  Viernes: Subject[]
}

export interface Subject {
  title: string
  startHour: string
  endHour: string
  classRoom: string
  type: string
  dayOfTheWeek: number
  color: Color
  groups: Group[]
}

export interface Color {
  bgc: string
  abrev: string
}

export interface Group {
  group: string
  weeks: boolean[]
}
