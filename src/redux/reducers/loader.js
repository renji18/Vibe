import * as actionType from "../actions/actionTypes";

const initialState = {
  siteLoader: true,
  networkReloadStatus: null,
};

const loader = (state = initialState, { type, data }) => {
  switch (type) {
    case actionType.MAIN_LOADER:
      return {
        ...state,
        siteLoader: data,
      };
    case actionType.FIREBASE_LOADER:
      return {
        ...state,
        firebaseLoader: data,
      };
    case actionType.NETWORK_RELOAD_STATUS:
      return {
        ...state,
        networkReloadStatus: data,
      };
    default:
      return state;
  }
};

export default loader;
