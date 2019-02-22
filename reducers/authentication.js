import {
  EMAIL_CHANGED, LOGIN_USER_START, LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  PASSWORD_CHANGED, LOGOUT,
} from '../actions/types'
import moment from 'moment'
import {decode as atob, encode as btoa} from 'base-64'
import { AsyncStorage } from 'react-native'
const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: null,
}

const authentication = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
        return {...state, email: action.payload}
    case PASSWORD_CHANGED:
      return {...state, password: action.payload}
    case LOGIN_USER_START:
      return {...state, loading: true, error: ''}
    case LOGIN_USER_SUCCESS:
      AsyncStorage.setItem('access_token', action.payload.accessToken)
      let viewPermissions = action.payload.permissions.filter(
          p => p.toLowerCase().startsWith('view.'))
      AsyncStorage.setItem('view_permissions', JSON.stringify(viewPermissions))
      return {
        ...state,
        ...INITIAL_STATE,
        claims: parseToken(action.payload.accessToken),
        permissions: action.payload.permissions,
        viewPermissions,
      }
    case LOGIN_USER_ERROR:
      let message = ''
      switch (action.error) {
        case 'authorization failed':
          message = 'Invalid Username or Password'
          break
        case 'password reset required':
          message = 'Reset password required'
          break
        default :
          message = 'Login Failed'
      }
      return {...state, error: message, password: '', loading: false}
    case LOGOUT:
      AsyncStorage.removeItem('access_token')
      return {...state, INITIAL_STATE}
    default:
      return state
  }
}


let parseToken = (token) => {
  // Checking for string === "undefined" as storing an undefined value
  // in sessionStorage stores a string "undefined"
  // This case arises when queryString is unable to parse token from
  // url for some reason during registration
  if (token && !(token === 'undefined')) {
    try {
      let payloadData = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'))
      let payloadString = atob(payloadData)
      let payload = JSON.parse(payloadString)

      let expiry = moment.unix(payload.exp)
      let remaining = moment.duration(expiry.diff(moment()))
      console.log('Token parsed. It will expire in ' + remaining.as('minutes') + ' minutes')
      if (remaining <= 0) {
        AsyncStorage.clear()
        return
      }
      return payload

    } catch (e) {
      console.error('Error while parsing token from local storage:', e)
    }
  }
  AsyncStorage.clear()
}


export default authentication