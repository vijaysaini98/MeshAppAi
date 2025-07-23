import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
  },
  typeOfAppointment: {
    marginTop: 20,
  },
  messageBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  appointmentBox: {
    paddingHorizontal: 10,
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
  policyLink: {
    color: colors.textLine,
    // textDecorationLine: "underline",
  },
  privacyClickContainer: {
    flexDirection: "row",
    marginVertical: 23,
  },
  concentImageStyle: {
    width: 16,
    height: 16,
    marginEnd: 2,
    marginTop: 2,
  },
  btnView: {
    flex: 1,
    marginTop: 20,
    elevation: 10,
    backgroundColor: colors.mainBg,
    justifyContent: "flex-end",
    bottom: 0,
    left: 0,
    right: 0,
  },
  requiredTextStyle: { 
    color: "red" 
  },
  shadowStyle: {
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    // Android shadow
    elevation: 2,
  },
});

export default styles;
