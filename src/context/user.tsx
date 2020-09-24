import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { TimetableItemRelations, User } from '../services/types'

type UserContextType = {
  setUser: (user: User) => void
  setTimetableItems: (items: TimetableItemRelations[]) => void
  removeUser: () => void
  removeTimetableItems: () => void
  isLoading: boolean
  user: (User & TimetableItemRelations[]) | null | undefined
}

type UserContextState = {
  isLoading: boolean
  user: User | null | undefined
  timetableItems: TimetableItemRelations[] | null | undefined
}

const UserContext = createContext({} as UserContextType)

const userReducer = (
  prevState: UserContextState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case 'SET_USER': {
      return { ...prevState, user: action.payload }
    }
    case 'SET_ITEMS': {
      return {
        ...prevState,
        timetableItems: [...action.payload],
      }
    }
    case 'REMOVE_USER': {
      return { ...prevState, user: action.payload }
    }
    case 'REMOVE_ITEMS': {
      return { ...prevState, timetableItems: [] }
    }
    default: {
      return prevState
    }
  }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, {
    isLoading: true,
    user: null,
    timetableItems: null,
  })

  const userContext = useMemo(
    () => ({
      setUser: (user: User) => {
        localStorage.setItem('user', JSON.stringify(user))
        dispatch({
          type: 'SET_USER',
          payload: user,
        })
      },
      setTimetableItems: (items: TimetableItemRelations[]) => {
        let prevItems
        try {
          prevItems = localStorage.getItem('timetableItems')
          if (prevItems)
            prevItems = JSON.parse(prevItems) as TimetableItemRelations[]
        } catch {
          prevItems = null
        }

        if (prevItems) {
          localStorage.setItem(
            'timetableItems',
            JSON.stringify([...prevItems, ...items]),
          )
        } else {
          localStorage.setItem('timetableItems', JSON.stringify(items))
        }

        dispatch({
          type: 'SET_ITEMS',
          payload: items,
        })
      },
      removeUser: () => {
        localStorage.clear()
        dispatch({
          type: 'REMOVE_USER',
          payload: undefined,
        })
      },
      removeTimetableItems: () => {
        localStorage.removeItem('timetableItems')
        dispatch({ type: 'REMOVE_ITEMS', payload: undefined })
      },
      isLoading: state.isLoading,
      user: state.user,
      timetableItems: state.timetableItems,
    }),
    [state.isLoading, state.user, state.timetableItems],
  )

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  )
}

export const useUser = () => {
  const {
    isLoading,
    setUser,
    setTimetableItems,
    removeUser,
    removeTimetableItems,
  } = useContext(UserContext)

  const userString = localStorage.getItem('user')
  let user
  if (userString) {
    user = JSON.parse(userString) as User
  }

  const itemsString = localStorage.getItem('timetableItems')
  let items
  if (itemsString) {
    items = JSON.parse(itemsString) as TimetableItemRelations[]
  }

  return {
    isLoading,
    setUser,
    setTimetableItems,
    removeUser,
    removeTimetableItems,
    user: user,
    timetableItems: items,
  }
}
