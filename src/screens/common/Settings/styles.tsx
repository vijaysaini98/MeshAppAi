import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { inputHeight, universalPaddingHorizontal } from "../../../theme/dimens";

const styles = StyleSheet.create({
  nameContainer: {
    marginTop: 50,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  nameInputContainer: {
    width: "80%",
  },
  nameEditeBtn: (isTrue: boolean) => ({
    backgroundColor: isTrue ? colors.buttonBg : colors.border,
    height: inputHeight,
    marginTop: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  }),
  btnView: {
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
  },
  availabilityView: {
    height: 60,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 6,
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  availableStyle: {
    opacity: 0.5,
    marginHorizontal: 16,
    alignSelf: "center",
  },
  addBankView: {
    backgroundColor: colors.bg_second,
    height: 86,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addBankText: {
    alignSelf: "center",
  },
  addBankLogo: {
    height: 30,
    width: 30,
  },
  addBankView1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 35,
    marginHorizontal: 25,
  },
  bankDetailView: { backgroundColor: colors.bg_second },
  mapView: { marginBottom: 10 },
  mapSubView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginVertical: 10,
  },
  bankValueStyle: {
    alignSelf: "flex-start",
    width: "60%",
  },
  changePasswordBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: colors.border,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  iconStyle: {
    height: 22,
    width: 22,
  },
  changePassTabStyle: {
    marginTop: 15,
    width: "100%",
    marginHorizontal: 0,
    height: inputHeight,
    backgroundColor: colors.border,
    paddingHorizontal: universalPaddingHorizontal,
  },
  tabTitleStyle: {
    paddingLeft: 0,
  },
  changePassBtn: {
    marginTop: 20
  }
});

export default styles;