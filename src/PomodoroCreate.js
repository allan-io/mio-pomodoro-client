import React, { Component } from 'react'
// import axios from 'axios'
// import apiUrl from './apiConfig'
import { Redirect } from 'react-router'
import { createPomodoro } from './auth/api.js'

import PomodoroForm from './PomodoroForm'

class PomodoroCreate extends Component {
  constructor () {
    super()

    this.state = {
      pomodoro: {
        work_time: '',
        break_time: ''
      },
      created: false,
      message: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { pomodoro } = this.state
    const token = this.props.user.token

    createPomodoro(pomodoro, token)
      .then(responseData => { console.log(responseData); return responseData })
      .then(response => this.setState({
        created: true,
        pomodoro: response.data.pomodoro
      }))
      .catch(() => this.setState({
        pomodoro: { ...pomodoro, work_time: '', break_time: '' },
        message: 'create failed, please fill out all forms and try again'
      }))
  }

  handleChange = event => {
    this.setState({ pomodoro: {
      ...this.state.pomodoro, [event.target.name]: event.target.value
    } })
  }
  render () {
    const { workTime, breakTime, pomodoro, created, message } = this.state

    if (created) {
      return <Redirect to={`/pomodoros/${pomodoro.id}`}/>
    }

    return (
      <PomodoroForm
        work_time={workTime}
        break_time={breakTime}
        message={message}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default PomodoroCreate
