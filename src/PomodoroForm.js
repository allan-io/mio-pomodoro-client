import React, { Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
// import { Route, Link } from 'react-router-dom'

const PomodoroForm = ({ message, workTime, breakTime, handleSubmit, handleChange }) => (
  <Fragment>
    { message && <Alert variant="danger" dismissible>{message}</Alert> }
    <form onSubmit={handleSubmit}>
      <label htmlFor="workTime">Work Time</label>
      <input value={ workTime } type="number" name="workTime" onChange={handleChange}/>
      <label htmlFor="breakTime">Play Time</label>
      <input value={ breakTime } type="number" name="breakTime" onChange={handleChange}/>
      <button type="submit">Submit</button>
    </form>
  </Fragment>
)

export default PomodoroForm
