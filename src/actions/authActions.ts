import AsyncStorage from "@react-native-async-storage/async-storage";
import { appOperation } from "../appOperation";
import { logger, showError } from "../helper/logger";
import {
  ForgotPasswordProps,
  LoginProps,
  RegistrationProps,
  SendOtpRegistrationProps,
} from "../helper/types";
import { setAppinfo, setLoading, setUserData } from "../slices/authSlice/authSlice";
import { AppDispatch } from "../store/store";
import { USER_TOKEN_KEY } from "../helper/Constants";
import NavigationService from "../navigation/NavigationService";
import {
  ADD_MY_PROFILE,
  ENTER_OTP_SCREEN,
  NAVIGATION_AUTH_STACK,
  NAVIGATION_BOTTOM_TAB_STACK,
  NAVIGATION_DRAWER_STACK,
  OTP_VERIFY_SCREEN,
} from "../navigation/routes";
import Toast from "react-native-simple-toast";

// import {getUserProfile} from './accountActions';

export const sendOtp =
  (data: SendOtpRegistrationProps, isNavigate = false) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.guest.send_otp(data);
      if (response.success) {
        showError(response.message);
        isNavigate
          ? NavigationService.navigate(OTP_VERIFY_SCREEN, { data })
          : null;
      }
    } catch (e: any) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const register =
  (data: RegistrationProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.guest.register(data);
      if (!response.success) {
        showError(response.message);
      } else {
        appOperation.setCustomerToken(response?.data?.token);
        await AsyncStorage.setItem(USER_TOKEN_KEY, response?.data?.token);
        NavigationService.reset(NAVIGATION_DRAWER_STACK);
        dispatch(getUserProfile());
      }
    } catch (e: any) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };


export const login = (data: LoginProps) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.guest.login(data);

    if (!response.success) {
      showError(response.message);
    } else {
      if (response && response?.data && response?.data["2fa"] === 0) {
        appOperation.setCustomerToken(response?.data?.token);
        await AsyncStorage.setItem(USER_TOKEN_KEY, response?.data?.token);
        NavigationService.reset(NAVIGATION_DRAWER_STACK);
        dispatch(getUserProfile());
      } else {
        dispatch(setUserData(response?.data));
        NavigationService.navigate(ENTER_OTP_SCREEN, {
          title: "Verify Authenticator Code",
          isLogin: true,
          code: response?.data["2fa"],
        });
      }
    }
  } catch (e: any) {
    logger(e);
    showError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const forgotPassword =
  (data: ForgotPasswordProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.guest.forgot(data);
      if (!response.success) {
        showError(response.message);
      } else {
        showError(response.message);
        NavigationService.reset(NAVIGATION_AUTH_STACK);
      }
    } catch (e: any) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const verifyOtp = (data: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.guest.verify_otp(data);
    if (!response.success) {
      showError(response.message);
    } else {
      appOperation.setCustomerToken(response?.data?.token);
      await AsyncStorage.setItem(USER_TOKEN_KEY, response?.data?.token);
      NavigationService.navigate(NAVIGATION_DRAWER_STACK);
      dispatch(getUserProfile());
    }
  } catch (e: any) {
    logger(e);
    showError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutAction = () => async () => {
  appOperation.setCustomerToken("");
  await AsyncStorage.removeItem(USER_TOKEN_KEY);
  NavigationService.reset(NAVIGATION_AUTH_STACK);
};

export const getAppVersion = (data: any) => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.guest.appVersion();
    if (response.success) {
      dispatch(setAppinfo(response?.data))
    }
  } catch (e: any) {
    logger(e);
  } finally {
  }
};

// export const verifyValidateOtps =
//   (data: any, setModalVisibless: any) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading(true));
//       const response: any = await appOperation.guest.verify_validate_otp(data);
//       //
//       if (response.success) {
//         Toast.show(response?.message, Toast.LONG);
//         setModalVisibless(false);

//       }
//     } catch (e: any) {
//       console.log("error of verify otppppppp", e);
//       logger(e);
//       showError(e?.message);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
