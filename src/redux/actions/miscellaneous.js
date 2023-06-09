import * as actionType from "./actionTypes";

// Main loader on route changes
export const toggleMainLoader = (data) => ({
  type: actionType.MAIN_LOADER,
  data,
});

// Loader for firebase functions
export const toggleFirebaseLoader = (data) => ({
  type: actionType.FIREBASE_LOADER,
  data,
});

// Theme switching
export const themeSwitchAction = (data) => ({
  type: actionType.THEME_SWITCH,
  data,
});

export const updateTheme = (isDark) => {
  return {
    type: "UPDATE_THEME",
    payload: isDark,
  };
};