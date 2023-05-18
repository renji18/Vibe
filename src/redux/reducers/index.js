import { combineReducers } from "redux";
import { userData } from "./userReducer";
import loader from "./loader";

export default combineReducers({ userData, loader });
