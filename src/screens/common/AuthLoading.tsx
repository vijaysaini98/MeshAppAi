import React, { useEffect, useState } from "react";
import { AppSafeAreaView } from "../../common";
import NavigationService from "../../navigation/NavigationService";
import {
  NAVIGATION_AUTH_STACK,
  NAVIGATION_DR_BOTTOM_TAB_STACK,
  NAVIGATION_MR_BOTTOM_TAB_STACK,
} from "../../navigation/routes";
import { SpinnerSecond } from "../../common/SpinnerSecond";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_TYPE, USER_TOKEN_KEY } from "../../helper/Constants";
import { useAppDispatch } from "../../store/hooks";
import { MrProfileData } from "../../slices/mrSlice/mrAction";
import { DrEditProfile } from "../../slices/drSlice/drAction";
import { authAmination } from "../../helper/ImageAssets";
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { Screen, universalPaddingHorizontal } from "../../theme/dimens";
import { getAddvertisment } from "../../slices/authSlice/authAction";



const AuthLoading = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      bootstrapAsync();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  const bootstrapAsync = async () => {
    try {
      const customerToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
      const loginType = await AsyncStorage.getItem(LOGIN_TYPE);

      if (customerToken) {
         dispatch(getAddvertisment()); 
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
      <View style={styles.topContainer}>
        <AnimatedLottieView
          style={styles.animation}
          source={authAmination}
          autoPlay
          loop
        />
        <SpinnerSecond loading={true} />
      </View>
    </AppSafeAreaView>
  );
};

export default AuthLoading;

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "white",
  },

  animation: {
    height: Screen.Height * 0.6,
    width: Screen.Width - universalPaddingHorizontal,
  },
 
});
