import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from '../components/layout'
import Login from '../screens/Login'
import NotFound from '../screens/NotFound'
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
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
