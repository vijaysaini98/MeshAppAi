import {
  View,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  SEMI_BOLD,
  SIXTEEN,
  Toolbar,
} from "../../../common";
import styles from "./styles";
;
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  downloadMeetingReport,
} from "../../../slices/mrSlice/mrAction";
import { AnimationSpinner } from "../../../animation";
import { btnTitle, IMAGE_PATH1, titleText } from "../../../helper/Constants";
import Pdf from "react-native-pdf";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import DocumentPreViewModal from "../../common/DocumentPreViewModal";
import { DoctorBox } from "../Home/components/doctorBox";

export const getUri = (path) => {
  const data = {
    uri: `${IMAGE_PATH1}${path}`,
  };
  return data;
};

const MeetingReport = ({ route }) => {
  const dispatch = useAppDispatch();
  const data = route?.params?.data ?? "";

  const [isVisible, setIsVisible] = useState(false);
  const [preViewData, setPreViewData] = useState("");

  const { isLoading, mrMeetingReport } = useAppSelector((state) => {
    return state.mr;
  });

  const meetingReport = JSON.parse(mrMeetingReport?.meeting_report_doc || "[]");

  let doctorAddress = data?.AppointmentTimeSlot?.timeSlotLocation[0]
    ?.doctorAddress?.pincode
    ? data?.AppointmentTimeSlot?.timeSlotLocation[0]?.doctorAddress
    : data?.doctorAddress;

  const onDwnload = () => {
    let tempData = {
      doctor_name: data.doctor_profile.name,
      speciality: [data?.doctor_profile?.doctor_speciality[0]?.specialization],
      address: `${doctorAddress?.name},${doctorAddress?.address},${doctorAddress?.city},${doctorAddress?.state},${doctorAddress?.pincode}`,
      doc_image: data?.doctor_profile?.avatar
        ? IMAGE_PATH1 + data?.doctor_profile?.avatar
        : "",
      meeting_image: mrMeetingReport?.image
        ? IMAGE_PATH1 + mrMeetingReport?.image
        : "",
      description: mrMeetingReport?.description
        ? mrMeetingReport?.description
        : "",
      pdf_urls: mrMeetingReport?.meeting_report_doc
        ? JSON.parse(mrMeetingReport?.meeting_report_doc)
        : "",
      appointment_id: mrMeetingReport?.appointment_id,
      selfie_image: mrMeetingReport?.selfie
        ? IMAGE_PATH1 + mrMeetingReport?.selfie
        : "",
    };
    dispatch(downloadMeetingReport(tempData));
  };


  const handleModal = (type, data) => {
    if (type === "image") {
      setPreViewData(data);
    } else {
      setPreViewData(data);
    }
    setIsVisible(true);
  };

  const handleClose = () => {
    setPreViewData("");
    setIsVisible(false);
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}

      <AppSafeAreaView>
        <Toolbar title={titleText.meetingReport} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainPadding}
        >
          <View style={styles.container}>
            <DoctorBox item={data} />
            <View
              style={meetingReportStyle.mainContainer}
            >
              {mrMeetingReport?.selfie && (
                <View style={meetingReportStyle.imageContainer}>
                  <AppText type={SIXTEEN} weight={SEMI_BOLD}>
                    Selfie<AppText style={{ color: "red" }}>{"*"}</AppText>
                  </AppText>
                  <TouchableOpacityView
                    style={styles.selfieContainer}
                    onPress={() =>
                      handleModal("image", mrMeetingReport?.selfie)
                    }
                  >
                    <Image
                      source={{ uri: IMAGE_PATH1 + mrMeetingReport?.selfie }}
                      resizeMode="cover"
                      style={styles.selfie}
                    />
                  </TouchableOpacityView>
                </View>
              )}
              {mrMeetingReport?.image && (
                 <View style={meetingReportStyle.imageContainer}>
                  <AppText type={SIXTEEN} weight={SEMI_BOLD}>
                    Image
                  </AppText>
                  <TouchableOpacityView
                    style={styles.selfieContainer}
                    onPress={() => handleModal("image", mrMeetingReport?.image)}
                  >
                    <Image
                      source={{ uri: IMAGE_PATH1 + mrMeetingReport?.image }}
                      resizeMode="cover"
                      style={styles.selfie}
                    />
                  </TouchableOpacityView>
                </View>
              )}
            </View>
            {meetingReport?.length !== 0 && (
              <View style={[styles.documents, meetingReportStyle.imageContainer]}>
                <AppText type={SIXTEEN} weight={SEMI_BOLD}>
                  Meeting Report Documents
                </AppText>
                <View style={[styles.documentContainer]}>
                  {meetingReport?.map((item, index) => {
                    let space = index % 2 !== 0 && { marginStart: 10 };
                    return (
                      <TouchableOpacityView
                        onPress={() => handleModal("pdf", item)}
                      >
                        <Pdf
                          source={{ uri: IMAGE_PATH1 + item }}
                          style={[styles.pdf_two, space]}
                          trustAllCerts={false}
                        />
                      </TouchableOpacityView>
                    );
                  })}
                </View>
              </View>
            )}
            {mrMeetingReport?.description && (
              <View style={[styles.middleContainer, meetingReportStyle.imageContainer]}>
                <AppText type={SIXTEEN} weight={SEMI_BOLD}>
                  Description
                </AppText>
                <AppText style={styles.description} type={FOURTEEN}>
                  {mrMeetingReport?.description}
                </AppText>
              </View>
            )}
          </View>
          {mrMeetingReport?.length !== 0 && (
            <View
              style={[
                styles.buttonContainer,
               meetingReportStyle.buttonContainer,
              ]}
            >
              <Button
                onPress={() => onDwnload()}
                children={btnTitle.downloadMeetingReport}
                // loading={isLoading}
              />
            </View>
          )}
        </ScrollView>
      </AppSafeAreaView>
      <DocumentPreViewModal
        isVisible={isVisible}
        data={preViewData}
        onClose={() => handleClose()}
      />
    </>
  );
};

export default MeetingReport;

const meetingReportStyle=StyleSheet.create({
mainContainer:{ 
  flexDirection: "row", 
  alignItems: "center", 
  gap: 10 
},
imageContainer:{
   marginTop: 20 
  },
buttonContainer: { 
  position: "relative", 
  elevation: 0, 
  marginVertical: 20 
}
})
