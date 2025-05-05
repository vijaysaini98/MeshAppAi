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
}

const RadioButton = ({
  onPress,
  value,
  disabled,
  message,
  radioContainerStyle,
  appTextType,
  radioStyle,
}: RadioButtonProps) => {
  return (
    <TouchableOpacityView
      style={[styles.radioContainer, radioContainerStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[
          {
            width: 20,
            height: 20,
          },
          radioStyle,
        ]}
      >
        {value ? (
          <View style={styles.selectedUIFilter(colors)}>
            <View style={styles.selectedUIFilterInner(colors)} />
          </View>
        ) : (
          <View style={styles.unchecked(colors)} />
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
  selectedUIFilter: (colors) => ({
    // height: "100%",
    // width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.buttonBg,
    flex: 1,
  }),
  selectedUIFilterInner: (colors) => ({
    height: 14,
    width: 14,
    borderRadius: 10,
    backgroundColor: colors.buttonBg,
  }),

  unchecked: (colors) => ({
    borderRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.buttonBg,
  }),
  message: {
    // left: 10,
  },
});

export { RadioButton };
