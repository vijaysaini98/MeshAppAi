import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { borderWidth, universalPaddingHorizontal, universalPaddingHorizontalMedium } from "../../../theme/dimens";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.border,
    height: 140,
  },
  welcomeLogo: {
    zIndex:1,
    height: 140,
    width: 140,
    position: 'absolute',
    alignSelf: 'center',
    top: 60,
    borderWidth: borderWidth,
    borderColor: colors.bg_one_dark,
    borderRadius: 70,
    backgroundColor: colors.white
  },
  alignCenter: {
    alignItems: "center",
    marginTop: 70,
    paddingHorizontal:10
  },
  verificationContent: {
    marginTop: 20,
    textAlign: "center",
  },
  loginButton: {
    position:'absolute',
    width:'100%',
    // marginBottom: 8,
    bottom:10,
    // marginHorizontal:universalPaddingHorizontal
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
    borderWidth: 2,
    borderColor: colors.border,
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: "row",
    height: 60,
  },
  timeSlotContainerStyle:{
    flexDirection: "row",
    flexWrap: "wrap",
    gap:10
  },
  timeContainer: {
    borderWidth: 2,
    // padding: 14,
    borderRadius: 8,
    // gap: 5,
    marginTop: 10,
    flexDirection: "row",
    height: 55,
    // width: "30%",
    marginHorizontal: 2,
    paddingHorizontal: 5,
    textAlignVertical: "center",
    borderColor: colors.border,
    alignItems:'center'
    // justifyContent:'center'
  },
  message: {
    left: 10,
  },
  time: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
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
    // alignItems: "center",
    marginTop: 4,
    justifyContent: "center",
    paddingHorizontal:40,
    gap:5
  },
  selectDate: {
    marginTop: 20,
  },
  department: {
    backgroundColor: colors.buttonBg,
  },
  idContainer: {
    backgroundColor: colors.buttonBg,
    // paddingHorizontal: universalPaddingHorizontal,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
  },
  requestBottomContainer: {
    // marginTop: 20,
    paddingHorizontal: universalPaddingHorizontal,
  },
  typeText: {
    marginTop: 15,
  },
  dropdownContainer: {
    backgroundColor: colors.mainBg,
    marginTop: 15,
    paddingHorizontal: universalPaddingHorizontal
  },
  dropdown: {
    height: 60,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: universalPaddingHorizontalMedium,
  },
  placeholderStyle: {
    fontSize: 14,
    color: colors.place_holder,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: colors.black,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  icon: {
    // marginRight: 5,
    width: 18,
    height: 10,
  },
  locationContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    // marginTop:15
  },
  addLocationBtn:{
    backgroundColor:colors.buttonBg,
    borderRadius:20,
    alignItems:'center',
    height:20,
    width:20
  },
  freeSlotContainer:{
    paddingHorizontal:5,
    position:'absolute',
    top:0,
    right:0,
    borderRadius:2,
    elevation:2,
    backgroundColor:colors.buttonBg
  },
  feeTypeContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
    // gap:5,
    justifyContent:'center'
  },
  feeStatusContainer:{
    paddingHorizontal:10,
    backgroundColor:colors.buttonBg,
    borderRadius:5
  },
  secondContainer:{ 
    marginBottom: 80 
  },
selectTimeLabelContainer:{
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
addTimeBtn:{ 
  alignItems: "center" 
},
addTimeBtnLabel:{
   color: colors.buttonBg 
  },
wrapContainer:{ 
  flexDirection: "row", 
  flexWrap: "wrap" 
},
slotContainer:{
  flexDirection: "row",
  marginTop: 10,
  // marginHorizontal: 5,
},
slotText:{
  borderWidth: 2,
  width: 110,
  borderRadius: 4,
  textAlignVertical: "center",
  justifyContent: "center",
  borderColor: colors.border,
  textAlign: "center",
  paddingVertical: 10,
},
noTimeSlotText:{
  alignSelf: "center", 
  marginVertical: 20 
},
submitBtnContainer:{ 
  marginHorizontal: 20 
}
});

export default styles;
