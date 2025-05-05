import { useRef } from "react";
import NavigationService from "../../../../navigation/NavigationService";
import {
  DOCTOR_DATA_DETAILS,
  RECENT_REQUEST,
} from "../../../../navigation/routes";
import { useAppSelector } from "../../../../store/hooks";
import moment from "moment";
import RecentRequestCard from "../../RecentRequest/requestCard";
import { StyleSheet, View } from "react-native";
import { IMAGE_PATH1 } from "../../../../helper/Constants";
import AcceptTypeSheet from "../../../common/AcceptSheet";
import RejectionSheet from "../../../common/RejectionSheet";
import { colors } from "../../../../theme/colors";
import {
  AppText,
  BUTTON_BG,
  EIGHTEEN,
  FOURTEEN,
  MEDIUM,
} from "../../../../common";
import LottieView from "lottie-react-native";
import { noResult } from "../../../../helper/ImageAssets";
import { styles } from "../../../../styles/styles";

const RecentRequests = () => {
  const { recentAppointmentList, drEditProfile, isLoading } = useAppSelector(
    (state) => {
      return state.doctor;
    }
  );

  const RescheduleButton = (item) => {
    NavigationService.navigate(DOCTOR_DATA_DETAILS, {
      data: item,
      from: "Recent",
      fee_type: item?.fee_type,
    });
  };

  const appointmentTypeSheet = useRef();
  const rejectionSheet = useRef();

  const RenderItem = ({ item, index }) => {
    const address =
      item?.AppointmentTimeSlot?.timeSlotLocation?.doctorAddress.pincode != null
        ? item?.AppointmentTimeSlot?.timeSlotLocation?.doctorAddress
        : item?.doctorAddress;

    const time = item?.time;
    const formattedTime = moment(time, "HH:mm:ss.SSSSSS").format("hh:mm A");

    const date = item?.date;
    const formattedDate = moment(date).format("DD MMM,YYYY");

    let itemDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss.SSSSSS");

    itemDateTime = itemDateTime.add(5, "minutes");

    const currentDateTime = moment();
    const isAcceptDisabled = itemDateTime.isBefore(currentDateTime);

    const disableButton = isAcceptDisabled ? true : false;

    return (
      <View key={index}>
        <RecentRequestCard
          item={item}
          avatar={
            item?.Users?.avatar != null &&
            item?.Users?.avatar && {
              uri: IMAGE_PATH1 + item?.Users?.avatar,
            }
          }
          name={item?.Users?.name ? item?.Users?.name : "- - -"}
          rating={
            item?.Users?.ratings?.average_rating !== undefined
              ? item?.Users?.ratings?.average_rating
              : 0
          }
          companyName={item?.Users?.Company?.company_name}
          date={formattedDate}
          time={formattedTime}
          address={
            address
              ? `${address?.name},${address?.address},${address?.city},${address?.state},${address?.pincode}`
              : "- - -"
          }
          location={address?.pincode == null ? false : true}
          handleAccept={() => {
            appointmentTypeSheet.current.open();
          }}
          handleRescheduleBtn={() => RescheduleButton(item)}
          handleReject={() => {
            rejectionSheet.current.open();
          }}
          isReschedule={item?.time_slots_available == 1}
          isAcceptDisabled={disableButton}
          mobaileNo={item?.Users?.phone}
        />
        <AcceptTypeSheet
          refSheet={appointmentTypeSheet}
          id={item?.id}
          date={item?.date}
          timeSlotsAvailable={item?.time_slots_available}
          time={item?.time}
          locationId={
            item?.location_id
              ? item?.location_id
              : item?.AppointmentTimeSlot?.doctor_location_id
          }
          fees={drEditProfile?.doctor_details?.fees}
          appointmentFeeType={item?.fee_type == "200" ? "Free" : "Paid"}
        />
        <RejectionSheet
          refSheet={rejectionSheet}
          id={item?.id}
          date={item?.date}
        />
      </View>
    );
  };

  return (
    <>
      <View style={recentStyle.mainContainer}>
        <View style={styles.nearByContainer}>
          <AppText type={EIGHTEEN} weight={MEDIUM}>
            Recent Requests
          </AppText>
          {recentAppointmentList?.length > 0 && (
            <AppText
              onPress={() => NavigationService.navigate(RECENT_REQUEST)}
              type={FOURTEEN}
              color={BUTTON_BG}
            >
              See All
            </AppText>
          )}
        </View>

        <View style={recentStyle.listContainer}>
          {recentAppointmentList.length > 0 ? (
            recentAppointmentList?.map((e, index) => {
              return <RenderItem item={e} index={index} key={e?.id || index} />;
            })
          ) : (
            <>
              {!isLoading && (
                <>
                  <LottieView
                    resizeMode="contain"
                    style={recentStyle.lottiStyle}
                    source={noResult}
                    autoPlay
                    loop
                  />
                  <AppText
                    style={recentStyle.noFoundText}
                    type={FOURTEEN}
                    color={BUTTON_BG}
                  >
                    No Recent Appointments Found
                  </AppText>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default RecentRequests;

const recentStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    marginTop: 10,
  },
  listContainer: { marginHorizontal: 16, marginBottom: 20 },
  lottiStyle: { height: 150, width: 150, alignSelf: "center" },
  noFoundText: {
    alignSelf: "center",
    marginBottom: 30,
    color: colors.bg_one_dark,
  },
});
