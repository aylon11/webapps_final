import {
  SET_USER_NAME,
  SetUserName
} from '../types'

const initialState: any = {
  userName: ""
}

export default function userNameReducer(state = initialState, action: SetUserName): any {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        userName: action.payload
      }
    default:
      return state
  }
}