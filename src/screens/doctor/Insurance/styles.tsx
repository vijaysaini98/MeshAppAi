import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  typeOfAppointment: {
    marginTop: 20,
  },
  messageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  appointmentBox: {
    width: "48%",
  },
  appointmentContainer: (isFocus: boolean) => ({
    borderWidth: 0.5,
    borderColor: isFocus ? colors.buttonBg : colors.second_text,
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: "row",
    height: 60,
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
    elevation: 10,
    backgroundColor: colors.mainBg,
    bottom: 0,
    left: 0,
    right: 0,
  },
  requiredTextStyle:{ color: "red" },
});

export default styles;
