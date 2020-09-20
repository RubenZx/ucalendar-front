import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import { User } from '../services/types'

type UserContextType = {
  setUser: (user: User) => void
  removeUser: () => void
  isLoading: boolean
  user: User | null | undefined
}

type UserContextState = {
  isLoading: boolean
  user: User | null | undefined
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
    case 'REMOVE_USER': {
      return { ...prevState, user: action.payload }
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
      removeUser: () => {
        localStorage.removeItem('user')
        dispatch({
          type: 'REMOVE_USER',
          payload: undefined,
        })
      },
      isLoading: state.isLoading,
      user: state.user,
    }),
    [state.isLoading, state.user],
  )

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  )
}

export const useUser = () => {
  const { isLoading, setUser, removeUser } = useContext(UserContext)

  const userString = localStorage.getItem('user')
  let user
  if (userString) {
    user = JSON.parse(userString) as User
  }

  return { isLoading, setUser, removeUser, user: user }
}
