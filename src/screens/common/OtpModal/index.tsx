import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { AppText, BOLD, Button, EIGHTEEN, FOURTEEN, MEDIUM, SIXTEEN, THIRTY, TWENTY } from "../../../common";
import { colors } from "../../../theme/colors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { claimProfileBottomSheet } from "../../../helper/ImageAssets";
import { universalPaddingHorizontal } from "../../../theme/dimens";

const RESEND_OTP_TIME_LIMIT = 60; // 30 secs

let resendOtpTimerInterval;

const OtpModal = ({
  isModalVisible,
  onBackdropPress,
  onBackButtonPress,
  handleTextChange,
  onPress,
  disabled,
  optModalType,
  setFilledCode,
  handleResendOtp,
  modalType,
  handleWaytoLogin
}) => {
  const dispatch = useAppDispatch();
  const { isBtnLoading } = useAppSelector((state) => state.auth);

  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(RESEND_OTP_TIME_LIMIT);

  useEffect(() => {
    if (isModalVisible) {
      startResendOtpTimer();
    } else {
      clearInterval(resendOtpTimerInterval);
      setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    }
    return () => {
      clearInterval(resendOtpTimerInterval);
    };
  }, [isModalVisible]);

  useEffect(() => {
    if (resendButtonDisabledTime <= 0) {
      clearInterval(resendOtpTimerInterval);
    }
  }, [resendButtonDisabledTime]);

  const startResendOtpTimer = () => {
    clearInterval(resendOtpTimerInterval);
    resendOtpTimerInterval = setInterval(() => {
      setResendButtonDisabledTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(resendOtpTimerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const onClickResend = () => {
    handleResendOtp();
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackButtonPress}
    >
{modalType == 'OtpModal'   ?    (
  <View style={styles.modalContent}>
        <AppText
          weight={BOLD}
          style={[styles.modalTitle, { color: colors.buttonBg, textDecorationLine: 'underline' }]} type={EIGHTEEN}>
          {optModalType == 'phone' ? "OTP Send to your Phone Number OR Email ID" : "OTP Send to your Aadhar Registered Phone Number"}
        </AppText>
        <AppText
          weight={MEDIUM}
          style={styles.modalTitle} type={EIGHTEEN}>
          Enter the OTP
        </AppText>
        <OTPInputView
          style={styles.otpInputView}
          pinCount={optModalType == "phone" ? 4 : 6}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.codeInputFieldStyle}
          codeInputHighlightStyle={styles.codeInputHighlightStyle}
          onCodeFilled={handleTextChange}
        />
        {optModalType !== 'phone' && (
          resendButtonDisabledTime > 0 ? (
            <AppText
              type={FOURTEEN}
              style={styles.resendText}
            >
              {`Resend OTP in ${resendButtonDisabledTime} seconds`}
            </AppText>
          ) : (
            <AppText
              onPress={onClickResend}
              type={FOURTEEN}
              weight={MEDIUM}
              style={styles.resendLink}
            >
              {"Resend OTP"}
            </AppText>
          )
        )}
        <Button
          onPress={onPress}
          containerStyle={styles.submitButton}
          children="Submit"
          disabled={disabled}
          loading={isBtnLoading}
        />
      </View>)
      :
      (<View
          style={{
            // flex: 1,
            width:"100%",
            borderTopLeftRadius: 40, // Adjust the radius as needed
            borderTopRightRadius: 40,
            backgroundColor:colors.white,
            overflow:"hidden",
            height:400,
            bottom:0,
            position:'absolute',
          }}
        >
          <ImageBackground
            source={claimProfileBottomSheet}
            // style={styles.topContainer}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <View 
            // style={styles.middleContainer}
            style={{
              alignSelf: "center",
              marginTop: 100,
            }}
            >
              <AppText type={THIRTY}>Congratulations</AppText>
              <View 
              // style={styles.requestContainer}
              style={{
                marginTop: 20,
              }}
              >
               <AppText 
                // style={styles.claim} 
                style={{
                  alignSelf: "center",
                }}
                type={TWENTY}>
                  Your Claim Request Is
                </AppText>
               <AppText 
                // style={styles.claim} 
                style={{
                  alignSelf: "center",
                }}
                type={TWENTY}>
                  Sucessfully Sent. Your
                </AppText>
               <AppText 
                // style={styles.claim} 
                style={{
                  alignSelf: "center",
                }}
                type={TWENTY}>
                  Login Id And Password Will
                </AppText>
               <AppText 
                // style={styles.claim} 
                style={{
                  alignSelf: "center",
                }}
                type={TWENTY}>
                  Be Sent To You In Your
                </AppText>
               <AppText 
                // style={styles.claim} 
                style={{
                  alignSelf: "center",
                }}
                type={TWENTY}>
                  Mail Soon.....
                </AppText>
              </View>
            </View>
            <View 
            // style={styles.buttonContainer}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: universalPaddingHorizontal,
              elevation: 10,
              backgroundColor: colors.mainBg,
            }}
            >
              <Button
                // onPress={() => {
                //   // refRBSheet?.current?.close();
                //   NavigationService.navigate(WELCOME_SCREEN);
                // }}
                onPress={handleWaytoLogin}
                children="Way to Login"
              />
            </View>
          </ImageBackground>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: 350,
    width: "100%",
    backgroundColor: "#ffff",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  modalTitle: {
    textAlign: "center",
    marginTop: 10,
  },
  otpInputView: {
    width: "100%",
    height: 100,
    alignSelf: "center"
  },
  codeInputFieldStyle: {
    width: 50,
    height: 70,
    borderWidth: 2,
    color: colors.buttonBg,
    borderRadius: 16,
    fontSize: 32,
    marginTop: 30
  },
  codeInputHighlightStyle: {
    color: colors.buttonBg,
    backgroundColor: colors.otpBg,
    borderColor: colors.buttonBg
  },
  resendText: {
    textAlign: "center",
    marginTop: 20,
  },
  resendLink: {
    textAlign: "center",
    textDecorationLine: 'underline',
    color: colors.buttonBg,
    marginTop: 20
  },
  submitButton: {
    marginHorizontal: 20,
    marginTop: 20,
    width: "50%"
  }
});

export default OtpModal;
