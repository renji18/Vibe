import * as actionType from "./actionTypes";

// Getting single user data after login or registration
export const getSingleUser = (data) => {
  return {
    type: actionType.GET_SINGLE_USER,
    data,
  };
};
