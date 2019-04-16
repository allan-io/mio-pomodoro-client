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

  // handlePomodoroClick = event => {
  //   event.preventDefault()
  //   console.log(event.currentTarget)
  // }

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
        <h4>My Pomodoros:</h4>
        <Link to="/pomodoro-create">
          <button>New Pomodoro</button>
        </Link>
        <ul className="pomodoro-container">
          { this.state.pomodoros.map(pomodoro => (
            <li key={pomodoro.id}>
              <Link to={`/pomodoros/${pomodoro.id}`}>
                <div className="individual-pomodoro">
                  <div>
                    <div className="work-time" >{pomodoro.work_time}</div>
                    <hr
                      style={{
                        backgroundColor: 'red',
                        height: 2
                      }}
                    />
                    <div className="break-time">{pomodoro.break_time}</div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default Pomodoros
