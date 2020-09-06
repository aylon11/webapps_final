import { SET_USER_NAME } from "../types";

const setUserName = (userName: string) => {
  return {
    type: SET_USER_NAME,
    payload: userName
  }
}

export default setUserName