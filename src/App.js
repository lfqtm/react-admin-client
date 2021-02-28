import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Admin from './pages/Admin'
import Login from './pages/Login'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Admin} />
          <Redirect to={'/login'} />
        </Switch>
      </BrowserRouter>
    )
  }
}

