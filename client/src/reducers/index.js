import { ADD_USER } from "../actions/actionTypes";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case ADD_USER:
      return {
        user: action.paylaod
      };
    case "SIGNUP_SUCCESS":
      return {
        status: true
      };
    case "SIGNUP_FAILED":
      return {
        status: false
      };
    default:
      return state;
  }
}
