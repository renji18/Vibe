import * as actionType from "../actions/actionTypes";

export const userData = (state = {}, action) => {
  switch (action.type) {
    case actionType.GET_SINGLE_USER:
      return {
        profile: action.data,
      };

    default:
      return { ...state };
  }
};
