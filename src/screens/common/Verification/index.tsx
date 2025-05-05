import React, { useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  Button,
  EIGHTEEN,
  FOURTEEN,
  LIGHT,
  MEDIUM,
  SIXTEEN,
  THIRTY_EIGHT,
  Toolbar,
} from "../../../common";

;
import OTPInputView from "@twotalltotems/react-native-otp-input";

// import {styles} from '../../../styles/styles';
import { View, Alert, Image } from "react-native";
import KeyBoardAware from "../../../common/KeyboardAware";
import { logoIcon } from "../../../helper/ImageAssets";
import styles from "./styles";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import NavigationService from "../../../navigation/NavigationService";
import { RESET_PASSWORD_SCREEN } from "../../../navigation/routes";
import { useDispatch, useSelector } from "react-redux";
import { onResend, verifyOtp } from "../../../slices/authSlice/authAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../theme/colors";
import { SpinnerSecond } from "../../../common/SpinnerSecond";
import { AnimationSpinner } from "../../../animation";

const Verification = () => {
  const dispatch = useDispatch();
  const [filledCode, setFilledCode] = useState();
  const { forgotPasswordId, isLoading } = useSelector((state) => {
    return state.auth;
  });

  const submitOtp = async () => {
    let data = {
      user_id: forgotPasswordId,
      otp: filledCode,
    };
    dispatch(verifyOtp(data));
  };
  
  const onresendOtp = async () => {
    let data = {
      user_id: JSON.stringify(forgotPasswordId),
    };
    dispatch(onResend(data));
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
              Verification
            </AppText>

            <AppText
              style={styles.verificationContent}
              type={EIGHTEEN}
              weight={LIGHT}
            >
              Enter The OTP
            </AppText>
          </View>
          <OTPInputView
            style={{
              width: "90%",
              height: 200,
              alignSelf: "center",
            }}
            pinCount={4}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code) => {
              setFilledCode(code);
            }}
          />
          <View style={styles.resendView}>
            <AppText style={styles.lineColor} type={SIXTEEN}>
              If you didn't receive the code.{" "}
            </AppText>
            <TouchableOpacityView onPress={() => onresendOtp()}>
              <AppText type={SIXTEEN} style={styles.resendbtn}>
                Resend
              </AppText>
            </TouchableOpacityView>
          </View>
          <Button
            onPress={() => submitOtp()}
            children="Submit"
            containerStyle={[styles.loginButton, { marginHorizontal: 20 }]}
          />
        </KeyBoardAware>
      </AppSafeAreaView>
    </>
  );
};

export default Verification;
