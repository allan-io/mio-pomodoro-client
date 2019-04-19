import React, { Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
// import { Route, Link } from 'react-router-dom'

const PomodoroForm = ({ message, workTime, breakTime, handleSubmit, handleChange }) => (
  <Fragment>
    { message && <Alert variant="danger" dismissible>{message}</Alert> }
    <form className="submit-form"onSubmit={handleSubmit}>
      <label className="form-label"htmlFor="workTime">Work Time</label>
      <input className="form-input"value={ workTime } type="number" name="workTime" onChange={handleChange}/>
      <label className="form-label"htmlFor="breakTime">Play Time</label>
      <input className="form-input"value={ breakTime } type="number" name="breakTime" onChange={handleChange}/>
      <button className="submit-btn"type="submit">Submit</button>
    </form>
  </Fragment>
)

export default PomodoroForm
