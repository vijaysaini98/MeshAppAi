import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { borderWidth, universalPaddingHorizontal } from "../../../theme/dimens";
import { fontFamily } from "../../../theme/typography";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: colors.mainBg,
    paddingTop: 20,
  },
  bigContainer: {
    gap: 5,
    marginTop: 15,
  },
  bigInputContainer: {
    borderWidth: borderWidth,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: universalPaddingHorizontal,
    backgroundColor: colors.white,
    minHeight: 100,
  },
  bigInput: {
    fontFamily: fontFamily,
    fontSize: 14,
    color: colors.defaultText,
  },
  submitButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    elevation: 10,
    backgroundColor: colors.mainBg,
    marginTop: 20,
    marginBottom: 20,
  },
  appointmentContainer: (isFocus: boolean) => ({
    borderWidth: 0.5,
    borderColor: isFocus ? colors.buttonBg : colors.second_text,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.white
  }),
  shadowStyle: {
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    // Android shadow
    elevation: 2,
  },
  countText: (isTrue: boolean) => ({
    alignSelf: "flex-end",
    color: isTrue ? colors.red : colors.defaultText,
  }),
  noLeadsContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 50
  },
  radioBtnContainer:{ 
    marginTop: 20 
  }
});

export default styles;