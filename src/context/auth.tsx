import JwtDecode from 'jwt-decode'
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

type AuthContextAction = {
  type: 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT' | 'SET_USER'
  token: string | null | undefined
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
      dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    }
    bootstrapAsync()
  }, [])

  const authContext = useMemo(
    () => ({
      signIn: (token: string) => {
        localStorage.setItem('userToken', token)
        dispatch({ type: 'SIGN_IN', token })
      },
      signOut: () => {
        localStorage.clear()
        dispatch({ type: 'SIGN_OUT', token: null })
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
  const { signIn, userToken, signOut, isLoading } = useContext(AuthContext)

  const isTokenValid = userToken
    ? JwtDecode<TokenDTO>(userToken).exp > Date.now() / 1000
    : false

  return {
    signIn,
    signOut,
    isTokenValid,
    userToken,
    isLoading,
  }
}
