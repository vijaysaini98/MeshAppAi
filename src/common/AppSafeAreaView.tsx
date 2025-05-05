/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from "react";
import {
  ImageBackground,
  Platform,
  StatusBar,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../theme/commonStyles";
import { colors } from "../theme/colors";
import { mainBg } from "../helper/ImageAssets";

interface AppSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
  source?: string;
  isMargin?: boolean;
  statusColor?: string;
  isSecond?: boolean;
  isLight?: boolean;
}

const AppSafeAreaView = ({
  children,
  style,
  statusColor,
  isMargin = true,
  isSecond,
  isLight,
}: AppSafeAreaViewProps) => {
  return Platform.OS === "ios" ? (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      style={[
        {
          flex: 1,
          paddingTop: 40,
        },
        style,
      ]}
    >
      <StatusBar translucent={false} />
      {isSecond ? (
        <ImageBackground
          source={mainBg}
          resizeMethod="auto"
          style={commonStyles.ImageBackgroundSize}
        >
          {children}
        </ImageBackground>
      ) : (
        children
      )}
    </SafeAreaView>
  ) : (
    <View style={[commonStyles.screenSize, style]}>
      <StatusBar
        translucent
        backgroundColor={
          statusColor
            ? statusColor
            : isSecond
            ? colors.transparent
            : colors.mainBg
        }
        barStyle={isLight ? "light-content" : "dark-content"}
      />
      {isSecond ? (
        <ImageBackground
          source={mainBg}
          resizeMethod="auto"
          style={commonStyles.ImageBackgroundSize}
        >
          {children}
        </ImageBackground>
      ) : (
        children
      )}
    </View>
  );
};

export { AppSafeAreaView };
