import * as actionType from "../actions/actionTypes";

export const userData = (state = { users: [] }, action) => {
  switch (action.type) {
    case actionType.GET_ALL_USERS:
      return {
        users: action.data,
      };

    default:
      return { ...state };
  }
};
