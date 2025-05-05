import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { borderWidth, universalPaddingHorizontal } from "../../../theme/dimens";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.border,
    height: 140,
  },
  welcomeLogo: {
    height: 140,
    width: 140,
    position: "absolute",
    alignSelf: "center",
    top: 60,
    borderWidth: borderWidth,
    borderColor: colors.bg_one_dark,
    borderRadius: 70,
    backgroundColor: colors.white,
  },
  alignCenter: {
    alignItems: "center",
    marginTop: 70,
  },
  verificationContent: {
    marginTop: 20,
    textAlign: "center",
  },
  loginButton: {
    marginTop: "10%",
    marginBottom: 8,
  },
  underlineStyleBase: {
    width: 60,
    height: 77,
    borderWidth: 2,
    marginBottom: 50,
    color: colors.buttonBg,
    borderRadius: 16,
    fontSize: 32,
  },
  underlineStyleHighLighted: {
    color: colors.border,
  },
  resendbtn: {
    color: colors.defaultText,
  },
  resendView: { flexDirection: "row", alignSelf: "center" },
  lineColor: { color: colors.textLine },
  sendMessageBottomSheet: {
    alignSelf: "center",
  },
  typeOfAppointment: {
    marginTop: 30,
  },
  messageBox: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  appointmentBox: {
    width: "48%",
  },
  feeType: {
    marginTop: 20,
  },
  appointmentContainer: {
    borderWidth: 0.5,
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: "row",
    height: 60,
  },
  timeContainer: {
    borderWidth: 0.5,
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: "row",
    height: 60,
    width: "48%",
  },
  message: {
    left: 10,
  },
  time: {
    alignSelf: "center",
    textAlign: "center",
    flex: 1,
  },
  slot: {
    marginTop: 8,
    // marginBottom: 6,
  },
  inputContainer: {
    marginTop: 15,
    height: 60,
    borderWidth: borderWidth,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: universalPaddingHorizontal,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    // flex: 1,
    // marginHorizontal: 25,
  },
  calenderStyle: {
    justifyContent: "space-between",
  },
  locationIcon: {
    height: 18,
    width: 18,
  },
  downArrow: {
    height: 15,
    width: 15,
    marginStart: 10,
  },
  bellIcon: {
    height: 20,
    width: 20,
  },
  homeToolContainer4: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    justifyContent: "center",
  },
  selectDate: {
    marginTop: 20,
  },
  department: {
    backgroundColor: colors.buttonBg,
  },
  idContainer: {
    backgroundColor: colors.loader,
    // paddingHorizontal: universalPaddingHorizontal,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
  },
  divisionText: {
    marginTop: 30,
  },
  subContainer: {
    // marginHorizontal:16
  },
  divisionContainer: {
    flexDirection: "row",
  },
  idContainer1: {
    backgroundColor: colors.buttonBg,
    // paddingHorizontal: universalPaddingHorizontal,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    marginHorizontal: 10,
  },
  idContainer2: {
    backgroundColor: colors.buttonBg,
    // paddingHorizontal: universalPaddingHorizontal,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
  },
  appointmentDate: {
    borderWidth: 2,
    height: 87,
    borderColor: colors.border,
    marginTop: 20,
    borderRadius: 6,
    flexDirection: "row",
  },
  mainContainer: {
    backgroundColor: colors.mainBg,
  },
  calendar_type: {
    height: 54,
    width: 54,
    alignSelf: "center",
    marginHorizontal: 16,
  },
  dateText: {
    alignSelf: "center",
  },
  rejectBtn: {
    backgroundColor: colors.loader,
    marginTop: 36,
  },
  accepttBtn: {
    marginTop: 15,
    marginBottom: 60,
  },
  rescheduleButton: {
    marginHorizontal: universalPaddingHorizontal,
    backgroundColor: colors.buttonBg,
    marginBottom: 16,
    // flex: 1,
    // marginEnd: 5,
    height: 50,
    // marginStart: 5,
  },
});

export default styles;
