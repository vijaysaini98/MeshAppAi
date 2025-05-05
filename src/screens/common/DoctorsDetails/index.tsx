import React, { useEffect, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  BUTTON_TEXT,
  Button,
  EIGHTEEN,
  FOURTEEN,
  LIGHT,
  MEDIUM,
  PLACEHOLDER,
  RadioButton,
  SIXTEEN,
  TWELVE,
  TWENTY_FOUR,
  Toolbar,
  WHITE,
} from "../../../common";
;
import { Alert, Image, View } from "react-native";
import KeyBoardAware from "../../../common/KeyboardAware";
import {
  DummyMr,
  downArrow_Icon,
  locationIcon,
  location_Icon,
} from "../../../helper/ImageAssets";
import styles from "./styles";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../theme/colors";
import {
  appointmentType,
  feeType,
} from "../../../helper/dummydata";
import moment from "moment";
import DateModal from "../../../common/DateTimePicker";
import {
  getDoctorLocation,
  requestStatus,
} from "../../../slices/drSlice/drAction";
import { useAppSelector } from "../../../store/hooks";
import { AnimationSpinner } from "../../../animation";
import { specificTimeSlot } from "../../../slices/mrSlice/mrAction";
import Toast from "react-native-simple-toast";
import { getKey, isDateSame } from "../../../helper/utility";
import { IMAGE_PATH1, messages } from "../../../helper/Constants";
import { Dropdown } from "react-native-element-dropdown";
import NavigationService from "../../../navigation/NavigationService";
import { ADD_LOCATION } from "../../../navigation/routes";

interface TimeSlotComponentProps {
  data?: any;
  selectedSlot: string;
  index: number;
  handleSelectTimeSlots: (slot?: any) => void;
  type: string;
}

const TimeSlotComponent: React.FC<TimeSlotComponentProps> = ({
  data,
  selectedSlot,
  index,
  handleSelectTimeSlots,
  type,
}) => {
  return (
    <>
      {data?.location && (
        <View
          // key={index}
          style={{
            marginTop: 10,
            flexDirection: "row",
            width: "90%",
            gap: 5,
            marginBottom: 5,
            // alignItems: 'center'
          }}
        >
          <Image
            source={location_Icon}
            style={{ height: 18, width: 18 }}
            resizeMode="contain"
          />
          <AppText type={FOURTEEN}>{data?.location}</AppText>
        </View>
      )}
      <View
        key={index}
        style={{
          borderRadius: 8,
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
          minHeight: 20,
          gap: 5,
        }}
      >
        {data?.time?.map((items, insideIndex) => {
          const formattedStartTime = moment(
            items?.slot_start_time,
            "HH:mm:ss"
          ).format("HH:mm");
          const formattedEndTime = moment(
            items?.slot_end_time,
            "HH:mm:ss"
          ).format("HH:mm");

          return (
            <TouchableOpacityView
              onPress={() => handleSelectTimeSlots(items)}
              key={insideIndex}
              style={[
                {
                  borderColor: colors.border,
                  borderWidth: 2,
                  flexDirection: "row",
                  paddingVertical: 10,
                  borderRadius: 5,
                  alignItems: "center",
                  gap: 5,
                  paddingHorizontal: 5,
                },
                {
                  backgroundColor:
                    formattedStartTime == selectedSlot
                      ? colors.border
                      : "transparent",
                },
              ]}
            >
              {/* {
                  (items?.fee_type == "200" && type != "reschedule" ) && (
                  <View style={styles.freeSlotContainer}>
                    <AppText 
                    type={THIRTEEN}
                    weight={SEMI_BOLD}
                    color={WHITE}>FREE</AppText>
                  </View>
                  )
                } */}
              <AppText type={SIXTEEN} weight={LIGHT}>
                {`${formattedStartTime} - ${formattedEndTime}`}
              </AppText>
            </TouchableOpacityView>
          );
        })}
      </View>
    </>
  );
};

const DoctorsDetails = ({ route }) => {
  const data = route?.params?.data ?? "";
  const from = route?.params?.from ?? "";
  const fee_type = route?.params?.fee_type ?? "";

  const dispatch = useDispatch();
  const [appointment, setAppointment] = useState();
  const [feeTypes, setFeeTypes] = useState(
    data?.timeSlotDetails?.fee_type == "200" ? "Free" : "Paid"
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectDate, setSelectDate] = useState(data?.date);

  const [locationId, setLocationId] = useState(
    data?.AppointmentTimeSlot?.doctor_location_id ? data?.AppointmentTimeSlot?.doctor_location_id  : data?.doctorAddress?.id
  );

  const { doctorLocations, locationData, isLoading, drEditProfile } =
    useAppSelector((state) => {
      return state.doctor;
    });

  const { userData, isBtnLoading } = useAppSelector((state) => {
    return state.auth;
  });

  const currentTime = moment();
  const currentTimeFound = currentTime.format("hh:mm A");
  const currentDate = moment();
  const currentDateFound = currentDate.format("YYYY-MM-DD");

  const onPressAppointmentTypeButton = (id) => {
    if (appointment !== id) {
      setAppointment(id);
    } else {
      setAppointment();
    }
  };

  const onPressFeeTypeButton = (fee) => {
    if (feeTypes !== fee) {
      setFeeTypes(fee);
    } else {
      setFeeTypes();
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    let timeFormat = moment(date).format("DD-MMM-YYYY");
    setSelectDate(date);
    hideDatePicker();
    setSelectedSlot1("");
  };

  const [timeCalculation, setTimeCalculation] = useState([]);
  const [slotIdFound, setSlotIdFound] = useState(data?.AppointmentTimeSlot?.id);
  const [selectedSlot1, setSelectedSlot1] = useState(formattedTime(data?.time));
  const [selectedSlot2, setSelectedSlot2] = useState();
  const [userId, setUserId] = useState();
  const [keyData, setKeyData] = useState([]);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const { profileTimeSlot, specificTimeSlotFound } = useAppSelector((state) => {
    return state.mr;
  });

  const selectSlot = (time, ids) => {
    setSlotIdFound(ids);
    setSelectedSlot1(formattedTime(time));
  };

  const getId = async () => {
    const doctorId = await AsyncStorage.getItem("id");
    setUserId(doctorId);
  };

  useEffect(() => {
    setAppointment(data.appointment_type == "400" ? "Clinic Visit" : "Virtual");
    getId();
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(
        specificTimeSlot(userId, moment(selectDate).format("YYYY-MM-DD"))
      );
      dispatch(getDoctorLocation(userId));
    }
  }, [selectDate, userId]);

  useEffect(() => {
    const timeSlotData = createTimeSlotData(specificTimeSlotFound);
    setTimeCalculation(timeSlotData);
  }, [specificTimeSlotFound]);

  const createTimeSlotData = (specificTimeSlotFound) => {
    return Object.keys(specificTimeSlotFound).map((locationKey) => {
      const locationInfo =
        specificTimeSlotFound[locationKey].locationDetails.doctorAddress;
      const locationString = `${locationInfo.name}, ${locationInfo.address}, ${locationInfo.state}, ${locationInfo.pincode}`;
      const locationId = locationInfo.id;

      const time = specificTimeSlotFound[locationKey].slots
        .map((slot) => ({
          ids: slot.id,
          location: locationString,
          locationId: locationId,
          slot_start_time: slot.slot_start_time,
          slot_end_time: slot.slot_end_time,
          slot_day: slot.slot_day,
          fee_type: slot?.fee_type,
        }))
        .sort((a, b) => {
          return moment(a.slot_start_time, "HH:mm:ss").diff(
            moment(b.slot_start_time, "HH:mm:ss")
          );
        });

      return {
        location: locationString,
        locationId: locationId,
        time: time,
      };
    });
  };

  useEffect(() => {
    getNewKey();
  }, []);

  const getNewKey = async () => {
    let newKey = await getKey();
    if (newKey) {
      setKeyData(JSON.parse(newKey));
    }
  };
  let preappointment_type =
    data?.appointment_type == "400" ? "Clinic Visit" : "Virtual";

  const onPressSubmit = () => {
    let timeFormat1 = moment(selectDate).format("YYYY-MM-DD");
    if (!appointment) {
      return Toast.show(messages.selectAppointmentType, Toast.LONG);
    } else if (!locationId) {
      return Toast.show("Please Select Location", Toast.LONG);
    } else if (
      feeTypes !== "Free" &&
      from == "Recent" &&
      drEditProfile?.doctor_details?.fees <= 0
    ) {
      Alert.alert(
        "Add Fees",
        "Please add the fees before selecting 'Paid'.",
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: true }
      );
    } else if (
      formattedTime(data?.time) === selectedSlot1 &&
      preappointment_type === appointment &&
      data?.AppointmentTimeSlot?.doctor_location_id === locationId &&
      !feeType
    ) {
      if (preappointment_type === appointment && from != "Recent") {
        return Toast.show(messages.alreadyAppointmentType, Toast.LONG);
      } else if (formattedTime(data?.time) === selectedSlot1) {
        return Toast.show(messages.alreadyTimeselected, Toast.LONG);
      } else if (data?.AppointmentTimeSlot?.doctor_location_id == locationId) {
        return Toast.show("Location already selected ", Toast.LONG);
      }
    } else if (currentDateFound > timeFormat1) {
      return Toast.show(
        "The selected date is in the past. Please choose today's date or a future date.",
        Toast.LONG
      );
    } 
    // else if(selectedSlot2 != "" && selectedSlot1 !== selectedSlot2){
    //   return Toast.show("Please select the slot time", Toast.LONG);
    // }
    else {
      let datas = {
        request: "Reschedule",
        appointment_id: data?.id,
        slot_id: slotIdFound,
        // fee_type: keyData?.fee_type?.Free
        // ? feeTypes === "Free"
        //   ? keyData?.fee_type?.Free?.toString()
        //   : keyData?.fee_type?.Paid?.toString()
        // : "",
        fee_type: fee_type,
        appointment_type: keyData?.appointment_type
          ? appointment === "Clinic Visit"
            ? keyData?.appointment_type["Clinic Visit"]?.toString()
            : keyData?.appointment_type?.Virtual?.toString()
          : "",
        date: timeFormat1,
        time: selectedSlot1
          ? moment(selectedSlot1, ["hh:mm A"]).format("HH:mm:ss")
          : "",
        doctor_location_id: locationId,
        time_slots_available: filteredSlots.length == 0 ? 0 : 1,
        time: selectedSlot1,
        location_id: locationId,
      };

      if (from == "Recent") {
        dispatch(requestStatus(datas, "Reschedule", handleSuccess, "free"));
        // handleSuccess()
      } else {
        dispatch(requestStatus(datas, "Reschedule"));
      }
    }
  };

  const handleSuccess = () => {
    let apiData = {
      request: "Accept",
      appointment_id: data?.id,
      // fee_type: keyData?.fee_type?.Free
      //   ? feeTypes === "Free"
      //     ? keyData?.fee_type?.Free?.toString()
      //     : keyData?.fee_type?.Paid?.toString()
      //   : "",
      fee_type: fee_type,
      appointment_type: keyData?.appointment_type
        ? appointment === "Clinic Visit"
          ? keyData?.appointment_type["Clinic Visit"]?.toString()
          : keyData?.appointment_type?.Virtual?.toString()
        : "",
      appointment_status: keyData?.appointment_status?.Accepted?.toString()
        ? keyData?.appointment_status?.Accepted?.toString()
        : "",
      time_slots_available: filteredSlots.length == 0 ? 0 : 1,
      date: selectDate,
      time: selectedSlot1,
      doctor_location_id: locationId,
    };
    dispatch(requestStatus(apiData, "fromAccept", null, "free"));
  };

  function formattedTime(time) {
    const formattedTime = moment(`${time}`, "HH:mm:ss").format("HH:mm");
    return formattedTime;
  }

  function formattedTime1(time) {
    const formattedTime = moment(time, "HH:mm:ss.SSSSSS").format("hh:mm A");
    return formattedTime;
  }
  function formattedDate(date) {
    const formatdate = moment(date).format("DD MMM,YYYY");
    return formatdate;
  }

  const temAdress =
    data?.AppointmentTimeSlot?.timeSlotLocation?.doctorAddress.pincode != null
      ? data?.AppointmentTimeSlot?.timeSlotLocation?.doctorAddress
      : data?.doctorAddress;

  const filterSlots = (timeCalculation, currentTime) => {
    return timeCalculation
      .map((item) => {
        const filteredTime = item?.time?.filter((slot) => {
          const startTime = new Date(
            `${slot.slot_day}T${slot.slot_start_time}`
          );
          const endTime = new Date(`${slot.slot_day}T${slot.slot_end_time}`);
          if (currentTime <= startTime) {
            return item;
          }
        });
        return {
          ...item,
          time: filteredTime,
        };
      })
      .filter((location) => location?.time?.length > 0);
  };

  const filteredSlots = filterSlots(timeCalculation, currentTime);

  const handlePressTimeSlots = (selectedItem) => {
    // if (
    //   currentTimeFound >= formattedTime1(selectedItem?.slot_start_time) &&
    //   currentDateFound >= formattedDate(selectDate)
    // ) {
    //   Toast.show("please select after current time", Toast.LONG);
    // } else {
    selectSlot(selectedItem?.slot_start_time, selectedItem?.ids);
    // }
  };

  const handleTimePickerConfirm = (date) => {
    let timeFormat = moment(date).format("HH:mm");
    let timeFormatDisplay = moment(date).format("HH:mm:ss");
    // setSelectedSlot1(timeFormat);
    setSelectedSlot2(timeFormat)
    setSelectedSlot1(timeFormat)
    setTimePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView isSecond>
        <Image
          source={
            data?.Users?.avatar
              ? { uri: IMAGE_PATH1 + data?.Users?.avatar }
              : DummyMr
          }
          resizeMode="cover"
          style={styles.welcomeLogo}
        />
        <View style={styles.container} />
        <Toolbar isBack />
        <View style={styles.alignCenter}>
          <AppText type={TWENTY_FOUR} weight={MEDIUM} numberOfLines={2}>
            {data?.Users?.name ? data?.Users?.name : ""}
          </AppText>
          <AppText type={EIGHTEEN} weight={MEDIUM} numberOfLines={2}>
            {data?.Users?.phone ? data?.Users?.phone : ""}
          </AppText>
        </View>
        {temAdress?.pincode && (
          <View style={styles.homeToolContainer4}>
            <Image
              source={locationIcon}
              resizeMode="contain"
              style={styles.locationIcon}
              tintColor={colors.buttonBg}
            />
            <AppText weight={MEDIUM} type={FOURTEEN}>
              {temAdress
                ? `${temAdress?.name},${temAdress?.address},${temAdress?.city},${temAdress?.state}, ${temAdress?.pincode}`
                : "- - -"}
            </AppText>
          </View>
        )}
        <AppText
          type={TWELVE}
          weight={MEDIUM}
          style={{ alignSelf: "center" }}
        >{`Appointment Time: ${moment(data?.time, "HH:mm:ss.SSSSSS").format(
          "HH.mm"
        )}`}</AppText>

        <View style={styles.idContainer}>
          <AppText type={FOURTEEN} color={WHITE}>
            {data?.Users?.Company?.company_name
              ? data?.Users?.Company?.company_name
              : ""}
          </AppText>
        </View>
        {/* <View style={[styles.feeTypeContainer,{paddingBottom:10}]}>
            <AppText  type={SIXTEEN} weight={MEDIUM} >Fees Type: </AppText>
            <View style={styles.feeStatusContainer}>
              <AppText type={SIXTEEN} weight={SEMI_BOLD} color={WHITE}> 
              {fee_type!= "200" ? "Paid" : "Free" }
            </AppText>
            </View>
          </View> */}
        <KeyBoardAware isSecond style={styles.secondContainer}>
          <AppText
            type={SIXTEEN}
            weight={MEDIUM}
            style={styles.typeOfAppointment}
          >
            Choose the type of appointment
          </AppText>
          <View style={styles.messageBox}>
            {appointmentType?.map((e, index) => {
              return (
                <View key={index} style={styles.appointmentBox}>
                  <TouchableOpacityView
                    onPress={() => onPressAppointmentTypeButton(e?.name)}
                    style={styles.appointmentContainer}
                    key={e.id}
                  >
                    <RadioButton
                      value={appointment === e?.name ? true : false}
                      onPress={() => onPressAppointmentTypeButton(e?.name)}
                      message={e?.name}
                    />
                  </TouchableOpacityView>
                </View>
              );
            })}
          </View>
          {/* {(from == "Recent" && data?.timeSlotDetails?.fee_type !== "200") && (
            <>
              <AppText style={styles.feeType} type={SIXTEEN} weight={MEDIUM}>
                Choose Fee Type
              </AppText>

              <View style={styles.messageBox}>
                {feeType?.map((e, index) => {
                  return (
                    <TouchableOpacityView
                    onPress={() => onPressFeeTypeButton(e?.name)}
                      style={styles.appointmentBox}
                      key={e.id}
                    >
                      <View style={styles.appointmentContainer}>
                        <RadioButton
                          value={feeTypes === e?.name ? true : false}
                          onPress={() => onPressFeeTypeButton(e?.name)}
                          message={e?.name}
                        />
                      </View>
                    </TouchableOpacityView>
                  );
                })}
              </View>
            </>
          )} */}
          <View style={styles.locationContainer}>
            <AppText type={SIXTEEN} weight={MEDIUM}>
              {"Select Location"}
            </AppText>
            <TouchableOpacityView
              onPress={() => NavigationService.navigate(ADD_LOCATION)}
              style={styles.addLocationBtn}
            >
              <AppText type={SIXTEEN} weight={BOLD} color={WHITE}>
                {"+"}
              </AppText>
            </TouchableOpacityView>
          </View>
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              dropdownPosition="top"
              placeholderStyle={[styles.placeholderStyle]}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={locationData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Location"}
              searchPlaceholder="Search..."
              itemTextStyle={{ color: colors.black }}
              value={locationId}
              onChange={(item) => {
                setLocationId(item?.value);
              }}
              renderRightIcon={() => (
                <Image
                  source={downArrow_Icon}
                  resizeMode="contain"
                  style={styles.icon}
                />
              )}
            />
          </View>
          <View style={styles.requestBottomContainer}>
            <AppText style={styles.typeText} type={SIXTEEN} weight={MEDIUM}>
              Select Date
            </AppText>
            <TouchableOpacityView
              onPress={() => showDatePicker()}
              style={[styles.inputContainer, styles.calenderStyle]}
            >
              <AppText type={FOURTEEN} color={PLACEHOLDER}>
                {selectDate
                  ? moment(selectDate).format("MMMM Do YYYY")
                  : "Select Date"}
              </AppText>
              <DateModal
                date
                mode="date"
                onPress={() => showDatePicker()}
                isVisible={isDatePickerVisible}
                handleConfirm={(date) => handleConfirm(date)}
                onCancel={() => hideDatePicker()}
                minimumDate={new Date()}
              />
            </TouchableOpacityView>
            <View style={styles.selectTimeLabelContainer}>
              <AppText style={styles.typeText} type={SIXTEEN} weight={MEDIUM}>
                Select Time
              </AppText>
              {/* {filteredSlots?.length == 0 && !isLoading && ( */}
                <TouchableOpacityView
                  style={styles.addTimeBtn}
                  onPress={() => setTimePickerVisibility(!isTimePickerVisible)}
                >
                  <AppText
                    style={[styles.typeText, styles.addTimeBtnLabel]}
                    type={FOURTEEN}
                    weight={MEDIUM}
                  >
                    Add Time
                  </AppText>
                </TouchableOpacityView>
              {/* )} */}
            </View>
            {selectedSlot2 &&(
                <View style={styles.wrapContainer}>
                  <TouchableOpacityView
                  onPress={()=> setSelectedSlot1(selectedSlot2)}
                  style={[styles.slotContainer,{backgroundColor:
                     selectedSlot1 == selectedSlot2
                     ? colors.border
                     : "transparent"
                     },styles.slotText]}>
                    <AppText type={FOURTEEN}
                    //  style={styles.slotText}
                     >
                      {selectedSlot2}
                    </AppText>
                  </TouchableOpacityView>
                </View>
              )}
            <View style={styles.timeSlotContainerStyle}>
              {filteredSlots?.length > 0 ? (
                <View style={styles.wrapContainer}>
                  {filteredSlots.map((item, index) => (
                    <TimeSlotComponent
                      key={index}
                      data={item}
                      index={index}
                      type={from}
                      handleSelectTimeSlots={(selectedItem) =>{
                        handlePressTimeSlots(selectedItem)
                        setSelectedSlot2("")}
                      }
                      selectedSlot={selectedSlot1}
                    />
                  ))}
                </View>
              ): !isLoading ? (
                <AppText
                  style={styles.noTimeSlotText}
                  weight={MEDIUM}
                  type={FOURTEEN}
                  color={BUTTON_TEXT}
                >
                  No Time Slots Found
                </AppText>
              ) : null}
              
            </View>
          </View>
        </KeyBoardAware>
        <View style={styles.submitBtnContainer}>
          <Button
            onPress={() => onPressSubmit()}
            children="Submit"
            containerStyle={[styles.loginButton]}
            loading={isBtnLoading}
          />
        </View>
      </AppSafeAreaView>
      <DateModal
        mode="time"
        onPress={() => showTimePicker()}
        isVisible={isTimePickerVisible}
        handleConfirm={(date) => handleTimePickerConfirm(date)}
        onCancel={() => hideTimePicker()}
        is24Hour={true}
        isIcon
        minimumDate={
          isDateSame(
            moment(selectDate).format("YYYY-MM-DD"),
            moment(new Date()).format("YYYY-MM-DD")
          )
            ? new Date()
            : null
        }
      />
    </>
  );
};

export default DoctorsDetails;
