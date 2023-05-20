import * as actionType from "../actions/actionTypes";

export const postsData = (state = {}, action) => {
  switch (action.type) {
    case actionType.GET_POSTS:
      return {
        ...state,
        posts: action.data,
      };

    default:
      return state;
  }
};
