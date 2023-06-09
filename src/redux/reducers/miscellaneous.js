import * as actionType from "../actions/actionTypes";

const initialState = {
  isDarkTheme: true,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.THEME_SWITCH:
      console.log("Theme switched:", action.data);
      return {
        ...state,
        isDarkTheme: action.data,
      };

    default:
      return state;
  }
};
