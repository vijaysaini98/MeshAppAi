import React, { useEffect } from "react";
import { AppSafeAreaView } from "../../common";
import NavigationService from "../../navigation/NavigationService";
import {
  NAVIGATION_AUTH_STACK,
  NAVIGATION_DR_BOTTOM_TAB_STACK,
  NAVIGATION_MR_BOTTOM_TAB_STACK,
  REQUEST_APPOINTMENT_SCREEN,
} from "../../navigation/routes";
import KeyBoardAware from "../../common/KeyboardAware";
import { SpinnerSecond } from "../../common/SpinnerSecond";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_TYPE, ROLE_ID, USER_TOKEN_KEY } from "../../helper/Constants";
import { useAppDispatch } from "../../store/hooks";
import { MrProfileData } from "../../slices/mrSlice/mrAction";
import { DrEditProfile } from "../../slices/drSlice/drAction";

const AuthLoading = () => {
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   setTimeout(() => {
  //     NavigationService.reset(NAVIGATION_AUTH_STACK);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    bootstrapAsync();
   
   
  }, []);


  // const bootstrapAsync = async () => {
  //   try {
  //     const customerToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
  //     const loginType = await AsyncStorage.getItem(LOGIN_TYPE);


  //     customerToken
  //       ? loginType === "DR"
  //         ? (NavigationService.reset(NAVIGATION_DR_BOTTOM_TAB_STACK)
  //         dispatch(DrEditProfile());
  //       )
  //         : (NavigationService.reset(NAVIGATION_MR_BOTTOM_TAB_STACK)
  //         dispatch(MrProfileData());
  //       )
  //       : NavigationService.reset(NAVIGATION_AUTH_STACK);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const bootstrapAsync = async () => {
    try {
      const customerToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
      const loginType = await AsyncStorage.getItem(LOGIN_TYPE);
  
      if (customerToken) {
        if (loginType === "DR") {
          NavigationService.reset(NAVIGATION_DR_BOTTOM_TAB_STACK);
          dispatch(DrEditProfile());
        } else {
          NavigationService.reset(NAVIGATION_MR_BOTTOM_TAB_STACK);
          dispatch(MrProfileData());
        }
      } else {
        NavigationService.reset(NAVIGATION_AUTH_STACK);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppSafeAreaView>
      <KeyBoardAware>
        <SpinnerSecond loading={true} />
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default AuthLoading;
