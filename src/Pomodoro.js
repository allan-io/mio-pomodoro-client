import React, { Fragment, Component } from 'react'
// import axios from 'axios'
// import apiUrl from './apiConfig'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getPomodoro, deletePomodoro } from './auth/api.js'
import messages from './auth/messages'

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
      breakShouldHide: true,
      timerStarted: false,
      fillHeight: '0%',
      fillColor: '#2dd22d'
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const user = this.props.user
    getPomodoro(user, id)
      .then(response => this.setState({
        minutes: response.data.pomodoro.work_time,
        breakMinutes: response.data.pomodoro.break_time,
        workStart: response.data.pomodoro.work_time,
        breakStart: response.data.pomodoro.break_time
      }))
      .catch(console.log)
  }

  handleExit = () => {
    clearInterval(this.workIntervalHandle)
    clearInterval(this.breakIntervalHandle)
    this.setState({
      timerStarted: false,
      fillHeight: '0%'
    })
  }

  handleReset = () => {
    clearInterval(this.workIntervalHandle)
    clearInterval(this.breakIntervalHandle)
    this.setState({
      minutes: this.state.workStart,
      breakMinutes: this.state.breakStart,
      seconds: '00',
      workShouldHide: false,
      breakShouldHide: true,
      timerStarted: false,
      fillHeight: '0%'
    })
  }

  handleBreakTimer = () => {
    const breakMinutes = Math.floor(this.breakSecondsRemaining / 60)
    const breakSeconds = this.breakSecondsRemaining - (breakMinutes * 60)
    const percent = this.percent

    this.setState({
      breakMinutes: breakMinutes,
      breakSeconds: breakSeconds,
      fillHeight: percent + '%',
      percent: 100 / (this.state.workStart * 61)
    })

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
        breakShouldHide: true,
        fillHeight: '0%'
      })
      setTimeout(this.playAlarmX, 10000)
      this.handleWorkStart()
    }
    this.breakSecondsRemaining--
    this.percent += this.state.percent
  }

  handleWorkTimer = () => {
    const minutes = Math.floor(this.workSecondsRemaining / 60)
    const seconds = this.workSecondsRemaining - (minutes * 60)
    const percent = this.percent

    this.setState({
      minutes: minutes,
      seconds: seconds,
      fillHeight: percent + '%',
      percent: 100 / (this.state.workStart * 61)
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
        breakShouldHide: false,
        fillHeight: '0%',
        playAlarm: true
      })
      this.handleBreakStart()
    }

    this.workSecondsRemaining--
    this.percent += this.state.percent
  }

  handleWorkStart = () => {
    const time = this.state.workStart
    this.workIntervalHandle = setInterval(this.handleWorkTimer, 1000)
    this.workSecondsRemaining = time * 60
    this.percent = 100 / (time * 60)
    this.setState({
      timerStarted: true,
      fillColor: '#2dd22d'
    })
  }

  handleBreakStart = () => {
    this.breakIntervalHandle = setInterval(this.handleBreakTimer, 1000)
    const time = this.state.breakStart
    this.breakSecondsRemaining = time * 60
    this.percent = 100 / (time * 60)
    this.setState({
      workShouldHide: true,
      breakShouldHide: false,
      fillColor: '#ff3333'
    })
  }

  // handleEdit =() => {
  //
  // }

  handleDelete = () => {
    clearInterval(this.workIntervalHandle)
    clearInterval(this.breakIntervalHandle)
    const id = this.props.match.params.id
    const { user, alert } = this.props
    deletePomodoro(user, id)
      .then(() => this.setState({ shouldRedirect: true }))
      .finally(() => alert(messages.deletePomodoroSuccess, 'success'))
      .catch(console.log)
  }

  render () {
    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/pomodoros', state: { message: 'Succesfully deleted pomodoro!' }
      }} />
    }

    const breakMinutes = this.state.breakMinutes
    const breakSeconds = this.state.breakSeconds
    const seconds = this.state.seconds
    const minutes = this.state.minutes
    const fillHeight = this.state.fillHeight
    const fillColor = this.state.fillColor

    return (
      <Fragment>
        <h1 className="individual-pomodoro-title">Mio Pomodoro</h1>
        <div className="active-pomodoro-container">
          <div className={this.state.workShouldHide ? 'hidden' : ''}>
            <div className="active-pomodoro work-hidden">
              <h4 className="individual-pomodoro-time">{minutes}</h4>
              <h6 className="individual-pomodoro-seconds">{seconds}</h6>
              <span className="fill"
                style={{
                  height: fillHeight,
                  background: fillColor
                }}
              ></span>
            </div>
          </div>
          <div className={this.state.breakShouldHide ? 'hidden' : ''}>
            <div className="active-pomodoro break-hidden">
              <h4 className="individual-pomodoro-time">{breakMinutes}</h4>
              <h6 className="individual-pomodoro-seconds">{breakSeconds}</h6>
              <span className="fill"
                style={{
                  height: fillHeight,
                  background: fillColor
                }}
              ></span>
            </div>
          </div>
          <div className="buttons">
            <button onClick={this.handleDelete}>Delete</button>
            <button className={this.state.timerStarted ? 'hidden' : ''}
              onClick={this.handleWorkStart}>Start</button>
            <button className={this.state.timerStarted ? '' : 'hidden'}
              onClick={this.handleReset}>Reset</button>
            <Link to={this.props.match.url + '/edit'}>
              <button onClick={this.handleExit}>Edit</button>
            </Link>
            <Link to={'/pomodoros'}>
              <button onClick={this.handleExit}>Exit</button>
            </Link>
          </div>
        </div>
        <p className="creted-by">Created with ❤️ by Allan Oliveira</p>
      </Fragment>
    )
  }
}

export default Pomodoro
