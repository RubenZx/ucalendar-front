import { TimetableItemRelations } from '../services/types'

// returns true if the newItem cannot be able to add
export const cannotAdd = (
  prevItems: TimetableItemRelations[],
  newItem: TimetableItemRelations,
) => {
  const res = prevItems.map(
    (item) =>
      item.dayOfTheWeek === newItem.dayOfTheWeek &&
      !(newItem.startHour > item.endHour || newItem.endHour < item.startHour),
  )
  return res.some((item) => item === true)
}
