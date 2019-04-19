import React from 'react'
import { NavLink } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <NavLink activeClassName="active-route" exact to="/change-password">Change Password</NavLink>
    <NavLink activeClassName="active-route" exact to="/sign-out">Sign Out</NavLink>
    <NavLink activeClassName="active-route" exact to="/pomodoros">My Pomodoros</NavLink>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <NavLink activeClassName="active-route" exact to="/sign-up">Sign Up</NavLink>
    <NavLink activeClassName="active-route" exact to="/sign-in">Sign In</NavLink>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
