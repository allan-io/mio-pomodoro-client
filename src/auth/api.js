import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}

export const getPomodoros = user => {
  return axios({
    url: apiUrl + `/users/${user.id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const getPomodoro = (user, id) => {
  return axios({
    url: apiUrl + '/pomodoros/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deletePomodoro = (user, id) => {
  return axios({
    url: apiUrl + '/pomodoros/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createPomodoro = (pomodoro, token) => {
  return axios({
    url: `${apiUrl}/pomodoros`,
    method: 'POST',
    data: { pomodoro: {
      work_time: pomodoro.workTime,
      break_time: pomodoro.breakTime
    } },
    headers: {
      'Authorization': `Token token=${token}`
    }
  })
}

export const editPomodoro = (pomodoro, token) => {
  return axios({
    url: `${apiUrl}/pomodoros/${pomodoro.id}`,
    method: 'patch',
    data: { pomodoro: {
      work_time: pomodoro.workTime,
      break_time: pomodoro.breakTime
    } },
    headers: {
      'Authorization': `Token token=${token}`
    }
  })
}
