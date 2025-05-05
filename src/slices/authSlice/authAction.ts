import { Dispatch } from "redux";
import {
  ForgotPasswordProps,
  LoginApiResponse,
  LoginProps,
} from "./authSliceType";
import { appOperation } from "../../appOperation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CLIENT_ID,
  FCM_TOKEN_KEY,
  LOGIN_TYPE,
  REFRESH_TOKEN_KEY,
  TAB_PARAMS_DATA,
  TAB_PARAMS_REVERSE_DATA,
  USER_TOKEN_KEY,
} from "../../helper/Constants";
import {
  resetAuth,
  setAadharVerifyOtp,
  setBtnLoading,
  setForgotPasswordId,
  setLoading,
  setLoginData,
  setVerifyOtp,
} from "./authSlice";
import Toast from "react-native-simple-toast";
import NavigationService from "../../navigation/NavigationService";
import {
  NAVIGATION_DR_BOTTOM_TAB_STACK,
  NAVIGATION_MR_BOTTOM_TAB_STACK,
  MOBILE_VERIFICATION,
  WELCOME_SCREEN,
  RESET_PASSWORD_SCREEN,
  NAVIGATION_AUTH_STACK,
} from "../../navigation/routes";
import { mrNearByDoctor } from "../mrSlice/mrAction";
import { DrEditProfile, doctorAppointmentList } from "../drSlice/drAction";
import { AppDispatch } from "../../store/store";
import { logger, showError } from "../../helper/logger";
import {
  deleteUploadImages,
  resetDr,
} from "../drSlice/drSlice";
import { resetMr, setMrProfileData } from "../mrSlice/mrSlice";

export const userLogin =
  (data: LoginProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: LoginApiResponse = await appOperation.guest.login(data);
      if (response?.code === 200) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(setLoginData(response?.data));
        appOperation.setCustomerToken(response?.data?.access_token);
        await AsyncStorage.setItem(
          USER_TOKEN_KEY,
          response?.data?.access_token
        );
        await AsyncStorage.setItem("id", response?.data?.id?.toString());
        if (response?.data?.client_id) {
          await AsyncStorage.setItem(
            CLIENT_ID,
            response?.data?.client_id?.toString()
          );
        }
        // await AsyncStorage.setItem(TAB_PARAMS_DATA, response?.data?.tab_params);
      }

      if (response?.data?.role_id === 100) {
        await AsyncStorage.setItem(LOGIN_TYPE, "DR");
        dispatch(doctorAppointmentList(2, 1));
        dispatch(DrEditProfile());
        await AsyncStorage.setItem(
          TAB_PARAMS_DATA,
          JSON.stringify(response?.data?.tab_params)
        );
        await AsyncStorage.setItem(
          TAB_PARAMS_REVERSE_DATA,
          JSON.stringify(response?.data?.tab_params_reversed)
        );

        NavigationService.reset(NAVIGATION_DR_BOTTOM_TAB_STACK);
      } else {
        await AsyncStorage.setItem(LOGIN_TYPE, "MR");
        dispatch(mrNearByDoctor(3));
        NavigationService.reset(NAVIGATION_MR_BOTTOM_TAB_STACK);
        await AsyncStorage.setItem(
          TAB_PARAMS_DATA,
          JSON.stringify(response?.data?.tab_params)
        );
        await AsyncStorage.setItem(
          TAB_PARAMS_REVERSE_DATA,
          JSON.stringify(response?.data?.tab_params_reversed)
        );
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const drLogin=(data: LoginProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: LoginApiResponse = await appOperation.guest.dr_login(data);
      
      if (response?.code === 200) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(setLoginData(response?.data));
        appOperation.setCustomerToken(response?.data?.access_token);
        await AsyncStorage.setItem(
          USER_TOKEN_KEY,
          response?.data?.access_token
        );
        await AsyncStorage.setItem(
          REFRESH_TOKEN_KEY,
          response?.data?.refresh_token
        );
        await AsyncStorage.setItem("id", response?.data?.id?.toString());
        if (response?.data?.client_id) {
          await AsyncStorage.setItem(
            CLIENT_ID,
            response?.data?.client_id?.toString()
          );
        }
      }
        await AsyncStorage.setItem(LOGIN_TYPE, "DR");
        
        dispatch(doctorAppointmentList(2, 1));
        dispatch(DrEditProfile());
        await AsyncStorage.setItem(
          TAB_PARAMS_DATA,
          JSON.stringify(response?.data?.tab_params)
        );
        await AsyncStorage.setItem(
          TAB_PARAMS_REVERSE_DATA,
          JSON.stringify(response?.data?.tab_params_reversed)
        );

        NavigationService.reset(NAVIGATION_DR_BOTTOM_TAB_STACK);
    } catch (e: any) {
      dispatch(setLoading(false));
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  }

  export const mrLogin=(data: LoginProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: LoginApiResponse = await appOperation.guest.mr_login(data);
      if (response?.code === 200) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(setLoginData(response?.data));
        appOperation.setCustomerToken(response?.data?.access_token);
        await AsyncStorage.setItem(
          USER_TOKEN_KEY,
          response?.data?.access_token
        );
        await AsyncStorage.setItem(
          REFRESH_TOKEN_KEY,
          response?.data?.refresh_token
        );
        await AsyncStorage.setItem("id", response?.data?.id?.toString());
        if (response?.data?.client_id) {
          await AsyncStorage.setItem(
            CLIENT_ID,
            response?.data?.client_id?.toString()
          );
        }
      }
        await AsyncStorage.setItem(LOGIN_TYPE, "MR");
        dispatch(mrNearByDoctor(3));
        NavigationService.reset(NAVIGATION_MR_BOTTOM_TAB_STACK);
        await AsyncStorage.setItem(
          TAB_PARAMS_DATA,
          JSON.stringify(response?.data?.tab_params)
        );
        await AsyncStorage.setItem(
          TAB_PARAMS_REVERSE_DATA,
          JSON.stringify(response?.data?.tab_params_reversed)
        );
      // }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  }

export const forgotPassword =
  (data: ForgotPasswordProps) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.guest.forgot_passwrod(data);
      // Toast.show(response?.message, Toast.LONG);

      if (response?.success == true) {
        dispatch(setForgotPasswordId(response?.data?.id));

        NavigationService.navigate(MOBILE_VERIFICATION);
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("eerrr", e);

      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const resetPassword =
  (data: LoginProps) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: LoginApiResponse =
        await appOperation.guest.reset_password(data);
      if (response?.code === 200) {
        Toast.show(response?.message, Toast.LONG);

        // NavigationService.navigate(LOGIN_SCREEN);
        NavigationService.navigate(WELCOME_SCREEN);
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onResend =
  (data: LoginProps) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: LoginApiResponse = await appOperation.guest.on_resend_otp(
        data
      );
      if (response?.code === 200) {
        Toast.show(response?.message, Toast.LONG);

        // NavigationService.navigate(LOGIN_SCREEN);
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
export const verifyOtp =
  (data: LoginProps) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: LoginApiResponse = await appOperation.guest.verify_otp(
        data
      );
      if (response?.success === true) {
        Toast.show(response?.message, Toast.LONG);

        NavigationService.navigate(RESET_PASSWORD_SCREEN);
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const onValidateSendotp =
  (data: any, onSuccess?: any) => async (dispatch: AppDispatch) => {
    try {
      console.log("data",data);
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.guest.on_validate_otp(data);
      if (response.success) {
        Toast.show(response?.message, Toast.LONG);
        onSuccess();
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      // console.log(e, "error of valid otp");
      console.log("eee===>>>>",e);
      
      showError(e?.message);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const verifyValidateOtps =
  (data: any, onSuccess: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.guest.verify_validate_otp(data);
      // setVerifyOtp(response?.success)
      dispatch(setVerifyOtp(response?.success));
      if (response.success) {
        onSuccess();
      }
      Toast.show(response?.message, Toast.LONG);
    } catch (e: any) {
      console.log("Error otp responseeee", e);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const onAadharValidateSendotp =
  (data: any, onSuccess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.guest.on_aadhar_validate_otp(
        data
      );

      if (response.success) {
        Toast.show(response?.message, Toast.LONG);
        onSuccess(response?.data);
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      // console.log(e, "error of valid otp");
      console.log("Adhar validate Error", e);
      if (e?.code == 504 || e?.code == 503) {
        dispatch(onAadharValidateSendotp(data, onSuccess));
      }

      showError(e?.message);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const aadharVerifyValidateOtps =
  (data: any, onSuccess: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.guest.aadhar_verify_validate_otp(
        data
      );
      // setVerifyOtp(response?.success)
      dispatch(setAadharVerifyOtp(response?.success));
      if (response.success) {
        onSuccess();
      }
      Toast.show(response?.message, Toast.LONG);
    } catch (e: any) {
      console.log("Error otp responseeee", e);
      // if(e?.code == 504 || e?.code == 503  ){
      //  dispatch( aadharVerifyValidateOtps(data,setModalVisibles))
      // }
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const onRegistrationValidateSendotp =
  (data: any, onSuccess?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.guest.on_aadhar_validate_otp(
        data
      );
      if (response.success) {
        Toast.show(response?.message, Toast.LONG);
        onSuccess(response?.data);
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      // console.log(e, "error of valid otp");
      console.log("Adhar validate Error", e);

      // showError(e?.message);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const logOut = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.log_out();
    if (response.success) {
      Toast.show(response?.message, Toast.LONG);
      AsyncStorage.removeItem(USER_TOKEN_KEY);
      NavigationService.reset(NAVIGATION_AUTH_STACK);
      dispatch(deleteUploadImages("profile"));
      dispatch(deleteUploadImages("hcpi"));
      dispatch(deleteUploadImages("degree"));
      dispatch(deleteUploadImages("aadhar"));
      dispatch(deleteUploadImages("gst"));
      dispatch(setMrProfileData());
      dispatch(resetAuth())
      dispatch(resetDr());
      dispatch(resetMr());
    }
  } catch (e: any) {
    console.log("error of logout", e);
    AsyncStorage.removeItem(USER_TOKEN_KEY);
    NavigationService.reset(NAVIGATION_AUTH_STACK);
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteAccount = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.delete_Account();
    if (response.success) {
      Toast.show(response?.message, Toast.LONG);
      AsyncStorage.removeItem(USER_TOKEN_KEY);
      NavigationService.reset(NAVIGATION_AUTH_STACK);
    }
  } catch (e: any) {
    console.log("error of logout", e);
    if (e.code == 401) {
      // Toast.show("Logout successfully", Toast.LONG);
      AsyncStorage.removeItem(USER_TOKEN_KEY);
      NavigationService.reset(NAVIGATION_AUTH_STACK);
    }
    // console.log("error of logout", e?.code);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateFcmToken =
  (location?: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      let fcmToken = await AsyncStorage.getItem(FCM_TOKEN_KEY);
     
      let data = {
        fcm_token: fcmToken,
        latitude: location?.latitude ? location?.latitude : null,
        longitude: location?.longitude ? location?.longitude : null,
      };
      
      const response: any = await appOperation.customer.update_fcm(data);
      console.log("updateFcmTokenresponse",response);
      
    } catch (e: any) {
      logger(e);
    }finally{
      dispatch(setLoading(false));
    }
  };
