import React, { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from '../components/layout'
import { useAuth } from '../context/auth'
import Login from '../screens/Login'
import routes from './routes'

const Router = () => {
  const { isTokenValid, isLoading } = useAuth()
  const [redirect, setRedirect] = useState<boolean>()

  useEffect(() => {
    if (!isLoading) {
      setRedirect(!isTokenValid)
    }
  }, [isLoading, isTokenValid])

  return (
    <BrowserRouter>
      {redirect && <Redirect to="/login" />}
      <Switch>
        <Route exact path="/login" component={Login} />
        {Object.values(routes).map(({ Component, path }) => (
          <Route exact path={path} key={path}>
            <Layout>
              <Component />
            </Layout>
          </Route>
        ))}
        <Route>
          <Redirect to={routes.baseUrl.path} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
