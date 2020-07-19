import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Layout from '../components/layout'
import Login from '../screens/Login'
import routes from './routes'

const DynamicRoutes = () => {
  return (
    <>
      {Object.values(routes).map(({ component, path }) => (
        <Route exact path={path} key={path} component={component} />
      ))}
    </>
  )
}

const Router = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login}></Route>
      <Layout>
        <DynamicRoutes />
      </Layout>
      <Route path="*">
        <Redirect to={routes.baseUrl.path} />
      </Route>
    </Switch>
  )
}

export default Router
