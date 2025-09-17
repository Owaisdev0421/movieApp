import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../api-slice";
import { uiReducer } from "../slices/ui-slice";

const rootReducers = combineReducers({
  ui: uiReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducers;
