import * as actionType from "../actions/actionTypes";

export const userData = (state = {}, action) => {
  switch (action.type) {
    case actionType.GET_SINGLE_USER:
      return {
        ...state,
        profile: action.data,
      };
    case actionType.GET_USER_NAMES:
      return {
        ...state,
        userNames: action.data,
      };
    default:
      return state;
  }
};
