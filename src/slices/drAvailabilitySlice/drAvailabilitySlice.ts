import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  isLoading: false,
  userData: undefined,
  type: "mr",
  forgotPasswordId: "",
  loginData: [],
};

export const drAvailabilitySlice = createSlice({
  name: "drAvailablity",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});
export const { setLoading } = drAvailabilitySlice.actions;
export const drAvailabilityReducer = drAvailabilitySlice.reducer;
