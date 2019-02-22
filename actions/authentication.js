import {
  EMAIL_CHANGED,
  LOGIN_USER_ERROR, LOGIN_USER_START,
  LOGIN_USER_SUCCESS, LOGOUT,
  PASSWORD_CHANGED,
} from './types'
import { Actions } from 'react-native-router-flux'
import {jsonRpcRequest} from './helper/utilities'

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password}) => {
    return dispatch => {
      jsonRpcRequest({
        url: "https://dev.tbdealing.io/api",
        method: 'Login.Login',
        request: {
          loginNameEmailAddress: email,
          password: password,
        },
        onStart: () => dispatch(loginUserStart()),
        onSuccess: result => loginUserSuccess(dispatch, result),
        onError: error => dispatch(loginUserError(error)),
      })
    }
}

const loginUserStart = () =>  {
  return {
      type: LOGIN_USER_START
    }
}

const loginUserError = (error) => {
  return {
    type: LOGIN_USER_ERROR,
    error: error.message
  }
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })

  Actions.main()
}

export const logout = () => {
  Actions.auth()
  return dispatch => (
    dispatch({type: LOGOUT})
  )
}