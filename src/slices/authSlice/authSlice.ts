import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  isLoading: false,
  isBtnLoading: false,
  userData: undefined,
  type: "mr",
  forgotPasswordId: "",
  loginData: [],
  verifyOtp: false,
  drLoginData: [],
  mrLoginData: [],
  adharVerifyOtp: false,
  privacyPolicy: false,
  appInfo:{}
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setBtnLoading: (state, { payload }) => {
      state.isBtnLoading = payload;
    },
    setType: (state, { payload }) => {
      state.type = payload;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    setForgotPasswordId: (state, { payload }) => {
      state.forgotPasswordId = payload;
    },
    setLoginData: (state, { payload }) => {
      state.loginData = payload;
    },
    setDrLoginData: (state, { payload }) => {
      state.drLoginData = payload;
    },
    setMrLoginData: (state, { payload }) => {
      state.mrLoginData = payload;
    },
    setVerifyOtp: (state, { payload }) => {
      state.verifyOtp = payload;
    },
    setAadharVerifyOtp: (state, { payload }) => {
      state.adharVerifyOtp = payload;
    },
    setPrivacyPolicy: (state, { payload }) => {
      state.privacyPolicy = payload
    },
    setAppinfo : (state,{payload})=>{
      state.appInfo = payload
    },
    resetAuth: (state,{payload})=>{
      state = initialState
    },
  },
});
export const {
  setLoading,
  setUserData,
  setForgotPasswordId,
  setLoginData,
  setVerifyOtp,
  setAadharVerifyOtp,
  setDrLoginData,
  setMrLoginData,
  setBtnLoading,
  setPrivacyPolicy,
  setAppinfo,
  resetAuth
} : any =authSlice.actions;
// = authSlice.actions;
// export const authSelector = state => state.auth;
export const authReducer = authSlice.reducer;
