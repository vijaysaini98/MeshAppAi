import { View, Text, Alert, StyleSheet, ScrollView } from "react-native";
import React, { FC, useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  AppText,
  Button,
  LIGHT,
  MEDIUM,
  RadioButton,
  SEMI_BOLD,
  SIXTEEN,
  TWENTY_FOUR,
  WHITE,
} from "../../../common";
import { styles } from "../../../styles/styles";
import { appointmentType, feeType } from "../../../helper/dummydata";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { requestStatus } from "../../../slices/drSlice/drAction";
import { colors } from "../../../theme/colors";
import Toast from "react-native-simple-toast";
import { dimensions, getKey } from "../../../helper/utility";
import TouchableOpacityView from "../../../common/TouchableOpacityView";

interface AcceptTypeSheetProps {
  refSheet: any;
  id?: number;
  time?: number | string;
  locationId?: number;
  date?: Date;
  timeSlotsAvailable?: any;
  fees?: number | undefined;
  appointmentFeeType?: string;
}

const AcceptTypeSheet: FC<AcceptTypeSheetProps> = ({
  refSheet,
  id,
  time,
  locationId,
  date,
  timeSlotsAvailable,
  fees,
  appointmentFeeType,
}) => {
  const dispatch = useAppDispatch();
  const [appointment, setAppointment] = useState();
  const [feeTypes, setFeeTypes] = useState(appointmentFeeType);
  const [keyData, setKeyData] = useState([]);

  const { isBtnLoading } = useAppSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    getNewKey();
  }, []);

  const getNewKey = async () => {
    // getKey();
    let newKey = await getKey();
    if (newKey) {
      setKeyData(JSON.parse(newKey));
    }
  };
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

  const onPressSubmit = () => {
    if (!appointment) {
      return Toast.show("Please select the appointment type", Toast.LONG);
    }
    //  else if (!feeTypes) {
    //     return Toast.show("Please select the fee type", Toast.LONG);
    //   }
    else if (feeTypes !== "Free" && fees <= 0) {
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
    } else {
      let apiData = {
        request: "Accept",
        appointment_id: id,
        fee_type: keyData?.fee_type?.Free
          ? feeTypes === "Free"
            ? keyData?.fee_type?.Free?.toString()
            : keyData?.fee_type?.Paid?.toString()
          : "",
        appointment_type: keyData?.appointment_type
          ? appointment === "Clinic Visit"
            ? keyData?.appointment_type["Clinic Visit"]?.toString()
            : keyData?.appointment_type?.Virtual?.toString()
          : "",
        appointment_status: keyData?.appointment_status?.Accepted?.toString()
          ? keyData?.appointment_status?.Accepted?.toString()
          : "",
        time_slots_available: timeSlotsAvailable,
        date: date,
        time: time,
        doctor_location_id: locationId,
        // appointment_id: 226,
        // appointment_status: "900",
        // appointment_type: "400",
        // fee_type: "200",
        // request: "Accept",
      };

      dispatch(requestStatus(apiData, "fromAccept", successCallBack, "free"));
    }
  };

  const successCallBack = () => {
    refSheet?.current?.close();
  };

  return (
    <RBSheet
      ref={refSheet}
      useNativeDriver={false}
      closeOnPressMask={true}
      closeOnPressBack={true}
      openDuration={200}
      closeDuration={200}
      draggable={false}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0,0,0, 0.7)",
        },
        draggableIcon: {
          width: 150,
          backgroundColor: colors.border,
        },
        container: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          elevation: 18,
        },
      }}
      customModalProps={{
        animationType: "slide",
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
      height={dimensions.height * 0.42}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={acceptSheetStyle.mainContainer}
      >
        <AppText
          type={TWENTY_FOUR}
          weight={SEMI_BOLD}
          style={styles.sendMessageBottomSheet}
        >
          Accept Appointment
        </AppText>
        {/* <View style={acceptSheetStyle.feeTypeContainer}>
            <AppText  type={SIXTEEN}
            weight={SEMI_BOLD} >Fees Type:</AppText>
            <View style={acceptSheetStyle.feeStatusContainer}>
              <AppText type={SIXTEEN}
            weight={SEMI_BOLD} color={WHITE}> {appointmentFeeType}</AppText>
            </View>
          </View> */}
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
              <View key={e.id} style={styles.appointmentBox}>
                <TouchableOpacityView
                  onPress={() => onPressAppointmentTypeButton(e?.name)}
                  style={styles.appointmentContainer}
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
        {/* <AppText style={styles.feeType} type={SIXTEEN} weight={MEDIUM}>
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
          </View> */}
        {/* {appointmentFeeType !== "Free"  &&(
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
      </ScrollView>
      <Button
        loading={isBtnLoading}
        containerStyle={acceptSheetStyle.submitButton}
        children="Submit"
        onPress={() => onPressSubmit()}
      />
    </RBSheet>
  );
};

export default AcceptTypeSheet;

const acceptSheetStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  feeTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
    justifyContent: "center",
  },
  feeStatusContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.buttonBg,
    borderRadius: 5,
  },
  submitButton: {
    marginHorizontal: 16,
    bottom: 25,
  },
});
