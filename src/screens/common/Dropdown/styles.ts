import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { universalPaddingHorizontalMedium } from "../../../theme/dimens";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBg,
    marginTop: 15,
    gap:5
  },
  dropdown: {
    height: 60,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: universalPaddingHorizontalMedium,
  },
  icon: {
    // marginRight: 5,
    width: 18,
    height: 10,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: colors.place_holder,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.black,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles;
