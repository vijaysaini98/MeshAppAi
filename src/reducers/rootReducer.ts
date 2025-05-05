import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice/authSlice";
import { doctorReducer } from "../slices/drSlice/drSlice";
import { mrReducer } from "../slices/mrSlice/mrSlice";
import { drAvailabilityReducer } from "../slices/drAvailabilitySlice/drAvailabilitySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  doctor: doctorReducer,
  mr: mrReducer,
  drAvailability: drAvailabilityReducer,
});

export default rootReducer;
