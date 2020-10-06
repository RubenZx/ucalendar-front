import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from '../components/layout'
import { useUser } from '../context/user'
import Login from '../screens/Login'
import PrivateRoute from './PrivateRoute'
import routes from './routes'

const Router = () => {
  const { user } = useUser()

  return (
    <BrowserRouter>
      <Switch>
        {!user && <Route exact path="/login" component={Login} />}
        {Object.values(routes).map(({ Component, path, roles }) => {
          return (
            <PrivateRoute exact path={path} key={path}>
              {roles.includes(user?.role) || roles.includes('ALL') ? (
                <Layout>
                  <Component />
                </Layout>
              ) : (
                <Redirect to="/" />
              )}
            </PrivateRoute>
          )
        })}
        <Route>
          <Redirect to={routes.baseUrl.path} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
