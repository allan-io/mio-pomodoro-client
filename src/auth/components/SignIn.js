import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => history.push('/pomodoros'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <Fragment>
        <form className='auth-form' onSubmit={this.onSignIn}>
          <h3>Sign In</h3>
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button type="submit">Sign In</button>
        </form>
        <Link to={'/'}>
          <button className="cancel-btn" onClick={this.handleExit}>Cancel</button>
        </Link>
        <p className="creted-by">Created with ❤️ by Allan Oliveira</p>
      </Fragment>
    )
  }
}

export default withRouter(SignIn)
