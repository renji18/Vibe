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

// online or not
export const networkReloadHandler = (data) => ({
  type: actionType.NETWORK_RELOAD_STATUS,
  data,
});
