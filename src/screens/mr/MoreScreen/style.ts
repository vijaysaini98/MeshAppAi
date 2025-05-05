import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  profileImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  departmentStyle: {
    height: 22,
    width: 130,
    borderRadius: 100,
    backgroundColor: colors.buttonBg,
    marginVertical: 5,
    // paddingVertical:5,
    justifyContent: 'center'
  },
  departmentText: {
    color: colors.white,
    textAlign: "center",
    textAlignVertical: "center",
    // flex: 1,
  },
  divisionText: {
    color: colors.white,
    textAlign: "center",
    textAlignVertical: "center",
    // flex: 1,
  },
  divisionStyle: {
    height: 22,
    paddingHorizontal: 15,
    borderRadius: 100,
    backgroundColor: colors.loader,
    marginLeft: 0,
    justifyContent: 'center'
  },
  anatomyStyle: {
    height: 22,
    paddingHorizontal: 15,
    borderRadius: 100,
    backgroundColor: colors.loader,
    marginLeft: 5,
  },
  // subContainer: {
  //   flexDirection: "row",
  //   // marginLeft: 10,
  //   marginHorizontal:5,
  //   marginTop: 30,
  //   width:'100%'
  // },
  subContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 30,
    gap: 10
  },
  nameView: {
    marginLeft: 10,
  },
  divisiontextStyle: { marginVertical: 5 },
  departmentView: { flexDirection: "row" },
  paymentStyle: {
    marginTop: 50,
  },
  settingStyle: {
    marginTop: 20,
  },
  editIconStyle: {
    alignSelf: "center",
    borderRadius: 80,
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: colors.white,
    padding: 5,
    borderWidth: 0.8,
    borderColor: colors.bg_one_dark
  },
  profileImageContainer: {
    backgroundColor: colors.white,
    width: 141,
    height: 141,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 70,
    borderWidth: 1,
    borderColor: colors.buttonBg,
  },
  divisionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
    alignItems: "center",
  },
  profileEditIcon: {
    height: 20,
    width: 20
  }
});
export default styles;
