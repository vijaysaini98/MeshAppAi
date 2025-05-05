import React, { useRef, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  BUTTON_BG,
  Button,
  FIFTEEN,
  Input,
  MEDIUM,
  NORMAL,
  THIRTY_EIGHT,
  TWELVE,
  Toolbar,
} from "../../common";
import KeyBoardAware from "../../common/KeyboardAware";
;
import { doctor, emailIcon, logoIcon } from "../../helper/ImageAssets";
import { styles } from "../../styles/styles";
import { Image, Keyboard, View } from "react-native";
import { FCM_TOKEN_KEY, LOGIN_TYPE, placeHolderText } from "../../helper/Constants";
import NavigationService from "../../navigation/NavigationService";
import {
  ADD_MR,
  ADD_MY_PROFILE,
  CLAIM_PROFILE,
  RECOVER_PASSWORD_SCREEN,
} from "../../navigation/routes";
import { drLogin, mrLogin, userLogin } from "../../slices/authSlice/authAction";
import Toast from "react-native-simple-toast";
import { validateEmail } from "../../helper/utility";
import { AnimationSpinner } from "../../animation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPrivacyPolicy } from "../../slices/authSlice/authSlice";
import { getMrCompanyList } from "../../slices/mrSlice/mrAction";

const Login = ({ route }) => {
  const { type } = route?.params;

  const { isLoading } = useAppSelector((state) => {
    return state.auth;
  });

  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const passwordInputRef = useRef(null);

  const onLogin = async () => {
    Keyboard.dismiss()
    let fcmToken = await AsyncStorage.getItem(FCM_TOKEN_KEY);

    if (!userName) {
      return Toast.show("Please Enter Email...", Toast.LONG);
    } else if (!validateEmail(userName)) {
      return Toast.show("Please Enter Valid Email...", Toast.LONG);
    } else if (!password) {
      return Toast.show("Please Enter Password...", Toast.LONG);
    } else {
      let data = {
        email: userName,
        password: password,
        fcm_token: fcmToken ? fcmToken : "fcmtoken",
      };
      if (type == "doctor") {
        dispatch(drLogin(data))
        //  await AsyncStorage.setItem(LOGIN_TYPE);
        await AsyncStorage.setItem(LOGIN_TYPE, "DR");
      } else {
        dispatch(mrLogin(data))
        await AsyncStorage.setItem(LOGIN_TYPE, "MR");
      }
      // dispatch(userLogin(data))
    }
  };

  const handleSignUpNavigation = () => {
    if (type == 'doctor') {
      NavigationService.navigate(ADD_MY_PROFILE)
      dispatch(dispatch(setPrivacyPolicy(false)))
    }
    else {
      dispatch(getMrCompanyList())
      dispatch(dispatch(setPrivacyPolicy(false)))
    }
  }
  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView isSecond>
        <Toolbar isBack />
        <KeyBoardAware isSecond>
          <Image
            source={logoIcon}
            resizeMode="contain"
            style={styles.welcomeLogo}
          />
          <View style={styles.alignCenter}>
            <AppText type={THIRTY_EIGHT} weight={MEDIUM}>
              Login
            </AppText>
          </View>
          <View style={styles.loginInputContainer}>
            <Input
              placeholder={placeHolderText.email}
              value={userName}
              onChangeText={(text) => setUserName(text.trim())}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              icon={emailIcon}
            />
            <Input
              placeholder={placeHolderText.password}
              value={password}
              onChangeText={(text) => setPassword(text.trim())}
              autoCapitalize="none"
              secureTextEntry={!isPasswordVisible}
              assignRef={(input: any) => {
                passwordInputRef.current = input;
              }}
              returnKeyType="done"
              isSecure
              onSubmitEditing={() => onLogin()}
              onPressVisible={() => setIsPasswordVisible(!isPasswordVisible)}
            />

            <AppText
              type={FIFTEEN}
              weight={MEDIUM}
              color={BUTTON_BG}
              style={styles.forgotPassword}
              onPress={() =>
                NavigationService.navigate(RECOVER_PASSWORD_SCREEN)
              }
            >
              Forgot Password?
            </AppText>
            <Button
              children="Login"
              onPress={() => onLogin()}
              containerStyle={styles.loginButton}
            />
            <AppText
              type={FIFTEEN}
              weight={NORMAL}
              style={[styles.forgotPassword, { alignSelf: 'center', marginTop: 20 }]}
              onPress={() => handleSignUpNavigation()}
            >
              {"Don't have an account?"}
              <AppText type={FIFTEEN} weight={MEDIUM} color={BUTTON_BG} >
                {" Sign Up"}
              </AppText>
            </AppText>
            {type === "doctor" && (
              <>
                <View style={styles.orContainer}>
                  <AppText weight={MEDIUM} type={TWELVE} style={styles.orText}>
                    OR
                  </AppText>
                </View>
                <Button
                  children="Search My Profile"
                  onPress={() => NavigationService.navigate(CLAIM_PROFILE)}
                  containerStyle={[
                    styles.searchProfileButton,
                    { marginBottom: 20 },
                  ]}
                />
              </>
            )}
          </View>
        </KeyBoardAware>
      </AppSafeAreaView>
    </>
  );
};

export default Login;
