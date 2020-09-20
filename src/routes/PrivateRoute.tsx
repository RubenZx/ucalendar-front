import React, { useEffect, useState } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAuth } from '../context/auth'

const PrivateRoute = (props: RouteProps) => {
  const { isLoading, isTokenValid } = useAuth()
  const [redirect, setRedirect] = useState<boolean>()

  useEffect(() => {
    if (!isLoading) {
      setRedirect(!isTokenValid)
    }
  }, [isLoading, isTokenValid])

  return redirect ? <Redirect to="/login" /> : <Route {...props} />
}

export default PrivateRoute
