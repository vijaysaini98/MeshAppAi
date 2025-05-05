import React, { useRef, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  Button,
  EIGHTEEN,
  FOURTEEN,
  Input,
  LIGHT,
  MEDIUM,
  THIRTY_EIGHT,
  Toolbar,
} from "../../common";
import KeyBoardAware from "../../common/KeyboardAware";
;
import { logoIcon } from "../../helper/ImageAssets";
import { styles } from "../../styles/styles";
import { Image, Keyboard, View } from "react-native";
import { placeHolderText } from "../../helper/Constants";
import NavigationService from "../../navigation/NavigationService";
import { LOGIN_SCREEN } from "../../navigation/routes";
import { resetPassword } from "../../slices/authSlice/authAction";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerSecond } from "../../common/SpinnerSecond";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import { AnimationSpinner } from "../../animation";

const ResetPassword = ({ route }) => {
  const dispatch = useDispatch();
  const { isLoading,forgotPasswordId } = useSelector((state) => {
    return state.auth;
  });
  const [userName, setUserName] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);


  const passwordInputRef = useRef(null);
  const onReset = async () => {
    if (!newPassword) {
      return Toast.show("New Password is Required ...", Toast.LONG);
    } else if (!confirmPassword) {
      return Toast.show("Confirm Password is Required ...", Toast.LONG);
    } else if (newPassword !== confirmPassword) {
      return Toast.show(
        "New Password and Confirm Password is to be same ...",
        Toast.LONG
      );
    } else {
      let data = {
        // otp: otp,
        user_id: forgotPasswordId,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      dispatch(resetPassword(data));
      Keyboard.dismiss();
      // NavigationService.navigate(LOGIN_SCREEN);
    }
  };

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
              Reset Password
            </AppText>

            <AppText
              style={styles.resetPassword}
              type={EIGHTEEN}
              weight={LIGHT}
            >
              You Can Now Reset
            </AppText>
            <AppText type={EIGHTEEN} weight={LIGHT}>
              Your Password
            </AppText>
          </View>
          <View style={styles.loginInputContainer}>
            <Input
              placeholder={placeHolderText.newPassword}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text.trim())}
              autoCapitalize="none"
              secureTextEntry={!isNewPasswordVisible}
              assignRef={(input: any) => {
                passwordInputRef.current = input;
              }}
              returnKeyType="next"
              isSecure
              // onSubmitEditing={() => onReset()}
              onPressVisible={() =>
                setIsNewPasswordVisible(!isNewPasswordVisible)
              }
            />
            <Input
              placeholder={placeHolderText.confirmPassword}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text.trim())}
              autoCapitalize="none"
              secureTextEntry={!isConfirmPasswordVisible}
              assignRef={(input: any) => {
                passwordInputRef.current = input;
              }}
              returnKeyType="done"
              isSecure
              // onSubmitEditing={() => onReset()}
              onPressVisible={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
            />
            <Button
              children="Reset"
              onPress={() => onReset()}
              containerStyle={styles.loginButton}
            />
          </View>
        </KeyBoardAware>
      </AppSafeAreaView>
    </>
  );
};

export default ResetPassword;
