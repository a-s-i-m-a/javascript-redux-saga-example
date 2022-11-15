import { combineReducers } from "redux";

import Layout from "./layout/reducer";
import Login from "./auth/login/reducer";
import Cards from "./cards/reducer";

const rootReducer = combineReducers({
  Layout,
  Login,
  Cards,
});

export default rootReducer;
