import { combineReducers } from "redux";
import { userData } from "./userReducer";
import { postsData } from "./postReducer";
import { themeReducer } from "./miscellaneous";
import loader from "./loader";

export default combineReducers({ userData, postsData, loader, themeReducer });
