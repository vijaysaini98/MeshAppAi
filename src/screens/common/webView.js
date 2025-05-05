import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { AppSafeAreaView, AppText, THIRTEEN, Toolbar } from "../../common";
import TouchableOpacityView from "../../common/TouchableOpacityView";
;
import { checkbox_check, checkbox_uncheck } from "../../helper/ImageAssets";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPrivacyPolicy } from "../../slices/authSlice/authSlice";
import NavigationService from "../../navigation/NavigationService";
import { config } from "../../../config/config";
import { colors } from "../../theme/colors"; // Ensure you have this import

const WebViewScreen = ({ route }) => {

  const { type } = route?.params ?? ""

  const webRef = useRef();
  const dispatch = useAppDispatch();

  const { privacyPolicy } = useAppSelector((state) => state?.auth)

  const [isDisabled, setIsDisabled] = useState(true);
  const [isConsent, setIsConsent] = useState(privacyPolicy);

  const _onScroll = (event: WebViewScrollEvent) => {
    if (event.nativeEvent.contentOffset.y > 2900) {
      setIsDisabled(true);
    } else if (event.nativeEvent.contentOffset.y < 2900) {
      setIsDisabled(false);
    }
  };

  // useEffect(() => {
  //   if (isConsent) {
  //     dispatch(setPrivacyPolicy(isConsent));
  //     NavigationService.goBack();
  //   }
  // }, [isConsent, dispatch]);

  const handleConsent = () => {
    setIsConsent(!isConsent)
    dispatch(setPrivacyPolicy(!privacyPolicy));
    if (!privacyPolicy) {
      NavigationService.goBack();
    }
  }

  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <Toolbar title="Privacy Policy" />
      <WebView
        ref={webRef}
        source={{ uri: `${config.IMAGE_URL}public/privacyPolicy.html` }}
        onScroll={_onScroll}
      />
      {(type == 'doctor' && isDisabled) && (
        <TouchableOpacityView
          // onPress={() => setIsConsent(true)}
          onPress={() => handleConsent()}
          style={styles.consentContainer}
        >
          <Image
            source={isConsent ? checkbox_check : checkbox_uncheck}
            style={styles.consentIcon}
            tintColor={colors.buttonBg}
          />
          <AppText type={THIRTEEN} style={styles.consentText}>
            {
              "I,  affirm that I am not employed by any government agency. I am an independent practitioner, committed to providing medical care without any government affiliation or influence. This declaration is made voluntarily and is true to the best of my knowledge."
            }
          </AppText>
        </TouchableOpacityView>
      )}
    </AppSafeAreaView>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  consentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  consentText: {
    marginLeft: 10,
    color: colors.buttonBg,
    width: "95%",
  },
  consentIcon: {
    width: 20,
    height: 20
  }
});
