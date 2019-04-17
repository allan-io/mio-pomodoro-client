import React, { Fragment, Component } from 'react'
// import axios from 'axios'
// import apiUrl from './apiConfig'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getPomodoro, deletePomodoro } from './auth/api.js'

class Pomodoro extends Component {
  constructor () {
    super()
    this.state = {
      minutes: 20,
      seconds: '00',
      breakMinutes: 0,
      breakSeconds: '00',
      shouldRedirect: false,
      breakStart: 0,
      workStart: 0,
      workShouldHide: false,
      breakShouldHide: true
    }

    // this.breakTimer = this.breakTimer.bind(this)
  }
  componentDidMount () {
    const id = this.props.match.params.id
    const user = this.props.user
    getPomodoro(user, id)
      .then(d => { console.log(d); return d })
      .then(response => this.setState({
        minutes: response.data.pomodoro.work_time,
        breakMinutes: response.data.pomodoro.break_time,
        workStart: response.data.pomodoro.work_time,
        breakStart: response.data.pomodoro.break_time
      }))
      .then(() => console.log(this.state.breakStart))
      .catch(console.log)
  }

  handleReset = () => {
    clearInterval(this.workIntervalHandle)
    clearInterval(this.breakIntervalHandle)
    this.setState({
      minutes: this.state.workStart,
      breakMinutes: this.state.breakStart,
      seconds: '00',
      workShouldHide: false,
      breakShouldHide: true
    })
  }

  handleBreakTimer = () => {
    const breakMinutes = Math.floor(this.breakSecondsRemaining / 60)
    const breakSeconds = this.breakSecondsRemaining - (breakMinutes * 60)

    this.setState({
      breakMinutes: breakMinutes,
      breakSeconds: breakSeconds
    })
    console.log(this.state.breakStart, breakSeconds)

    if (breakSeconds < 10) {
      this.setState({
        breakSeconds: '0' + this.state.breakSeconds
      })
    } if (breakMinutes < 10) {
      this.setState({
        time: '0' + breakMinutes
      })
    } if (breakMinutes === 0 && breakSeconds === 0) {
      clearInterval(this.breakIntervalHandle)
      this.setState({
        workShouldHide: false,
        breakShouldHide: true
      })
      this.handleWorkStart()
    }
    this.breakSecondsRemaining--
  }

  handleBreakStart = () => {
    this.setState({
      workShouldHide: true,
      breakShouldHide: false
    })
    this.breakIntervalHandle = setInterval(this.handleBreakTimer, 1000)
    const time = this.state.breakStart
    this.breakSecondsRemaining = time * 60
  }

  handleWorkTimer = () => {
    const minutes = Math.floor(this.workSecondsRemaining / 60)
    const seconds = this.workSecondsRemaining - (minutes * 60)

    this.setState({
      minutes: minutes,
      seconds: seconds
    })
    if (seconds < 10) {
      this.setState({
        seconds: '0' + this.state.seconds
      })
    } if (minutes < 10) {
      this.setState({
        time: '0' + minutes
      })
    } if (minutes === 0 && seconds === 0) {
      clearInterval(this.workIntervalHandle)
      this.setState({
        workShouldHide: true,
        breakShouldHide: false
      })
      this.handleBreakStart()
    }

    this.workSecondsRemaining--
  }

  handleWorkStart = () => {
    this.workIntervalHandle = setInterval(this.handleWorkTimer, 1000)
    const time = this.state.workStart
    this.workSecondsRemaining = time * 60
  }

  handleDelete = () => {
    const id = this.props.match.params.id
    const { user } = this.props
    deletePomodoro(user, id)
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(console.log)
  }

  render () {
    // if (!this.state.pomodoro) {
    //   return <p>loading...</p>
    // }

    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/pomodoros', state: { message: 'Succesfully deleted pomodoro!' }
      }} />
    }
    const breakMinutes = this.state.breakMinutes
    const breakSeconds = this.state.breakSeconds
    const seconds = this.state.seconds
    const minutes = this.state.minutes
    console.log(minutes, seconds)

    return (
      <Fragment>
        <div className="active-pomodoro-container">
          <div className={this.state.workShouldHide ? 'hidden' : ''}>
            <div className="active-pomodoro work-hidden">
              <h4 className="individual-pomodoro-time">{minutes}</h4>
              <h6>{seconds}</h6>
            </div>
          </div>
          <div className={this.state.breakShouldHide ? 'hidden' : ''}>
            <div className="active-pomodoro break-hidden">
              <h4 className="individual-pomodoro-time">{breakMinutes}</h4>
              <h6>{breakSeconds}</h6>
            </div>
          </div>
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={this.handleWorkStart}>Start</button>
          <button onClick={this.handleReset}>Reset</button>
          <Link to={this.props.match.url + '/edit'}>
            <button>Edit</button>
          </Link>
        </div>
      </Fragment>
    )
  }
}

export default Pomodoro
