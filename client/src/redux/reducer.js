import { combineReducers } from "redux";
import itemsReducer from "./itemSlice";

//import reducer from features file

const rootReducer = combineReducers({
    items: itemsReducer,
  });
  
  export default rootReducer;