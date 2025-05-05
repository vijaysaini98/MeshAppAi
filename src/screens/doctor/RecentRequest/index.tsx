import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { AppSafeAreaView, Toolbar } from "../../../common";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { doctorAppointmentList } from "../../../slices/drSlice/drAction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { AnimationSpinner } from "../../../animation";
import { IMAGE_PATH1 } from "../../../helper/Constants";
import AcceptTypeSheet from "../../common/AcceptSheet";
import RejectionSheet from "../../common/RejectionSheet";
import moment from "moment";
import { DOCTOR_DATA_DETAILS } from "../../../navigation/routes";
import NavigationService from "../../../navigation/NavigationService";
import RecentRequestCard from "./requestCard";

const RecentRequest = () => {
  const dispatch = useAppDispatch();
  let focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      dispatch(doctorAppointmentList());
    }
  }, [focus]);

  const { recentAppointmentList, isLoading,drEditProfile } = useAppSelector((state) => {
    return state.doctor;
  });

  const appointmentTypeSheet = useRef();
  const rejectionSheet = useRef();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    dispatch(doctorAppointmentList(null, null));
  };


  const RescheduleButton = (item) => {
    NavigationService.navigate(DOCTOR_DATA_DETAILS, { data: item, from: "Recent" ,fee_type:item?.fee_type});
  };

  // id={item?.id} 
  // date={item?.date}
  // timeSlotsAvailable={item?.time_slots_available}
  // time={item?.time}
  // locationId={item?.location_id ? item?.location_id : item?.AppointmentTimeSlot?.doctor_location_id}
  // fees={drEditProfile?.doctor_details?.fees}
  // appointmentFeeType={item?.timeSlotDetails?.fee_type == "200" ? "Free" : "Paid"}

//  const [appointmentData,setAppointmentData]=useState({
//   id:'',
//   date:"",
//   timeSlotsAvailable:"",
//   time:"",
//   locationId:"",
//   fees:"",
//   appointmentFeeType:""
//  });
interface AppointmentData {
  id: any;
  date: any;
  timeSlotsAvailable: any;
  time: any;
  locationId: any;
  fees: any;
  appointmentFeeType: any;
}

const [appointmentData, setAppointmentData] = useState<AppointmentData>({
  id: '',
  date: '',
  timeSlotsAvailable: '',
  time: '',
  locationId: '',
  fees: '',
  appointmentFeeType: ''
});


  const renderItem = ({ item, index }) => {

    const address =
    item?.AppointmentTimeSlot?.timeSlotLocation?.doctorAddress.pincode != null  ? 
    item?.AppointmentTimeSlot?.timeSlotLocation?.doctorAddress 
    : item?.doctorAddress ;

  const date = item?.date;
  const formattedDate = moment(date).format("DD MMM,YYYY");

  const time = item?.time;
  const formattedTime = moment(time, "HH:mm:ss.SSSSSS").format("hh:mm A");

let itemDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss.SSSSSS");

itemDateTime = itemDateTime.add(5, 'minutes');

const currentDateTime = moment();
const isAcceptDisabled = itemDateTime.isBefore(currentDateTime);

const disableButton = isAcceptDisabled ? true : false;


    const handleAcceptBtn = (item) => {
      setAppointmentData((prev) => ({
        ...prev,
        id: item?.id,
        date: item?.date,
        timeSlotsAvailable: item?.time_slots_available,
        time: item?.time,
        locationId: item?.location_id || item?.AppointmentTimeSlot?.doctor_location_id,
        fees: drEditProfile?.doctor_details?.fees,
        appointmentFeeType: item?.timeSlotDetails?.fee_type === "200" ? "Free" : "Paid",
      }));
      
        appointmentTypeSheet.current.open()
    }

    const handleRejectBtn = (item)=>{
      setAppointmentData((prev) => ({
        ...prev,
        id: item?.id,
        date: item?.date
      }));
      rejectionSheet.current.open()
    }


    return (
      <>
        <RecentRequestCard
          item={item}
          index={index}
          avatar={
            (item?.Users?.avatar != null && item?.Users?.avatar) &&
            {
            uri:
              IMAGE_PATH1 +  item?.Users?.avatar
          }
          // :DummyUser
        }
          name={item?.Users?.name
            ? item?.Users?.name
            : "- - -"}
          rating={
            item?.Users?.ratings?.average_rating !== undefined
              ? item?.Users?.ratings?.average_rating
              : 0
          }
          companyName={item?.Users?.Company?.company_name}
          date={formattedDate}
          time={formattedTime}
          address={address
            ? `${address?.name},${address?.address},${address?.city},${address?.state}, ${address?.pincode}`
            : "- - -"}
          location={address?.pincode == null ? false : true}
          handleAccept={() => handleAcceptBtn(item)}
          handleRescheduleBtn={() => RescheduleButton(item)}
          handleReject={() => handleRejectBtn(item)}
          isReschedule={item?.time_slots_available == 1}
          isAcceptDisabled={disableButton}
          mobaileNo={item?.Users?.phone}
        />
      </>
    )
  }

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView>
        <Toolbar title="Recent Requests" />
        <View style={styles.mainPadding}>
          {/* {!isLoading && ( */}
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={recentAppointmentList}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id}
            style={{ marginTop: 20 }}
          />
          {/* )} */}
          <AcceptTypeSheet 
        refSheet={appointmentTypeSheet} 
        id={appointmentData?.id} 
        date={appointmentData.date}
        timeSlotsAvailable={appointmentData.timeSlotsAvailable}
        time={appointmentData?.time}
        locationId={appointmentData.locationId}
        fees={appointmentData.fees}
        appointmentFeeType={appointmentData.appointmentFeeType}
        />
         <RejectionSheet refSheet={rejectionSheet} id={appointmentData.id} date={appointmentData?.date} />
        </View>
      </AppSafeAreaView>
    </>
  );
};

export default RecentRequest;