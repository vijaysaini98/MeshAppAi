import React, { useRef, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  MEDIUM,
  SIXTEEN,
  THIRTY_EIGHT,
  Toolbar,
  WHITE,
  TWELVE,
  BOLD,
} from "../../../common";
import { Image, View } from "react-native";
import KeyBoardAware from "../../../common/KeyboardAware";
import { locationIcon, calendar_type, DummyUser } from "../../../helper/ImageAssets";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { colors } from "../../../theme/colors";
import moment from "moment";
import { useAppSelector } from "../../../store/hooks";
import AcceptTypeSheet from "../../common/AcceptSheet";
import RejectionSheet from "../../common/RejectionSheet";
import NavigationService from "../../../navigation/NavigationService";
import { DOCTOR_DATA_DETAILS } from "../../../navigation/routes";
import { IMAGE_PATH1 } from "../../../helper/Constants";

const RecentRequestDetails = ({ route }) => {
  
  const appointmentTypeSheet = useRef();
  const rejectionSheet = useRef();
  const { recentAppointmentList, isLoading } = useAppSelector((state) => {
    return state.doctor;
  });

  const data = route?.params?.data ?? "";

  const RescheduleButton = () => {
    NavigationService.navigate(DOCTOR_DATA_DETAILS, { data: data });
  };

  const dispatch = useDispatch();
  const [appointment, setAppointment] = useState();
  const [feeTypes, setFeeTypes] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectDate, setSelectDate] = useState();
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
  };
  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <View style={styles.container}></View>

      <Toolbar isBack />

      <View style={styles.alignCenter}>
        <AppText type={THIRTY_EIGHT} weight={MEDIUM}>
          {data?.Users?.name}
        </AppText>
      </View>
      <View style={styles.homeToolContainer4}>
        <Image
          source={locationIcon}
          resizeMode="contain"
          style={styles.locationIcon}
          tintColor={colors.buttonBg}
        />
        <AppText weight={MEDIUM} type={FOURTEEN}>
          {" "}
          {data?.Users?.Company?.street_address ?
            data?.Users?.Company?.street_address
            : data?.user_address_details?.city ?
              data?.user_address_details?.city :
              '- - -'}
        </AppText>
      </View>

      <View style={styles.idContainer}>
        <AppText type={FOURTEEN} color={WHITE}>
          {data?.Users?.Company?.company_name}
        </AppText>
      </View>
      <KeyBoardAware>
        <View style={styles.subContainer}>
          <AppText type={SIXTEEN} style={styles.divisionText}>
            Division's:
          </AppText>
          <View style={styles.divisionContainer}>
            <View style={styles.idContainer2}>
              <AppText type={FOURTEEN} color={WHITE}>
                Biochemistry
              </AppText>
            </View>
            <View style={styles.idContainer1}>
              <AppText type={FOURTEEN} color={WHITE}>
                Anatomy
              </AppText>
            </View>
            <View style={styles.idContainer1}>
              <AppText type={FOURTEEN} color={WHITE}>
                Cardiac
              </AppText>
            </View>
          </View>
          <View style={styles.appointmentDate}>
            <Image
              source={calendar_type}
              resizeMode="contain"
              style={styles.calendar_type}
            />
            <View style={styles.dateText}>
              <AppText type={TWELVE}>Appointment Date & Time</AppText>
              <AppText style={{ marginTop: 5 }} type={FOURTEEN} weight={BOLD}>
                {data?.date}
              </AppText>
            </View>
          </View>
          <Button
            children="Reject"
            onPress={() => rejectionSheet.current.open()}
            containerStyle={styles.rejectBtn}
          />

          <Button
            children="Accept"
            onPress={() => appointmentTypeSheet.current.open()}
            containerStyle={styles.accepttBtn}
          />
          <AcceptTypeSheet refSheet={appointmentTypeSheet} id={data?.id} />
          <RejectionSheet refSheet={rejectionSheet} id={data?.id} />
        </View>
      </KeyBoardAware>
      <View style={{ backgroundColor: colors.white }}>
        <Button
          children="Reschedule Appointment"
          containerStyle={styles.rescheduleButton}
          onPress={() => RescheduleButton()}
        />
      </View>
      <Image
        source={
          data?.Users?.avatar
            ? { uri: IMAGE_PATH1 + data?.Users?.avatar }
            : DummyUser
        }
        resizeMode="cover" style={styles.welcomeLogo} />
    </AppSafeAreaView>
  );
};

export default RecentRequestDetails;
