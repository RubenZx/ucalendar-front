import { colors } from '../components/proba/types'

const subjectColor = {
  CAL: { bgc: 'rgb(245, 221, 221)', abrev: 'rgb(209, 52, 43)' },
  IP: { bgc: 'rgb(231, 240, 228)', abrev: 'rgb(103, 171, 87)' },
  MD: { bgc: 'rgb(237, 228, 240)', abrev: 'rgb(142, 82, 158)' },
} as colors

export const subjectBgColor = (subject: string): string => {
  return subjectColor[subject].bgc
}

export const subjectAbrevColor = (subject: string): string => {
  return subjectColor[subject].abrev
}
