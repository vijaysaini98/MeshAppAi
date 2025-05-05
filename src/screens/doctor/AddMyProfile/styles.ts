import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { universalPaddingHorizontal } from "../../../theme/dimens";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
  selfieContainer: {
    height: 110,
    borderColor: colors.border,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 16,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    width: 100,
  },
  subContainer: {
    alignSelf: "center",
    marginHorizontal: 40,
    marginVertical: 20,
  },
  selfieCamera: {
    height: 20,
    width: 18,
  },
  selfieCamera12: {
    height: 20,
    width: 18,
    position: "absolute",
    top: 172,
    zIndex: 999,
    left: 150,
  },
  selfieCamera1: {
    height: 100,
    width: 100,
  },
  textStyle: {
    textAlign: "center",
    marginTop: 10,
  },
  btnView: {
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
    // marginTop:75,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  phoneNoStyle: {
    width: "63%",
  },
  btnStyle: {
    width: "33%",
    marginTop: 35,
  },
  registrationText: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  subContainer1: {
    alignSelf: "center",
    marginHorizontal: 6,
  },
  topContainer: {
    width: "100%",
    height: "100%",
  },
  middleContainer: {
    alignSelf: "center",
    marginTop: 100,
  },
  requestContainer: {
    marginTop: 20,
  },
  claim: {
    alignSelf: "center",
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
  },
  pdf: {
    // flex: 1,
    width: 90,
    height: 90,
    borderRadius: 16,
  },
  consentContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  consentCheckBox: (consent) => ({
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: consent ? colors.buttonBg : "transparent",
    borderColor: colors.buttonBg,
  }),
  consentText: {
    textDecorationLine: "underline",
    textDecorationColor: colors.buttonBg,
    color: colors.buttonBg,
    marginRight: 10,
  },
  policyLink: {
    color: colors.buttonBg,
    textDecorationLine: "underline",
  },
  privacyPolicyContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
  },
  documentContainerStyle: {
    marginBottom: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    paddingHorizontal: 20,
  },
  verificationFieldStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default styles;
