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
    padding: universalPaddingHorizontalMedium,
    backgroundColor: colors.white,
    gap: 10,
  },
  profileImageContainer: {
    flex: 0.5,
    alignItems: "center",
    // justifyContent: 'center',
    borderRadius: 8,
  },
  profileImageStyle: {
    height: 135,
    width: 110,
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
    flexDirection: "row",
    gap: 5,
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
    textAlign: "left",
    alignSelf: "flex-end",
    color: colors.buttonBg,
    flex: 0.2,
  },
  addressContainer: {
    flex: 1,
    flexDirection: "row",
  },
  companyNameContainer: {
    backgroundColor: colors.buttonBg,
    borderRadius: 20,
    paddingHorizontal: universalPaddingVertical,
    paddingVertical: 5,
  },
});

export default styles;
