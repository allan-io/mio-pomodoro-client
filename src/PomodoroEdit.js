import React, { Component } from 'react'
// import axios from 'axios'
// import apiUrl from './apiConfig'
import { Redirect } from 'react-router'

import PomodoroForm from './PomodoroForm'
import { editPomodoro, getPomodoro } from './auth/api.js'
import messages from './auth/messages'

class PomodoroEdit extends Component {
  constructor () {
    super()

    this.state = {
      pomodoro: null,
      updated: false,
      message: null
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const user = this.props.user
    getPomodoro(user, id)
      .then(response => this.setState({ pomodoro: response.data.pomodoro }))
      .catch(console.log)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { alert } = this.props
    const { pomodoro } = this.state
    const token = this.props.user.token

    editPomodoro(pomodoro, token)
      .then(() => this.setState({ updated: true }))
      .finally(() => alert(messages.updatedPomodoroSuccess, 'success'))
      .catch(() => this.setState({
        pomodoro: { ...pomodoro, title: '', director: '', year: '' },
        message: 'update failed, please fill out all forms and try again'
      }))
  }

  handleChange = event => {
    this.setState({ pomodoro: {
      ...this.state.pomodoro, [event.target.name]: event.target.value
    } })
  }

  render () {
    const { workTime, breakTime, pomodoro, updated, message } = this.state

    if (!pomodoro) {
      return <p>...loading</p>
    }

    if (updated) {
      return <Redirect to={`/pomodoros/${pomodoro.id}`}/>
    }

    return (
      <PomodoroForm
        work_time={workTime}
        director={breakTime}
        message={message}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default PomodoroEdit
