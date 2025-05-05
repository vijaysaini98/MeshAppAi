import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  AppText,
  Button,
  FOURTEEN,
  PLACEHOLDER,
} from "../../../common";
import { borderWidth, universalPaddingHorizontal, universalPaddingHorizontalMedium } from "../../../theme/dimens";
import { colors } from "../../../theme/colors";
import DateModal from "../../../common/DateTimePicker";
import moment from "moment";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import Toast from "react-native-simple-toast";
import { MEDIUM, THIRTY_EIGHT, SIXTEEN } from "../../../common/AppText";
;
import { Cross_icon, downArrow_Icon } from "../../../helper/ImageAssets";
import { Dropdown } from "react-native-element-dropdown";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addDoctorSlots } from "../../../slices/drAvailabilitySlice/drAvailabilityAction";
import { drProfileTimeSlot } from "../../../slices/mrSlice/mrAction";
import { messages } from "../../../helper/Constants";

const AddAvailabilty = ({
  opneRbSheet,
  setOpenRbSheet,
  setData,
  setDay,
  setLocationId,
  location,
  appointment,
  userId,
  type,
  title
}) => {
  const refRBSheet = useRef();
  const dispatch = useAppDispatch();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fromdate, setFromDate] = useState("");
  const [toTime, settoTime] = useState("");
  const [fromDisplay, setFromDisplay] = useState("");
  const [toDisplay, setToDisplay] = useState("");
  const [dateType, setDateType] = useState("");
  const [value, setValue] = useState()

  const { doctorLocations, locationData,isLoading } = useAppSelector((state) => {
    return state.doctor;
  })



  useEffect(() => {
    if (opneRbSheet) {
      refRBSheet?.current?.open();
    } else {
      refRBSheet?.current?.close();
    }
  }, [opneRbSheet]);

  const showDatePicker = (type) => {
    setDateType(type);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let timeFormat = moment(date).format("HH:mm:ss");
    let timeFormatDisplay = moment(date).format("HH:mm:ss");

    if (dateType === "from") {
      setFromDate(timeFormat);
      setFromDisplay(timeFormatDisplay);
    } else {
      settoTime(timeFormat);
      setToDisplay(timeFormatDisplay);
    }
    hideDatePicker();
  };

  const handlesubmit = () => {

    const moment = require("moment");
    const newDate = new Date()
    newDate.setMinutes(newDate.getMinutes())
    const currentTime = newDate.toLocaleTimeString('en-US', { hour12: false });

    let currentDate = moment.utc(newDate).format("YYYY-MM-DD");
    let selectedDate = moment(setDay, "dddd, DD MMM YYYY").format("YYYY-MM-DD")
    const formattedDate = moment(setDay).format('YYYY-MM-DD[T]')
    const fromDateObj = new Date(`${formattedDate}${fromdate}`);
    const toTimeObj = new Date(`${formattedDate}${toTime}`);

    const timeDifference = toTimeObj.getTime() - fromDateObj.getTime();
    const timeDifferenceInMinutes = timeDifference / (1000 * 60);

    if (!fromdate) {
      return Toast.show(messages.enterFromTime, Toast.LONG);
    }
    if (!toTime) {
      return Toast.show(messages.enterToTime, Toast.LONG);
    }

    if (fromdate < currentTime && currentDate === selectedDate) {
      return Toast.show(messages.selectTimeGreaterThanCurrent, Toast.LONG);
    }
    if (timeDifferenceInMinutes < 5) {
      return Toast.show(messages.selectTimeAfterFiveMinutes, Toast.LONG);
    }
    if (type == 'doctor' && !value) {
      return Toast.show(messages.selectLocation, Toast.LONG);
    }
    else {
      let momentStartTime = moment(fromdate, "HH:mm:ss");
      let momentEndTime = moment(toTime, "HH:mm:ss");

      if (momentStartTime.isBefore(momentEndTime)) {
        setData({
          startTime: fromdate,
          endTime: toTime,
          display: `${fromDisplay}-${toDisplay}`,
          locationId:value
        });
        // setFromDate("");
        // settoTime("");
        if (type == 'doctor') {
          handleOnSuccess(selectedDate,fromdate,toTime,value)
        }
        else{
          
          let loc;
          locationData.forEach((item) => {
            if (item?.value == value) {
              loc = item?.label;
            }
          });
          
           setData({
          startTime: fromdate,
          endTime: toTime,
          display: `${fromDisplay}-${toDisplay}`,
          locationId:value,
          location:loc
        });
          setOpenRbSheet(false);
        }
      } else {
        return Toast.show(messages.fromToTimeValidation, Toast.LONG);
      }
    }
  };


const handleOnSuccess = (day,startTime,endTime,locationId) =>{
    let data = {
              doctor_id: userId,
              slot_day: moment(setDay).format("YYYY-MM-DD"),
              period_availability: appointment === 1 ? "Monthly" : "Weekly",
              daylight: "",
              doctor_location_id: locationId,
              slots_times: [
                {
                  startTime:startTime,
                  endTime: endTime,
                },
              ],
            };
            dispatch(addDoctorSlots(data, onSucess));
}

const onSucess = () => {
  setFromDate("");
  settoTime("");
  setOpenRbSheet(false);
  refRBSheet?.current?.close();
  dispatch(drProfileTimeSlot(userId));
};

  return (
    <View
    // style={{
    //   backgroundColor: "#00000000",
    //   width: "100%",
    //   height: "50%",
    // }}
    >
      <RBSheet
        ref={refRBSheet}
        height={500}
        // closeOnDragDown={true}
        closeOnDragDown={false}
        closeOnPressMask={false}
        closeOnPressBack={false}
        // closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "#333333E1",
          },
          container: {
            backgroundColor: 'transparent'
          }
        }}

      >
        <View style={styles.mainContainer}>
          <TouchableOpacityView
            style={styles.closeBtnStyle}
            onPress={() => setOpenRbSheet(false)}>
            <Image
              source={Cross_icon}
              resizeMode="contain"
              style={styles.closeIconStyle}
            />
          </TouchableOpacityView>

          <AppText style={styles.claim} weight={MEDIUM} type={THIRTY_EIGHT}>
            Add Availability
          </AppText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <AppText style={styles.claim1} weight={MEDIUM} type={SIXTEEN}>
                From
              </AppText>
              <TouchableOpacityView
                onPress={() => showDatePicker("from")}
                style={[styles.inputContainer, styles.calenderStyle]}
              >
                <AppText
                  style={{
                    flex: 1,
                    textAlign: "center",
                  }}
                  type={FOURTEEN}
                  color={PLACEHOLDER}
                >
                  {fromdate
                    ? fromdate
                    : "Select From Time"}
                </AppText>
              </TouchableOpacityView>
            </View>
            <View>
              <AppText style={styles.claim1} weight={MEDIUM} type={SIXTEEN}>
                To
              </AppText>
              <TouchableOpacityView
                onPress={() => showDatePicker()}
                style={[styles.inputContainer, styles.calenderStyle]}
              >
                <AppText
                  style={{
                    flex: 1,
                    textAlign: "center",
                  }}
                  type={FOURTEEN}
                  color={PLACEHOLDER}
                >
                  {toTime
                    ? toTime
                    : "Select To Time"}
                </AppText>
              </TouchableOpacityView>
            </View>
          </View>

          {location && 
           ( 
           <View style={styles.container}>
            <Dropdown
              style={[styles.dropdown
              ]}
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
              value={value}
              onChange={(item) => {
                setValue(item?.value)
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
        )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.submitBtnStyle}
            onPress={handlesubmit}
            children={title ? title :"Update & Save"}
            loading={isLoading}
          />
        </View>
      </RBSheet>
      <DateModal
        date
        mode="time"
        onPress={() => showDatePicker()}
        isVisible={isDatePickerVisible}
        handleConfirm={(date) => handleConfirm(date)}
        onCancel={() => hideDatePicker()}
        is24Hour={true}
      />
    </View>
  );
};

export default AddAvailabilty;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden'
  },
  buttonContainer: {
    paddingBottom: 20,
    backgroundColor: colors.mainBg,
    justifyContent: 'flex-end'
  },
  claim: {
    alignSelf: "center",
    marginTop: 30,
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
    marginHorizontal: 13,
    minWidth: "40%",
  },
  calenderStyle: {
    justifyContent: "space-between",
  },
  claim1: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  container: {
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
  icon: {
    width: 18,
    height: 10,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: colors.place_holder,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.black,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  submitBtnStyle: {
    marginTop: 20,
    bottom: 0,
    marginHorizontal: 20
  },
  closeBtnStyle: {
    alignSelf: 'flex-end',
    alingItem: 'Center',
    padding: 5
  },
  closeIconStyle: {
    height: 20,
    width: 20,
    alignSelf: "flex-end",
    bottom: 2,
  }
});

