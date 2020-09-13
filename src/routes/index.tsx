import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from '../components/layout'
import Login from '../screens/Login'
import routes from './routes'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        {Object.values(routes).map(({ Component, path }) => (
          <Route exact path={path} key={path}>
            <Layout>
              <Component />
            </Layout>
          </Route>
        ))}
        <Route path="*">
          <Redirect to={routes.baseUrl.path} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
