import { ADD_USER } from "./actionTypes";

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: user
  };
}
