import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
const rootReducer = combineReducers({
  user: UserReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
