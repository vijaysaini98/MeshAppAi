import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import {
  borderWidth,
  inputHeight,
  universalPaddingHorizontal,
} from "../../../theme/dimens";

const styles = StyleSheet.create({
  nameContainer: {
    marginTop: 50,
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
  dateContainer: {
    height: 60,
    backgroundColor: colors.mainBg,
    marginHorizontal: 36,
  },
  container: {
    flex: 1,
    backgroundColor: colors.mainBg,
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
    marginHorizontal: 25,
  },
  calenderStyle: {
    justifyContent: "space-between",
  },
  typeText: {
    marginTop:30,
    marginBottom:10
    // marginTop: 55,
    // marginHorizontal:25
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
    borderWidth: 2,
    padding: 18,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: "row",
    height: 60,
    borderColor: colors.border,
  },
  message: {
    left: 10,
  },
  timeContainer: {
    // borderWidth: 2,
    // padding: 10,
    borderRadius: 8,
    // marginVertical: 10,
    flexDirection: "row",
    // height: 60,
    width: "100%",
    // borderColor: colors.black,
    flexWrap: "wrap",
    // minHeight: 25,
    gap: 5
  },
  time: {
    // marginStart: 20,
  },
  slot: {
    marginTop: 8,
    flexDirection: "row",
  },
  crossStyle: {
    width: 15,
    height: 15,
  },
  timeSlotContainer:{
    borderColor: colors.border,
    borderWidth: 2,
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 5,
    // height:65,
  },
  locationContainerStyle:{
    // marginTop:10,
    flexDirection:'row',
    width:'95%',
    gap:5,
    marginBottom:5,
    // alignItems:'center'
  },
  freeappointContainer:{
    // height:28,
    paddingHorizontal:5,
    // width:28,
    position:'absolute',
    top:0,
    right:0,
    borderRadius:2,
    elevation:2,
    backgroundColor:colors.buttonBg
  }
});
export default styles;
