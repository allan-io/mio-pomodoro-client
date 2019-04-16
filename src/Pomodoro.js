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
      pomodoro: null,
      shouldRedirect: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const user = this.props.user
    getPomodoro(user, id)
      .then(response => this.setState({ pomodoro: response.data.pomodoro }))
      .then(console.log)
      .catch(console.log)
  }

  handleDelete = () => {
    const id = this.props.match.params.id
    const { user } = this.props
    deletePomodoro(user, id)
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(console.log)
  }

  render () {
    if (!this.state.pomodoro) {
      return <p>loading...</p>
    }

    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/pomodoros', state: { message: 'Succesfully deleted pomodoro!' }
      }} />
    }
    const workTime = this.state.pomodoro.work_time
    const breakTime = this.state.pomodoro.break_time

    return (
      <Fragment>
        <div className="active-pomodoro-container">
          <div className="active-pomodoro">
            <h4 className="individual-pomodoro-time">{workTime}</h4>
            <h6>{breakTime}</h6>
          </div>
          <button onClick={this.handleDelete}>Delete</button>
          <Link to={this.props.match.url + '/edit'}>
            <button>Edit</button>
          </Link>
        </div>
      </Fragment>
    )
  }
}

export default Pomodoro
