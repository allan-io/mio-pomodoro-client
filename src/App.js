import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Pomodoros from './Pomodoros'
import Pomodoro from './Pomodoro'
import PomodoroCreate from './PomodoroCreate'
import PomodoroEdit from './PomodoroEdit'
import Home from './Home'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Home alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute exact user={user} path='/pomodoros' render={(props) => (
            <Pomodoros alert={this.alert} user={user} {...props} />
          )} />
          <AuthenticatedRoute exact user={user} path='/pomodoros/:id' render={(props) => (
            <Pomodoro alert={this.alert} user={user} {...props} />
          )} />
          <AuthenticatedRoute exact user={user} path='/pomodoro-create' render={(props) => (
            <PomodoroCreate alert={this.alert} user={user} {...props} />
          )} />
          <AuthenticatedRoute exact user={user} path='/pomodoros/:id/edit' render={(props) => (
            <PomodoroEdit alert={this.alert} user={user} {...props} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
