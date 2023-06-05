import { combineReducers } from "redux";
import { userData } from "./userReducer";
import { postsData } from "./postReducer";
import loader from "./loader";

export default combineReducers({ userData, postsData, loader });
