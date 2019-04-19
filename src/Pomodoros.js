import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getPomodoros } from './auth/api.js'
// import { Route, Link } from 'react-router-dom'

// import Spinner from 'react-bootstrap/Spinner'

class Pomodoros extends Component {
  constructor () {
    super()
    this.state = {
      work_percent_complete: 0,
      break_percent_complete: 0,
      theme: 'pomodoro',
      pomodoros: []
    }
  }

  componentDidMount () {
    const { user } = this.props
    getPomodoros(user)
      .then(response => this.setState({
        pomodoros: response.data.user.pomodoros
      }))
      .catch(console.log)
  }

  render () {
    return (
      <Fragment>
        <ul className="pomodoro-container">
          <Link to="/pomodoro-create">
            <button className="new-pomodoro-btn">New Pomodoro</button>
          </Link>
          { this.state.pomodoros.map(pomodoro => (
            <li key={pomodoro.id}>
              <Link to={`/pomodoros/${pomodoro.id}`}>
                <div className="individual-pomodoro">
                  <div>
                    <div className="work-time" >{pomodoro.work_time}</div>                    <div className="break-time">{pomodoro.break_time}</div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="creted-by">Created with ❤️ by Allan Oliveira</p>
      </Fragment>
    )
  }
}

export default Pomodoros
