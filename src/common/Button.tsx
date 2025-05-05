import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { AppText } from ".";
import { buttonHeight } from "../theme/dimens";
import {
  BLACK,
  BUTTON_BG,
  BUTTON_TEXT,
  EIGHTEEN,
  PLACEHOLDER,
  SEMI_BOLD,
  SIXTEEN,
  WHITE,
} from "./AppText";
import { colors } from "../theme/colors";
import TouchableOpacityView from "./TouchableOpacityView";

interface ButtonProps extends TouchableOpacityProps {
  children?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  disabled?: boolean;
  isSecond?: boolean;
  loading?: boolean;
  onPress?: ()=> void | any;
}

const Button = ({
  children,
  containerStyle,
  titleStyle,
  disabled,
  onPress,
  isSecond,
  loading,
  ...rest
}: ButtonProps) => {
  
  return (
    <TouchableOpacityView
      style={[
        styles.buttonStyle(colors),
        containerStyle,
        disabled || loading ? { backgroundColor: colors.border } : {},
      ]}
      activeOpacity={1}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size={"small"} color={colors.buttonBg} />
      ) : (
        <AppText
          type={EIGHTEEN}
          color={isSecond || disabled ? BUTTON_TEXT : WHITE}
          weight={SEMI_BOLD}
          style={titleStyle}
        >
          {children}
        </AppText>
      )}
    </TouchableOpacityView>
  );
};
const styles = StyleSheet.create({
  buttonStyle: (colors?:string) => ({
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: buttonHeight,
    borderRadius: 8,
    backgroundColor: colors.buttonBg,
  }),
});

export { Button };
