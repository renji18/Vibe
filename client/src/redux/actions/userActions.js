import * as actionType from "./actionTypes";

export const getAllUser = (data) => {
  return {
    type: actionType.GET_ALL_USERS,
    data,
  };
};
