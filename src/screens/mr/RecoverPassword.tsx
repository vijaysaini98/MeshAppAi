import React, { useRef, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  Button,
  Input,
  LIGHT,
  MEDIUM,
  SIXTEEN,
  THIRTY_EIGHT,
  Toolbar,
} from "../../common";
import KeyBoardAware from "../../common/KeyboardAware";
;
import {
  emailIcon,
  logoIcon,
  phoneNumber_Icon,
} from "../../helper/ImageAssets";
import { styles } from "../../styles/styles";
import { Image, Keyboard, View } from "react-native";
import { placeHolderText } from "../../helper/Constants";
import NavigationService from "../../navigation/NavigationService";
import { MOBILE_VERIFICATION } from "../../navigation/routes";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../slices/authSlice/authAction";
import Toast from "react-native-simple-toast";
import { validateEmail } from "../../helper/utility";
import { SpinnerSecond } from "../../common/SpinnerSecond";
import { AnimationSpinner } from "../../animation";
import { colors } from "../../theme/colors";

const RecoverPassword = () => {
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => {
    return state.auth;
  });
  const onPress = () => {
    if (validateEmail(userName)) {
      let data = {
        email: userName,
      };
      return dispatch(forgotPassword(data));
    }
    if (phoneNumber.length === 10) {
      let data = {
        phone_number: phoneNumber,
      };
      return dispatch(forgotPassword(data));
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
            <AppText style={styles.resetPassword} type={SIXTEEN} weight={LIGHT}>
              You Will Receive Password Reset 
            </AppText>
            <AppText type={SIXTEEN} weight={LIGHT}>
             Instructions Via Email OR Phone Number
            </AppText>
          </View>
          <View style={styles.loginInputContainer}>
            <Input
              placeholder={placeHolderText.emailAdd}
              value={userName}
              onChangeText={(text) => setUserName(text.trim())}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
              icon={emailIcon}
            />
            <Button
              children="Send OTP"
              onPress={() => onPress()}
              containerStyle={[styles.loginButton, { marginTop: 31 }]}
            />
          </View>
        </KeyBoardAware>
      </AppSafeAreaView>
    </>
  );
};

export default RecoverPassword;
