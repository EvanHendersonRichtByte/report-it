import REPORT_REDUCER from "./reportReducer";
import USER_REDUCER from "./userReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({ REPORT_REDUCER, USER_REDUCER });

export default reducers;
