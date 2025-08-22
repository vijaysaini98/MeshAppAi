import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import {
  averageBuutonHeight,
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalMedium,
  universalPaddingVertical,
} from "../../../theme/dimens";

const styles = StyleSheet.create({
  mainPadding: {
    flex: 1,
    backgroundColor: colors.mainBg,
    paddingHorizontal: universalPaddingHorizontal,
  },
  recentRequestCardContainer: {
    borderWidth: borderWidth,
    borderColor: colors.border,
    borderRadius: 6,
    marginTop: 10,
    backgroundColor: colors.white,
  },
  uperContainerStyle: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: universalPaddingHorizontalMedium,
    paddingHorizontal:5,
    backgroundColor: colors.white,
    gap: 10,
  },
  profileImageContainer: {
    flex: 0.3,
    alignItems: "center",
    // justifyContent: 'center',
    borderRadius: 8,
  },
  profileImageStyle: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    gap: 2,
  },
  companyContainerStyle: {
    alignItems: "flex-start",
    gap: 5,
  },
  locationContainerStyle: {
    // flex:1,
    width:'100%',
    flexDirection: "row",
    gap: 5,
    overflow:'hidden',
    paddingTop:5,
    paddingBottom:10,
    paddingHorizontal:universalPaddingHorizontal
    // flexWrap:'wrap',
    // backgroundColor:'red'

  },
  locationIconStyle: {
    height: 18,
    width: 18,
  },
  appointmentDateTimeContainerStyle: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: universalPaddingHorizontal,
    backgroundColor: "#EFF3F566",
  },
  dateTimeTextStyle: {
    textAlignVertical: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  acceptBtn: {
    marginVertical: 15,
    marginRight: 0,
    marginLeft: universalPaddingHorizontal,
    flex: 1,
    height: averageBuutonHeight,
  },
  rejectBtn: {
    margin: universalPaddingHorizontal,
    marginVertical: 15,
    backgroundColor: colors.loader,
    flex: 1,
    height: 50,
  },
  rescheduleBtn: {
    marginHorizontal: universalPaddingHorizontal,
    backgroundColor: colors.buttonBg,
    marginBottom: 16,
    height: 50,
  },
  showTextStyle: {
    // textAlign: "",
    // textAlignVertical:'bottom',
    alignSelf: "flex-end",
    color: colors.buttonBg,
    // flex: 0.2,
  },
  companyNameContainer: {
    backgroundColor: colors.buttonBg,
    borderRadius: 20,
    paddingHorizontal: universalPaddingVertical,
    paddingVertical: 5,
  },
});

export default styles;
