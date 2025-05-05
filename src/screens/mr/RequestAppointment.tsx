import React, { useEffect, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  BUTTON_TEXT,
  Button,
  FOURTEEN,
  LIGHT,
  MEDIUM,
  PLACEHOLDER,
  SEMI_BOLD,
  SIXTEEN,
  THIRTEEN,
  THIRTY_EIGHT,
  Toolbar,
  WHITE,
} from "../../common";
import { colors } from "../../theme/colors";
import { Image, RefreshControl, StyleSheet, View } from "react-native";
import { styles } from "../../styles/styles";
import KeyBoardAware from "../../common/KeyboardAware";
import {
  Cross_icon,
  Cross_logo,
  downArrow_Icon,
  drIcon,
  DummyDoctor,
  DummyUser,
  freeTagIcon,
  location_Icon,
  locationIcon,
} from "../../helper/ImageAssets";
import TouchableOpacityView from "../../common/TouchableOpacityView";
import DateModal from "../../common/DateTimePicker";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getProductList,
  requestAppointment,
  resheduleAppointment,
  specificTimeSlot,
} from "../../slices/mrSlice/mrAction";
import { AnimationSpinner } from "../../animation";
import { IMAGE_PATH1, label, messages } from "../../helper/Constants";
import Toast from "react-native-simple-toast";
import {
  universalPaddingHorizontal,
  universalPaddingHorizontalMedium,
} from "../../theme/dimens";
import { getDoctorLocation } from "../../slices/drSlice/drAction";
import { Dropdown } from "react-native-element-dropdown";
import { setBtnLoading } from "../../slices/authSlice/authSlice";
import { isDateSame } from "../../helper/utility";
import NavigationService from "../../navigation/NavigationService";
import { ADDPRODUCT } from "../../navigation/routes";

interface TimeSlotComponentProps {
  data?: any;
  selectedSlot: string;
  index: number;
  handleSelectTimeSlots: (slot?: any) => void;
  type: string;
}

export const TimeSlotComponent: React.FC<TimeSlotComponentProps> = ({
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
          style={requestStyle.mainContainer}
        >
          <Image
            source={location_Icon}
            style={requestStyle.locationIconStyle}
            resizeMode="contain"
          />
          <AppText type={FOURTEEN}>{data?.location}</AppText>
        </View>
      )}
      <View key={index} style={requestStyle.container}>
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
                requestStyle.timeSlotContainer,
                {
                  backgroundColor:
                    items?.slot_start_time === selectedSlot
                      ? colors.border
                      : "transparent",
                },
              ]}
            >
              {/* {
               ( items?.fee_type == "200" && type != "reschedule" ) && (
                  <View style={{
                    paddingHorizontal:5,
                    position:'absolute',
                    top:0,
                    right:0,
                    borderRadius:2,
                    elevation:2,
                    backgroundColor:colors.buttonBg
                  }}>
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

const RequestAppointment = ({ route }) => {
  const dispatch = useAppDispatch();

  const { data, type } = route?.params ?? "";

  const { isLoading, profileTimeSlot, specificTimeSlotFound, productList } =
    useAppSelector((state) => {
      return state.mr;
    });

  const { locationData } = useAppSelector((state) => {
    return state.doctor;
  });

  const { isBtnLoading } = useAppSelector((state) => {
    return state.auth;
  });

  const [timeCalculation, setTimeCalculation] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());
  const [slotIdFound, setSlotIdFound] = useState(null);
  const [slotTime, setSlotTime] = useState("");
  const [selectedSlot1, setSelectedSlot1] = useState(null);
  const [value, setValue] = useState(
    data?.doctorAddress?.id ? data?.doctorAddress?.id : null
  );
  const [refreshing, setRefreshing] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productListData, setProductListData] = useState([]);

  let address =
    data?.AppointmentTimeSlot?.timeSlotLocation[0]?.doctorAddress?.pincode !==
      null &&
    data?.AppointmentTimeSlot?.timeSlotLocation[0]?.doctorAddress?.pincode !==
      undefined
      ? data?.AppointmentTimeSlot?.timeSlotLocation[0]?.doctorAddress
      : data?.doctorAddress
      ? data?.doctorAddress
      : data?.address;

  const id = data?.doctor_details?.user_id
    ? data?.doctor_details?.user_id
    : data?.user_details?.id
    ? data?.user_details?.id
    : data?.doctor_id
    ? data?.doctor_id
    : data?.id;

  useEffect(() => {
    dispatch(specificTimeSlot(id, moment(selectDate).format("YYYY-MM-DD")));
  }, [selectDate]);

  useEffect(() => {
    const timeSlotData = createTimeSlotData(specificTimeSlotFound);
    setTimeCalculation(timeSlotData);
  }, [specificTimeSlotFound]);

  const createProductlist = (productData) => {
    const tempData = productData.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setProductListData(tempData);
  };

  useEffect(() => {
    if (productList) {
      createProductlist(productList);
    }
  }, [productList]);

  useEffect(() => {
    dispatch(getDoctorLocation(id));
    dispatch(getProductList());
    if (type === "reschedule") {
      setSlotTime(moment(data?.time, "hh:mm A").format("HH:mm"));
      setSelectDate(data?.date);
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(specificTimeSlot(id, moment(selectDate).format("YYYY-MM-DD")));
    dispatch(getDoctorLocation(id));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectDate(date);
    hideDatePicker();
    setSlotTime("");
  };

  const onRequest = () => {
    dispatch(setBtnLoading(true));
    let timeFormat = moment(slotTime).format("HH:mm");
    let dateFormat = moment(selectDate).format("YYYY-MM-DD");
    let combinedDateTime = `${dateFormat}T${timeFormat}`;
    const time = new Date(combinedDateTime);
    const currentDate = moment(new Date()).format("YYYY-MM-DD");

    if (moment(dateFormat).isBefore(currentDate)) {
      Toast.show("The selected date is in the past.", Toast.LONG);
      dispatch(setBtnLoading(false));
    } else if (slotTime === "") {
      Toast.show("Please select slot time", Toast.LONG);
      dispatch(setBtnLoading(false));
    } else if (currentTime >= time) {
      Toast.show(messages?.selectTimeGreaterThanCurrent, Toast.LONG);
      dispatch(setBtnLoading(false));
    } else if (slotIdFound == null && value == undefined) {
      Toast.show(messages?.selectLocation, Toast.LONG);
      dispatch(setBtnLoading(false));
    } else {
      if (type == "reschedule") {
        let apiData = {
          appointment_id: data?.id,
          slot_id: slotIdFound,
          date: moment(selectDate).format("YYYY-MM-DD"),
          time: moment(slotTime, "hh:mm A").format("HH:mm"),
          location_id: value,
        };
        const cleanObject = (obj) => {
          return Object.fromEntries(
            Object.entries(obj).filter(([_, v]) => v !== null)
          );
        };
        apiData = cleanObject(apiData);
        dispatch(resheduleAppointment(apiData));
      } else {
        let selectedProductId = selectedItems.map((item) => item?.id);
        let apiData = {
          date: moment(selectDate).format("YYYY-MM-DD"),
          time: moment(slotTime, "hh:mm A").format("HH:mm"),
          doctor_id: id,
          slot_id: slotIdFound,
          time_slots_available: filteredSlots?.length == 0 ? 0 : 1,
          location_id: value,
          product_ids: selectedProductId,
        };
        const cleanObject = (obj) => {
          return Object.fromEntries(
            Object.entries(obj).filter(([_, v]) => v !== null)
          );
        };
        apiData = cleanObject(apiData);
        console.log("apiData", apiData);

        dispatch(requestAppointment(apiData));
      }
    }
  };

  const selectSlot = (time, ids, locationId) => {
    setSlotIdFound(ids);
    setSelectedSlot1(time);
    setSlotTime(time);
    setValue(locationId);
  };

  const currentTime = new Date();

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
          slot_start_time: slot?.slot_start_time,
          slot_end_time: slot?.slot_end_time,
          slot_day: slot?.slot_day,
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

  const filterSlots = (timeCalculation, currentTime) => {
    return timeCalculation
      .map((item) => {
        const filteredTime = item?.time?.filter((slot) => {
          const startTime = new Date(
            `${slot.slot_day}T${slot.slot_start_time}`
          );
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

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimePickerConfirm = (date) => {
    let timeFormat = moment(date).format("HH:mm");

    let dateFormat = moment(selectDate).format("YYYY-MM-DD");
    let combinedDateTime = `${dateFormat}T${timeFormat}`;
    const time = new Date(combinedDateTime);
    if (currentTime >= time) {
      Toast.show(messages?.selectTimeGreaterThanCurrent, Toast.LONG);
    } else {
      setSlotTime(timeFormat);
      setTimePickerVisibility(false);
    }
  };

  const handleSelect = (label, id) => {
    const selectedIds = selectedItems.map((item) => item.id);

    if (!selectedIds.includes(id)) {
      setSelectedItems([...selectedItems, { label: label, id: id }]);
      setSelectedProduct(label);
    }
  };

  const handleDeleteSelectedProduct = (id) => {
    setSelectedItems(selectedItems.filter((item, index) => item?.id != id));
  };

  return (
    <View style={{ backgroundColor: colors.white, flexGrow: 1 }}>
      {isLoading && <AnimationSpinner />}

      <AppSafeAreaView statusColor={colors.bg_second}>
        <View style={styles.mainSecond}>
          <Toolbar isBack />
          <KeyBoardAware
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ backgroundColor: colors.bg_second, paddingHorizontal: 0 }}
          >
            <Image
              source={
                data?.user_details?.avatar
                  ? { uri: IMAGE_PATH1 + data?.user_details?.avatar }
                  : data?.avatar
                  ? { uri: IMAGE_PATH1 + data?.avatar }
                  : data?.doctor_profile?.avatar
                  ? { uri: IMAGE_PATH1 + data?.doctor_profile?.avatar }
                  : DummyDoctor
              }
              resizeMode="cover"
              style={styles.profileImage2}
            />
            <View style={requestStyle.uperContainer}>
              <AppText type={THIRTY_EIGHT} weight={MEDIUM}>
                {data?.user_details?.name
                  ? data?.user_details?.name
                  : data?.doctor_profile?.name
                  ? data?.doctor_profile?.name
                  : data?.name}
              </AppText>
              {type == "reschedule" && (
                <AppText weight={MEDIUM}>
                  {`Appointment Time: `}
                  <AppText weight={BOLD}>
                    {`${moment(data?.time, "hh:mm A").format("HH:mm")}`}
                  </AppText>
                </AppText>
              )}
              {address?.state !== null && address?.state ? (
                <View style={styles.homeToolContainer4}>
                  <Image
                    source={locationIcon}
                    resizeMode="contain"
                    style={styles.locationIcon}
                    tintColor={colors.buttonBg}
                  />
                  <AppText weight={MEDIUM} type={FOURTEEN}>
                    {type == "reschedule"
                      ? `${address?.name}, ${address?.address}, ${address?.city}, ${address?.state}`
                      : `${address?.address}, ${address?.city}, ${address?.state}`}
                  </AppText>
                </View>
              ) : (
                <></>
              )}
              {type !== "reschedule" && (
                <View style={styles.idContainer}>
                  <AppText type={FOURTEEN} color={WHITE}>
                    R.N. :-{" "}
                    {data?.rn_number?.rn_number
                      ? data?.rn_number?.rn_number
                      : data?.doctor_details?.rn_number}
                  </AppText>
                </View>
              )}
            </View>

            <View style={requestStyle.locationLabelContainer}>
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
                      : "  Select Date"}
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
                <View style={requestStyle.selectTimeContainerLabel}>
                  <AppText
                    style={styles.typeText}
                    type={FOURTEEN}
                    weight={MEDIUM}
                  >
                    Select Time
                  </AppText>
                  {/* {filteredSlots?.length == 0 && !isLoading && (
                    <TouchableOpacityView
                      style={requestStyle.addTimeBtn}
                      onPress={() =>
                        setTimePickerVisibility(!isTimePickerVisible)
                      }
                    >
                      <AppText
                        style={[styles.typeText, { color: colors.buttonBg }]}
                        type={FOURTEEN}
                        weight={MEDIUM}
                      >
                        Add Time
                      </AppText>
                    </TouchableOpacityView>
                  )} */}
                </View>
                {filteredSlots?.length > 0 ? (
                  <View style={requestStyle.timeSlotMainContainer}>
                    {filteredSlots.map((item, index) => (
                      <TimeSlotComponent
                        key={index}
                        data={item}
                        index={index}
                        type={type}
                        handleSelectTimeSlots={(selectedItem) => {
                          selectSlot(
                            selectedItem?.slot_start_time,
                            selectedItem?.ids,
                            selectedItem?.locationId
                          );
                        }}
                        selectedSlot={selectedSlot1}
                      />
                    ))}
                  </View>
                ) : slotTime ? (
                  <View style={requestStyle.timeSlotMainContainer}>
                    <TouchableOpacityView style={styles.timeContainer}>
                      <AppText type={FOURTEEN} style={styles.time}>
                        {slotTime}
                      </AppText>
                    </TouchableOpacityView>
                  </View>
                ) : !isLoading ? (
                  <AppText
                    style={requestStyle.noTimeSlotText}
                    weight={MEDIUM}
                    type={FOURTEEN}
                    color={BUTTON_TEXT}
                  >
                    No Time Slots Found
                  </AppText>
                ) : null}
              </View>
              {filteredSlots?.length <= 0 &&
                slotTime &&
                type != "reschedule" && (
                  <>
                    <View style={styles.requestBottomContainer}>
                      <AppText
                        style={styles.typeText}
                        type={FOURTEEN}
                        weight={MEDIUM}
                      >
                        {"Select Location"}
                      </AppText>
                    </View>

                    <View style={requestStyle.locationDropDownContainer}>
                      <Dropdown
                        style={requestStyle.dropDown}
                        placeholderStyle={requestStyle.dropDownPlaceholder}
                        selectedTextStyle={requestStyle.dropDownSelectedText}
                        inputSearchStyle={requestStyle.dropDownSearch}
                        iconStyle={requestStyle.dropDownIconStyle}
                        data={locationData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={"Select Location"}
                        searchPlaceholder="Search..."
                        itemTextStyle={{ color: colors.black }}
                        dropdownPosition="top"
                        value={value}
                        onChange={(item) => {
                          setValue(item?.value);
                        }}
                        renderRightIcon={() => (
                          <Image
                            source={downArrow_Icon}
                            resizeMode="contain"
                            style={requestStyle.drownArrowIconStyle}
                          />
                        )}
                      />
                    </View>
                  </>
                )}

              {type != "reschedule" && (
                <>
                  <View
                    style={[
                      styles.requestBottomContainer,
                      {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    <AppText
                      style={styles.typeText}
                      type={FOURTEEN}
                      weight={MEDIUM}
                    >
                      {"Select Product"}
                    </AppText>
                    <TouchableOpacityView
                      onPress={() => NavigationService.navigate(ADDPRODUCT)}
                      style={{
                        backgroundColor: colors.buttonBg,
                        borderRadius: 20,
                        alignItems: "center",
                        height: 20,
                        width: 20,
                      }}
                    >
                      <AppText type={SIXTEEN} weight={BOLD} color={WHITE}>
                        {"+"}
                      </AppText>
                    </TouchableOpacityView>
                  </View>

                  <View style={requestStyle.locationDropDownContainer}>
                    <Dropdown
                      style={requestStyle.dropDown}
                      placeholderStyle={requestStyle.dropDownPlaceholder}
                      selectedTextStyle={requestStyle.dropDownSelectedText}
                      inputSearchStyle={requestStyle.dropDownSearch}
                      iconStyle={requestStyle.dropDownIconStyle}
                      data={productListData}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={"Select Product"}
                      searchPlaceholder="Search..."
                      itemTextStyle={{ color: colors.black }}
                      dropdownPosition="top"
                      value={selectedProduct}
                      onChange={(item) => {
                        handleSelect(item?.label, item?.value);
                      }}
                      renderRightIcon={() => (
                        <Image
                          source={downArrow_Icon}
                          resizeMode="contain"
                          style={requestStyle.drownArrowIconStyle}
                        />
                      )}
                    />
                  </View>
                  <View style={requestStyle.productContainer}>
                    {selectedItems.length > 0 &&
                      selectedItems.map((item, index) => (
                        <View style={requestStyle.selectedProductItem}>
                          <AppText type={THIRTEEN}>{item?.label}</AppText>
                          <TouchableOpacityView
                            onPress={() =>
                              handleDeleteSelectedProduct(item?.id)
                            }
                          >
                            <Image
                              source={Cross_logo}
                              style={{ width: 15, height: 15 }}
                              resizeMode="contain"
                            />
                          </TouchableOpacityView>
                        </View>
                      ))}
                  </View>
                </>
              )}

              <View style={[styles.requestButtonContainer]}>
                <Button
                  loading={isBtnLoading}
                  children={
                    type == "reschedule"
                      ? "Reschedule Appointment"
                      : "Send Request"
                  }
                  onPress={() => onRequest()}
                />
              </View>
            </View>
          </KeyBoardAware>
        </View>

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
          // minimumDate={new Date()}
        />
      </AppSafeAreaView>
    </View>
  );
};

export default RequestAppointment;

const requestStyle = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    flexDirection: "row",
    width: "90%",
    gap: 5,
    marginBottom: 5,
    // alignItems: 'center'
  },
  locationIconStyle: {
    height: 18,
    width: 18,
  },
  container: {
    borderRadius: 8,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    minHeight: 25,
    gap: 5,
  },
  timeSlotContainer: {
    borderColor: colors.border,
    borderWidth: 2,
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
  },
  freeTagIcon: {
    height: 28,
    width: 28,
    position: "absolute",
    top: -5,
  },
  timeSlotMainContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  uperContainer: {
    // flexGrow: 1,
    marginTop: 130,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingBottom: 50,
    paddingTop: 75,
  },
  locationLabelContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: universalPaddingHorizontal,
  },
  selectTimeContainerLabel: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addTimeBtn: {
    alignItems: "center",
  },
  noTimeSlotText: {
    alignSelf: "center",
    marginVertical: 20,
  },
  locationDropDownContainer: {
    backgroundColor: colors.mainBg,
    marginTop: 15,
  },
  dropDown: {
    height: 60,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: universalPaddingHorizontalMedium,
  },
  dropDownPlaceholder: {
    fontSize: 14,
    color: colors.place_holder,
  },
  dropDownSelectedText: {
    fontSize: 16,
    color: colors.black,
  },
  dropDownSearch: {
    height: 40,
    fontSize: 16,
  },
  dropDownIconStyle: {
    width: 24,
    height: 24,
  },
  drownArrowIconStyle: {
    width: 18,
    height: 10,
  },
  productContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  selectedProductItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: colors.bordeColor1,
    borderRadius: 5,
    gap: 5,
  },
});
