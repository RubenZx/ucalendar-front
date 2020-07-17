import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
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
      <DynamicRoutes />
      <Route path="*">
        <Redirect to={routes.baseUrl.path} />
      </Route>
    </Switch>
  )
}

export default Router
