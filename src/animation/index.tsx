import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { animation, animation2 } from "../helper/ImageAssets";
import LottieView from "lottie-react-native";
import { colors } from "../theme/colors";

export const AnimationSpinner = () => {
  return (
    <View style={styles.conatiner}>
      <LottieView
        style={styles.loader}
        source={Platform.OS == "ios" ? animation2 : animation}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // backgroundColor: colors.loaderBackground,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1111,
  },
  loader: {
    height: 80,
    width: 80,
    alignSelf: "center",
  },
});
