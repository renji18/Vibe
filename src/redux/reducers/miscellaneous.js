// ./redux/reducers/themeReducer.js
const initialState = {
  isDarkTheme: true, // Set the initial theme based on your default theme
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_THEME":
      return {
        ...state,
        isDarkTheme: action.payload,
      };
    default:
      return state;
  }
};

