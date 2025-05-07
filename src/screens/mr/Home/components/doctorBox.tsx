import React, { useEffect, useRef, useState } from "react";
import {
  AppText,
  BOLD,
  Button,
  EIGHTEEN,
  FOURTEEN,
  MEDIUM,
  RadioButton,
  SEMI_BOLD,
  TEN,
  TWELVE,
  TWENTY_FOUR,
  WHITE,
} from "../../../../common";
import {
  Alert,
  Image,
  View,
} from "react-native";
import {
  calendarIcon,
  download_icon,
  DummyDoctor,
  locationIcon,
} from "../../../../helper/ImageAssets";
import TouchableOpacityView from "../../../../common/TouchableOpacityView";
import { styles } from "../../../../styles/styles";
import NavigationService from "../../../../navigation/NavigationService";
import {
  MEETING_REPORT,
  REQUEST_APPOINTMENT_SCREEN,
  SELFIE_SCREEN,
} from "../../../../navigation/routes";
import { IMAGE_PATH1 } from "../../../../helper/Constants";
import { colors } from "../../../../theme/colors";
import { EndMeetingData, sendMessageData } from "../../../../helper/dummydata";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";
import { useAppSelector } from "../../../../store/hooks";
import {
  EndMeeting,
  ViewMeetingReport,
  downloadPaymentReceipt,
  paymentReceiptApi,
  requestRefund,
  sendMessage,
} from "../../../../slices/mrSlice/mrAction";
import CameraModal from "../../../common/cameraModal";
import { uploadImage } from "../../../../slices/drSlice/drAction";
import { useDispatch } from "react-redux";
import {
  universalPaddingHorizontal,
  universalPaddingHorizontalMedium,
  universalPaddingVertical,
} from "../../../../theme/dimens";
import MeetingTypeSheet from "../../../common/MeetingSheet";
import CancelSheet from "../../../common/CancelSheet";
import {
  getClientId,
  getMrLocation,
  getReverseKey,
  getStatus,
} from "../../../../helper/utility";
import { showError } from "../../../../helper/logger";



export const DoctorBox = ({
    item,
    featureNo,
    onNavigation,
    num,
    location,
    download,
    type,
  }) => {
    const dispatch = useDispatch();
    const { name, department, address, feature = featureNo } = item;

    const refRBSheet = useRef();
    const refEndMeeting = useRef();
    const refMeetingSheet = useRef();
    const cancelSheet = useRef();
  
    const [rejectionType, setRejectionType] = useState<number|null>(null);
    const [endMeetingIdStatus, setEndMeetingStatusId] = useState<number|null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
  
    const onPressRejectionTypeButton = (id:number) => {
      if (rejectionType !== id) {
        setRejectionType(id);
      } else {
        setRejectionType(null);
      }
    };
  
    const onPressEndMeetingTypeButton = (id:number) => {
      if (endMeetingIdStatus !== id) {
        setEndMeetingStatusId(id);
      } else {
        setEndMeetingStatusId(id);
      }
    };
  
    // const getData = async () => {
    //   let newKey = await getReverseKey();
    //   let clinet = await getClientId();
    //   if (newKey) {
    //     setKeyData(JSON.parse(newKey));
    //   }
    //   if (clinet) {
    //     setClientIds(clinet);
    //   }
    // };
  
    // useEffect(() => {
    //   // getKey();
    //   getData();
    // }, []);
    // useEffect(() => {
    //   // getKey();
    //   getData();
    // }, []);
  
    const featureValidation = () => {
      const onPressRequest = () => {
        NavigationService.navigate(REQUEST_APPOINTMENT_SCREEN, { data: item });
      };
  
      const time = item?.time;
      const formattedTime = moment(time, "HH:mm:ss.SSSSSS").format("hh:mm A");
  
      const currentTime = moment();
      const currentTimeFound = currentTime.format("hh:mm A");
      const adjustedTime = moment(time, "HH:mm:ss.SSSSSS").add(6, "minutes");
      const adjustedFormattedTime = adjustedTime.format("hh:mm A");
  
      const date = item?.date;
      const formattedDate = moment(date).format("DD MMM,YYYY");
  
      const currentDate = moment();
      const currentDateFound = currentDate.format("DD MMM,YYYY");

      const [uploadedImage, setuploadedImage] = useState([]);
      const [imgUrl, stImgUrl] = useState("");
      const [distanceCheckLoader, setDistanceCheckLoader] = useState(false);

       const [sendMsg, setSendMsg] = useState(null);
  
      const [endMeetingStatus, setEndMeetingStatus] = useState(null);
  
      let formData = new FormData();
  
      useEffect(() => {
        if (imgUrl) {
          formData.append("image", imgUrl);
          // setProfile({ ...viewimgData, medicalInfo: [...medicaldoc, imgUrl] });
          dispatch(uploadImage(formData, uploadedImage, setuploadedImage));
        }
      }, [imgUrl]);
  
      const { isBtnLoading } = useAppSelector((state) => {
        return state.auth;
      });
  
      const handleSuccessEndMeeting = () => {
        NavigationService.navigate(SELFIE_SCREEN, {
          id: item?.doctor_id,
          appointment_id: item?.id,
        });
        setEndMeetingStatus(null);
        refEndMeeting.current.close();
        setLatitude(null);
        setLongitude(null);
      };
  
      const handleRefundSuccess = () => {
        setEndMeetingStatus(null);
        refEndMeeting?.current.close();
      };
  
      const onPressEndMeeting = async (endMeetingStatus?:string, doctorId?:number, from?:string) => {
        if (endMeetingStatus === "200") {
          if (item?.appointment_type === "400") {
            const distanceCheck = await getMrLocation(
              latitude,
              longitude,
              "mr",
              setDistanceCheckLoader
            );
  
            let docCurrentLocdistance = null;
            if (
              item?.doctor_profile?.doctorProfile[0]?.doc_latitude != null &&
              item?.doctor_profile?.doctorProfile[0]?.doc_longitude != null
            ) {
              docCurrentLocdistance = await getMrLocation(
                item?.doctor_profile?.doctorProfile[0]?.doc_latitude,
                item?.doctor_profile?.doctorProfile[0]?.doc_longitude,
                "mr",
                setDistanceCheckLoader
              );
            }
            const isWithinDistance =
              distanceCheck?.isWithin500Meters ||
              docCurrentLocdistance?.isWithin500Meters;
  
            if (isWithinDistance) {
              const data = { appointment_id: item?.id };
              dispatch(EndMeeting(data, handleSuccessEndMeeting));
            } else {
              const distance =
                item?.doctor_profile?.doctorProfile[0]?.doc_latitude !== null
                  ? Math.round(docCurrentLocdistance?.distance)
                  : Math.round(distanceCheck?.distance);
              showError(
                `Your current range is ${distance}m, you have to be within a 500m range from the doctor to end the meeting.`
              );
            }
          } else {
            const data = { appointment_id: item?.id };
            dispatch(EndMeeting(data, handleSuccessEndMeeting));
          }
        } else {
          const data = { appointment_id: item?.id };
          dispatch(requestRefund(data, from, handleRefundSuccess));
        }
      };
  
      const onPressViewMeeting = () => {
        dispatch(ViewMeetingReport(item?.id));
        NavigationService.navigate(MEETING_REPORT, { data: item });
      };

  
      const handleSendSubmit = (message?:string, doctorId?:number) => {
        let data = {
          message: message,
          doctor_id: doctorId,
        };
        dispatch(sendMessage(data));
        refRBSheet.current.close();
      };
  
      if (feature === 1) {
        return (
          <Button
            children="Request An Appointment"
            containerStyle={styles.requestButton}
            onPress={() => onPressRequest()}
          />
        );
      } else if (feature === 2) {
        return (
          <View style={styles.featureSecondContainer}>
            <View style={styles.featureSecondContainer2}>
              <AppText type={TEN}>Appointment Date & Time</AppText>
              <AppText weight={BOLD}>
                {formattedDate} {formattedTime}
              </AppText>
            </View>
            <View style={styles.borderView} />
            <View style={styles.featureSecondContainer2}>
              <AppText type={TEN}>Appointment Type</AppText>
              <AppText weight={BOLD}>
                {item?.appointment_type == "400" ? "Clinic Visit" : "Virtual"}
              </AppText>
            </View>
          </View>
        );
      } else if (feature === 3) {
        return (
          <>
            <Button
              children="Submit Meeting Report"
              containerStyle={styles.button}
              onPress={() => refMeetingSheet.current.open()}
            />
            <MeetingTypeSheet
              refSheet={refMeetingSheet}
              id={item?.id}
              item={item}
            />
          </>
        );
      } else if (feature === 4) {
        return (
          <>
            <View style={styles.featureSecondContainer}>
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Date & Time</AppText>
                <AppText weight={BOLD}>
                  {formattedDate} {formattedTime}
                </AppText>
              </View>
              <View style={styles.borderView} />
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Type</AppText>
                <AppText weight={BOLD}>
                  {item?.appointment_type == "400" ? "Clinic Visit" : "Virtual"}
                </AppText>
              </View>
            </View>
            <Button
              children="View Meeting Report"
              containerStyle={[
                styles.button2,
                { backgroundColor: colors.buttonBg },
              ]}
              onPress={() => NavigationService.navigate(MEETING_REPORT)}
            />
          </>
        );
      } else if (feature === 5) {
        return (
          <Button
            children="Reschedule Meeting"
            containerStyle={styles.button2}
            onPress={() => NavigationService.navigate(REQUEST_APPOINTMENT_SCREEN)}
          />
        );
      } else if (feature === 6) { //Upcomming =6
        return (
          <>
            <View style={styles.featureSecondContainer3}>
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Date & Time</AppText>
                <AppText weight={BOLD}>
                  {formattedDate} {formattedTime}
                </AppText>
              </View>
              <View style={styles.borderView} />
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Type</AppText>
                <AppText weight={BOLD}>
                  {item?.appointment_type == "400" ? "Clinic Visit" : "Virtual"}
                </AppText>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                children="Send Message"
                containerStyle={[
                  styles.button4,
                  { marginRight: universalPaddingHorizontal },
                ]}
                onPress={() => {
                  refRBSheet.current.open();
                }}
              />
            </View>
  
            <RBSheet
              ref={refRBSheet}
              height={400}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                wrapper: {
                  backgroundColor: colors.rbSheetBackgroung,
                },
                draggableIcon: {
                  backgroundColor: "silver",
                  width: 100,
                },
              }}
            >
              <View
                style={[styles.rejectionBox, { flex: 1, marginHorizontal: 16 }]}
              >
                <AppText
                  type={TWENTY_FOUR}
                  weight={SEMI_BOLD}
                  style={styles.sendMessageBottomSheet}
                >
                  Send Message
                </AppText>
                {sendMessageData?.map((e, index) => {
                  return (
                    <View>
                      <RadioButton
                        radioContainerStyle={styles.appointmentContainer}
                        value={rejectionType === index ? true : false}
                        onPress={() => {
                          onPressRejectionTypeButton(index);
                          setSendMsg(e?.message);
                        }}
                        message={e?.message}
                      />
                    </View>
                  );
                })}
              </View>
              <View style={styles.sendMessageSubmitButton}>
                <Button
                  containerStyle={styles.submit}
                  children="Submit"
                  onPress={() => handleSendSubmit(sendMsg, item?.doctor_id)}
                  disabled={sendMsg ? false : true}
                />
              </View>
            </RBSheet>
          </>
        );
      } else if (feature === 7) {
        return (
          <View>
            <View style={styles.featureSecondContainer}>
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Date & Time</AppText>
                <AppText weight={BOLD}>
                  {formattedDate} {formattedTime}
                </AppText>
              </View>
              <View style={styles.borderView} />
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Type</AppText>
                <AppText weight={BOLD}>
                  {item?.appointment_type == "400" ? "Clinic Visit" : "Virtual"}
                </AppText>
              </View>
            </View>
          </View>
        );
      } else if (feature === 8) { // onGoing= 8
        return (
          <View>
            <View style={styles.featureSecondContainer}>
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Date & Time</AppText>
                <AppText weight={BOLD}>
                  {formattedDate} {formattedTime}
                </AppText>
              </View>
              <View style={styles.borderView} />
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Type</AppText>
                <AppText weight={BOLD}>
                  {item?.appointment_type == "400" ? "Clinic Visit" : "Virtual"}
                </AppText>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                disabled={
                  currentDateFound != formattedDate ||
                  (adjustedFormattedTime >= currentTimeFound &&
                    currentDateFound == formattedDate)
                    ? true
                    : false
                }
                children="End Meeting"
                onPress={() => {
                  setLongitude(
                    item?.AppointmentTimeSlot?.timeSlotLocation[0]?.longitude
                  );
                  setLatitude(
                    item?.AppointmentTimeSlot?.timeSlotLocation[0]?.latitude
                  );
                  refEndMeeting?.current?.open();
                }}
                containerStyle={styles.button4}
              />
              <Button
                children="Cancel Meeting"
                onPress={() => cancelSheet.current.open()}
                containerStyle={styles.button3}
              />
              <CancelSheet refSheet={cancelSheet} id={item?.id} />
            </View>
  
            <RBSheet
              ref={refEndMeeting}
              height={300}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                wrapper: {
                  backgroundColor: colors.rbSheetBackgroung,
                },
                draggableIcon: {
                  backgroundColor: "silver",
                  width: 100,
                },
              }}
            >
              <View
                style={[styles.rejectionBox, { flex: 1, marginHorizontal: 16 }]}
              >
                <AppText
                  type={TWENTY_FOUR}
                  weight={SEMI_BOLD}
                  style={styles.sendMessageBottomSheet}
                >
                  End Meeting
                </AppText>
                {EndMeetingData?.map((e, index) => {
                  return (
                    <View>
                      <RadioButton
                        radioContainerStyle={styles.appointmentContainer}
                        value={endMeetingIdStatus === index ? true : false}
                        onPress={() => {
                          onPressEndMeetingTypeButton(index);
                          setEndMeetingStatus(e?.id);
                        }}
                        message={e?.message}
                      />
                    </View>
                  );
                })}
              </View>
              <View style={styles.sendMessageSubmitButton}>
                <Button
                  containerStyle={styles.submit}
                  children="Submit"
                  onPress={() =>
                    onPressEndMeeting(endMeetingStatus, item?.doctor_id)
                  }
                  disabled={endMeetingStatus ? false : true}
                  loading={isBtnLoading || distanceCheckLoader}
                />
              </View>
            </RBSheet>
            <MeetingTypeSheet
              refSheet={refMeetingSheet}
              id={item?.id}
              item={item}
            />
          </View>
        );
      } else if (feature === 9) {// pending =9
        return (
          <>
            <View style={styles.featurePendingContainer}>
              {getStatus(item?.appointment_status) === "Pending" ? (
                <View style={styles.appointment}>
                  <View>
                    <AppText type={TWELVE}>Appointment </AppText>
                    <AppText type={TWELVE}>Date & Time </AppText>
                  </View>
  
                  <AppText
                    style={styles.pendingDate}
                    type={FOURTEEN}
                    weight={BOLD}
                  >
                    {formattedDate} {formattedTime}
                  </AppText>
                </View>
              ) : (
                <View style={styles.featureSecondContainer}>
                  <View style={styles.featureSecondContainer2}>
                    <AppText type={TEN}>Appointment Date & Time</AppText>
                    <AppText weight={BOLD}>
                      {formattedDate} {formattedTime}
                    </AppText>
                  </View>
                  <View style={styles.borderView} />
                  <View style={styles.featureSecondContainer2}>
                    <AppText type={TEN}>Appointment Type</AppText>
                    <AppText weight={BOLD}>
                      {item?.appointment_type == "400"
                        ? "Clinic Visit"
                        : "Virtual"}
                    </AppText>
                  </View>
                </View>
              )}
            </View>
            {item?.appointment_status != "1700" && (
              <Button
                // loading={
                //   paymentLoader
                // }
                children="Reschedule Appointment"
                containerStyle={{
                  marginHorizontal: universalPaddingHorizontalMedium,
                  marginVertical: 10,
                  backgroundColor: colors.buttonBg,
                }}
                onPress={() =>
                  NavigationService.navigate(REQUEST_APPOINTMENT_SCREEN, {
                    data: item,
                    type: "reschedule",
                  })
                }
              />
            )}
          </>
        );
      } else if (feature === 10) {
        return (
          <View>
            <View style={styles.featureSecondContainer3}>
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Date & Time</AppText>
                <AppText weight={BOLD}>
                  {formattedDate} {formattedTime}
                </AppText>
              </View>
              <View style={styles.borderView} />
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Type</AppText>
                <AppText weight={BOLD}>
                  {item?.appointment_type == "400" ? "Clinic Visit" : "Virtual"}
                </AppText>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                children="Start Meeting"
                containerStyle={styles.button3}
                onPress={() => NavigationService.navigate(SELFIE_SCREEN)}
              />
              <Button
                children="Send Message"
                containerStyle={styles.button4}
                onPress={() => Alert.alert("hi")}
              />
            </View>
            <Button
              children="View Meeting Link"
              containerStyle={styles.rescheduleButton}
              onPress={() => NavigationService.navigate(SELFIE_SCREEN)}
            />
          </View>
        );
      } else if (feature === 11) {// completed= 11
        return (
          <View>
            <View style={styles.featureSecondContainer}>
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Date & Time</AppText>
                <AppText weight={BOLD}>
                  {formattedDate} {formattedTime}
                </AppText>
              </View>
              <View style={styles.borderView} />
              <View style={styles.featureSecondContainer2}>
                <AppText type={TEN}>Appointment Type</AppText>
                <AppText weight={BOLD}>
                  {item?.appointment_type == "400" ? "Clinic Visit" : "Virtual"}
                </AppText>
              </View>
            </View>
            {item?.reports_submitted === false ? (
              <Button
                children="Submit Meeting Report"
                containerStyle={{
                  marginHorizontal: universalPaddingHorizontal,
                  marginBottom: universalPaddingHorizontalMedium,
                }}
                onPress={() => refMeetingSheet.current.open()}
              />
            ) : (
              <Button
                children="View Meeting Report"
                containerStyle={[
                  styles.button2,
                  { backgroundColor: colors.buttonBg },
                ]}
                onPress={() => onPressViewMeeting()}
              />
            )}
  
            <MeetingTypeSheet
              refSheet={refMeetingSheet}
              id={item?.id}
              item={item}
            />
          </View>
        );
      } else if (feature === 12) {// refund=12
        return (
          <>
            <View style={styles.featurePendingContainer}>
              <View style={styles.appointment}>
                <View>
                  <AppText type={TWELVE}>Appointment </AppText>
                  <AppText type={TWELVE}>Date & Time </AppText>
                </View>
  
                <AppText style={styles.pendingDate} type={FOURTEEN} weight={BOLD}>
                  {formattedDate} {formattedTime}
                </AppText>
              </View>
            </View>
          </>
        );
      } else if (feature === 13) {// rejected=13
        return (
          <View style={styles.featureSecondContainer}>
            <View style={styles.featureSecondContainer2}>
              <AppText type={TEN}>Appointment Date & Time</AppText>
              <AppText weight={BOLD}>
                {formattedDate} {formattedTime}
              </AppText>
            </View>
            <View style={styles.borderView} />
            <View style={styles.featureSecondContainer2}>
              <AppText type={TEN}>Appointment Type</AppText>
              <AppText weight={BOLD}>
                {item?.appointment_type == "400" ? "Clinic Visit" : "Virtual"}
              </AppText>
            </View>
          </View>
        );
      }
    };
  
    const imageSelect = (n?:number) => {
      if (n === 1) {
        return (
          <Image
            source={calendarIcon}
            resizeMode="contain"
            style={styles.locationIcon}
          />
        );
      }
      if (n === 2) {
        return (
          <Image
            source={locationIcon}
            resizeMode="contain"
            style={styles.locationIcon}
          />
        );
      }
      return (
        <Image
          source={locationIcon}
          resizeMode="contain"
          style={styles.locationIcon}
        />
      );
    };
  
    const locationDate = (n?:number) => {
      const [showFullAddress, setShowFullAddress] = useState(false);
      if (n === 1) {
        return (
          <AppText weight={MEDIUM} type={FOURTEEN}>
            {item?.appointment_date
              ? moment(item?.appointment_date?.created_at).format("MMMM Do YYYY")
              : ""}
          </AppText>
        );
      }
      if (n === 2) {
        return (
          <AppText weight={MEDIUM} type={FOURTEEN}>
            {address}
          </AppText>
        );
      }
  
      let appointmentAdrress =
        item?.AppointmentTimeSlot?.timeSlotLocation[0]?.doctorAddress?.pincode !==
          null &&
        item?.AppointmentTimeSlot?.timeSlotLocation[0]?.doctorAddress?.pincode !==
          undefined
          ? item?.AppointmentTimeSlot?.timeSlotLocation[0]?.doctorAddress
          : item?.doctorAddress;
  
      let completeAddress = `${appointmentAdrress?.name}, ${appointmentAdrress?.address}, ${appointmentAdrress?.city}, ${appointmentAdrress?.state}, ${appointmentAdrress?.pincode}`;
  
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <AppText
            weight={MEDIUM}
            type={FOURTEEN}
            style={{ flex: 1 }}
            numberOfLines={showFullAddress ? 0 : 2}
          >
            {item?.Users?.Company?.street_address
              ? item?.Users?.Company?.street_address
              : item?.address
              ? item?.address
              : item?.user_address_details?.address
              ? item?.user_address_details?.address
              : item?.user_details?.address
              ? item?.user_details?.address
              : item?.user_details?.city
              ? item?.user_details?.city
              : appointmentAdrress
              ? completeAddress
              : "- - -"}
          </AppText>
          {appointmentAdrress && completeAddress?.length >= 55 && (
            <AppText
              weight={BOLD}
              style={{
                textAlign: "left",
                alignSelf: "flex-end",
                color: colors.buttonBg,
                flex: 0.2,
              }}
              onPress={() => setShowFullAddress(!showFullAddress)}
            >
              {showFullAddress ? "less" : "more"}
            </AppText>
          )}
        </View>
      );
    };
  
    const statusCheck = () => {
      if (item?.appointment_status && item?.payment_status) {
        return (
          <View style={[styles.status]}>
            <AppText color={WHITE}>{getStatus(item?.appointment_status)}</AppText>
          </View>
        );
      }
    };
  
    const onDownload = (item?:any) => {
      if (type === "dr") {
        successCallbackdr(item);
      } else {
        dispatch(paymentReceiptApi((data) => successCallback(data, item)));
      }
    };

    const successCallbackdr = (item?:any) => {
      let successData = `company_name=${
        item?.user_name[0]?.Company?.company_name
          ? item?.user_name[0]?.Company?.company_name
          : ""
      }&from=${item?.user_name[0]?.name}&to=${
        item?.doctor_profile?.name
      }&date=${moment(
        item?.appointment_date ? item?.appointment_date?.created_at : new Date()
      ).format("MMMM Do YYYY")}&payment_method=online&amount=${
        item?.final_amount ? item?.final_amount : "0"
      }&appointment_id=${item?.id}&token=Bearer `;
      dispatch(downloadPaymentReceipt(successData));
    };
  
    const successCallback = (data?:any, item?:any) => {
      let successData = `company_name=${data[0]?.Company?.company_name}&from=${
        data[0]?.name
      }&to=${item?.doctor_profile?.name}&date=${moment(
        item?.appointment_date ? item?.appointment_date?.created_at : new Date()
      ).format("MMMM Do YYYY")}&payment_method=online&amount=${
        item?.final_amount ? item?.final_amount : "0"
      }&appointment_id=${item?.id}&token=Bearer `;
  
      dispatch(downloadPaymentReceipt(successData));
    };
  
  
    const specialityvalidation = (item?:any) => {
      if (
        item?.spec_details &&
        item?.spec_details?.length !== 0 &&
        item?.spec_details[0]?.speciality?.specialization
      ) {
        return item?.spec_details[0]?.speciality?.specialization;
      } else if (
        item?.doctor_profile?.doctor_speciality &&
        item?.doctor_profile?.doctor_speciality?.length !== 0 &&
        item?.doctor_profile?.doctor_speciality[0]?.specialization
      ) {
        return item?.doctor_profile?.doctor_speciality[0]?.specialization;
      } else if (
        item?.doctor_speciality &&
        item?.doctor_speciality?.length !== 0 &&
        item?.doctor_speciality[0]?.specialization
      ) {
        return item?.doctor_speciality[0]?.specialization;
      } else if (item?.user_name && item?.user_name[0]?.Company?.company_name) {
        return item?.user_name[0]?.Company?.company_name;
      } else return department ? department : "";
    };
  
    const rejectReason = () => {
      if (item?.rejection_reason) {
        return (
          <View style={[styles.status]}>
            <AppText color={WHITE}>{item?.rejection_reason}</AppText>
          </View>
        );
      }
    };
  
    return (
      <View style={styles.doctorBoxContainer}>
        <TouchableOpacityView
          onPress={onNavigation}
          style={styles.homeToolContainer5}
        >
          <Image
            source={
              item?.user_details?.avatar
                ? { uri: IMAGE_PATH1 + item?.user_details?.avatar }
                : item?.user_name && item?.user_name[0]?.avatar
                ? { uri: IMAGE_PATH1 + item?.user_name[0]?.avatar }
                : item?.doctor_profile?.avatar
                ? { uri: IMAGE_PATH1 + item?.doctor_profile?.avatar }
                : item.avatar
                ? { uri: IMAGE_PATH1 + item?.avatar }
                : DummyDoctor
            }
            resizeMode="cover"
            style={styles.doctorImage}
          />
          <View style={styles.homeToolContainer3}>
            <View style={styles.downloadContainer}>
              <AppText type={EIGHTEEN} weight={MEDIUM} style={{ width: "100%" }}>
                {item?.Users?.name
                  ? item?.Users?.name
                  : item?.user_name
                  ? item?.user_name[0]?.name
                  : item?.doctor_profile?.name
                  ? item?.doctor_profile?.name
                  : item?.user_details?.name
                  ? item?.user_details?.name
                  : item?.name
                  ? item?.name
                  : name}
              </AppText>
            </View>
            <View style={[styles.statusContainer]}>
              <View
                style={{
                  backgroundColor: colors.buttonBg,
                  borderRadius: 20,
                  paddingHorizontal: universalPaddingVertical,
                  paddingVertical: 5,
                  marginTop: 10,
                  marginRight: 5,
                }}
              >
                <AppText color={WHITE} numberOfLines={1}>
                  {specialityvalidation(item)}
                </AppText>
              </View>
              {rejectReason()}
              {(feature === 9 || feature === 12 || feature === 6) &&
                statusCheck()}
            </View>
  
            <View style={[styles.homeToolContainer4, { paddingHorizontal: 0 }]}>
              {imageSelect(num)}
              {locationDate(location)}
            </View>
            {/* )} */}
          </View>
        </TouchableOpacityView>
        <CameraModal
          KycCamraisModalVisible={isModalVisible}
          setKycCamraisModalVisible={setModalVisible}
        />
        {featureValidation()}
      </View>
    );
  };
  