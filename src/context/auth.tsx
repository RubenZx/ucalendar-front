import JwtDecode from 'jwt-decode'
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { User } from '../services/types'

type AuthContextAction = {
  type: 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT' | 'SET_USER'
  token: string | null | undefined
  user: User | undefined
}

type AuthContextState = {
  isLoading: boolean
  userToken: string | null | undefined
}

type TokenDTO = {
  iat: number
  exp: number
}

type AuthContextType = {
  signIn: (token: string) => void
  setUser: (user: User) => void
  signOut: () => void
  isLoading: boolean
  userToken: string | null | undefined
}

const AuthContext = React.createContext({} as AuthContextType)

const authReducer = (
  prevState: AuthContextState,
  action: AuthContextAction,
) => {
  switch (action.type) {
    case 'RESTORE_TOKEN': {
      return {
        userToken: action.token,
        isLoading: false,
      }
    }
    case 'SIGN_IN':
      return {
        ...prevState,
        userToken: action.token,
      }
    case 'SIGN_OUT':
      return {
        ...prevState,
        userToken: action.token,
      }
    case 'SET_USER':
      return {
        ...prevState,
        user: action.user,
      }
    default:
      return prevState
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    userToken: null,
  })

  useEffect(() => {
    const bootstrapAsync = () => {
      let userToken
      try {
        userToken = localStorage.getItem('userToken')
      } catch {
        userToken = null
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, user: undefined })
    }
    bootstrapAsync()
  }, [])

  const authContext = useMemo(
    () => ({
      signIn: (token: string) => {
        localStorage.setItem('userToken', token)
        dispatch({ type: 'SIGN_IN', token, user: undefined })
      },
      setUser: (user: User) => {
        localStorage.setItem('user', JSON.stringify(user))
        dispatch({
          type: 'SET_USER',
          user,
          token: localStorage.getItem('userToken'),
        })
      },
      signOut: () => {
        localStorage.clear()
        dispatch({ type: 'SIGN_OUT', token: null, user: undefined })
      },
      isLoading: state.isLoading,
      userToken: state.userToken,
    }),
    [state.isLoading, state.userToken],
  )

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const { signIn, userToken, signOut, isLoading, setUser } = useContext(
    AuthContext,
  )
  const isTokenValid = userToken
    ? JwtDecode<TokenDTO>(userToken).exp > Date.now() / 1000
    : false

  const userString = localStorage.getItem('user')
  let user
  if (userString) {
    user = JSON.parse(userString) as User
  }

  return {
    signIn,
    isTokenValid,
    userToken,
    signOut,
    isLoading,
    setUser,
    user,
  }
}
