import { combineReducers } from "redux";
import authReducer from "./reducreLogin";
const rootReducer = combineReducers({
    auth: authReducer,
});
export default rootReducer;