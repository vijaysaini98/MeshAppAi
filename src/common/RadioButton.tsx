import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { colors } from "../theme/colors";
import TouchableOpacityView from "./TouchableOpacityView";
import { AppText, LIGHT, SIXTEEN } from "./AppText";

interface RadioButtonProps {
  onPress: () => void;
  value: boolean;
  disabled?: boolean;
  message?: string;
  radioContainerStyle?: StyleProp<ViewStyle>;
  radioStyle?: StyleProp<ViewStyle>;
  appTextType?: string;
  color?:string
}

const RadioButton = ({
  onPress,
  value,
  disabled,
  message,
  radioContainerStyle,
  appTextType,
  radioStyle,
  color
}: RadioButtonProps) => {
  return (
    <TouchableOpacityView
      style={[styles.radioContainer, radioContainerStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.radioStyle, radioStyle]}>
        {value ? (
          <View style={styles.selectedUIFilter(color)}>
            <View style={styles.selectedUIFilterInner(color)} />
          </View>
        ) : (
          <View style={styles.unchecked(color)} />
        )}
      </View>
      {message && (
        <AppText
          style={styles.message}
          type={appTextType ? appTextType : SIXTEEN}
          weight={LIGHT}
        >
          {message}
        </AppText>
      )}
    </TouchableOpacityView>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 5,
  },
  radioStyle: {
    width: 20,
    height: 20,
  },
  selectedUIFilter: (color) => ({
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color? color : colors.buttonBg,
    flex: 1,
  }),
  selectedUIFilterInner: (color) => ({
    height: 14,
    width: 14,
    borderRadius: 10,
    backgroundColor:color? color : colors.buttonBg,
  }),
  unchecked: (color) => ({
    borderRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: color? color : colors.buttonBg,
  }),
  message: {
    // left: 10,
  },
});

export { RadioButton };
