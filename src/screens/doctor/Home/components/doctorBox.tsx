import React, { FC, useEffect, useRef, useState } from "react";
import { Alert, Image, Linking, View, ViewStyle } from "react-native";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import NavigationService from "../../../../navigation/NavigationService";
import {
  CALLING_SCREEN,
  DOCTOR_DATA_DETAILS,
} from "../../../../navigation/routes";
import {
  AppText,
  BOLD,
  Button,
  MEDIUM,
  TEN,
  THIRTEEN,
  TWELVE,
  FOURTEEN,
  WHITE,
  TWENTY,
} from "../../../../common";
import {
  calendarIcon,
  locationIcon,
  bellIcon,
  DummyMr,
} from "../../../../helper/ImageAssets";
import TouchableOpacityView from "../../../../common/TouchableOpacityView";
import { styles } from "../../../../styles/styles";
import { colors } from "../../../../theme/colors";
import StarRating from "../../../../common/StarRating";
import {
  addRatings,
  doctorStartMeeting,
  endMeeting,
} from "../../../../slices/drSlice/drAction";
import RejectionSheet from "../../../common/RejectionSheet";
import AcceptTypeSheet from "../../../common/AcceptSheet";
import {
  setAppointmentProductData,
  setProductModal,
} from "../../../../slices/drSlice/drSlice";
import { getReverseKey, getStatus } from "../../../../helper/utility";
import RatingScreen from "../../../common/RatingScreen";
import ProductModal from "../productModal";
import { IMAGE_PATH1 } from "../../../../helper/Constants";
import { universalPaddingVertical } from "../../../../theme/dimens";
import { CompleteAndRejectFeature, OnGoingFeature, PendingFeature, UpComingFeature } from "./features";


interface DoctorBoxProps{
  item?:any,
  borderStyle:ViewStyle|undefined,
  onNavigation:()=>void | undefined,
  featureNo:number,
  featureType:string | undefined,
}

const DoctorBox:FC<DoctorBoxProps> = ({
  item,
  borderStyle,
  onNavigation,
  featureNo,
  featureType,
}) => {
  const appointmentTypeSheet = useRef();
  const rejectionSheet = useRef();
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(item?.ratings?.average_rating || 0);
  const [isRatingModal, setIsRatingModal] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [keyData, setKeyData] = useState([]);
  const { isProductModalVisible } = useAppSelector((state) => state.doctor);

  const {
    department,
    address,
    feature = featureNo,
    date,
    num,
    location,
    download,
    doctorStatus,
    rno,
    time,
  } = item;

  useEffect(() => {
    const getData = async () => {
      const newKey = await getReverseKey();
      if (newKey) setKeyData(JSON.parse(newKey));
    };
    getData();
  }, []);

  const formattedTime = moment(time, "HH:mm:ss.SSSSSS").format("hh:mm A");
  const formattedDate = moment(date).format("DD MMM, YYYY");
  let itemDateTime = moment(
    `${date} ${time}`,
    "YYYY-MM-DD HH:mm:ss.SSSSSS"
  ).add(5, "minutes");
  const disableStartButton = itemDateTime.isBefore(moment());

  const handleJoinMeetingLink = (link) => {
    const newLink = link.startsWith("http") ? link : `https://${link}`;
    Linking.openURL(newLink).catch((err) => Alert.alert("Error", err.message));
  };

  const hanldeStartMeeting = (data) => {
    dispatch(
      doctorStartMeeting(data, (res) => {
        dispatch(setAppointmentProductData(res?.product_details));
        setTimeout(() => dispatch(setProductModal(true)), 300);
        if (res?.appointment_type !== "400") {
          NavigationService.navigate(CALLING_SCREEN, {
            appointmentId: res?.id,
            appointmentDate: res?.date,
          });
        }
      })
    );
  };

  const handleEndMeeting = (id) => dispatch(endMeeting({ appointment_id: id }));

  const handleRating = () => {
    const data = {
      reviewer_id: item?.Users?.id,
      ratings: rating,
      remarks: "ratings",
    };
    dispatch(addRatings(data, setIsRatingModal));
  };

  const renderFeatureComponent = () => {
    const props = {
      item,
      formattedDate,
      formattedTime,
      disableStartButton,
      rejectionSheet,
      isProductModalVisible: isProductModalVisible,
      hanldeStartMeeting: () => hanldeStartMeeting(item),
      handleEndMeeting: () => handleEndMeeting(item?.id),
      reschedule: () =>
        NavigationService.navigate(DOCTOR_DATA_DETAILS, {
          data: item,
          from: "",
          fee_type: item?.fee_type,
          phoneNo: item?.Users?.phone,
        }),
    };

    switch (feature) {
      case 2:
        return <CompleteAndRejectFeature
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        appointmentType={item?.appointment_type == "400" ? "Clinic Visit" : "Virtual"}
         />;
      case 11:
        return (
          <UpComingFeature {...props} acceptSheetRef={appointmentTypeSheet} />
        );
      case 14:
        return <PendingFeature {...props} />;
      case 16:
        return <OnGoingFeature {...props} />;
      default:
        return null;
    }
  };

  const imageSelect = (n:number | undefined) => {
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

  const locationDate = (n:number | undefined) => {
    if (n === 1) {
      return (
        <AppText weight={MEDIUM} type={FOURTEEN}>
          {date}
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

    const temAdress =
      item?.AppointmentTimeSlot?.timeSlotLocation?.doctorAddress.pincode != null
        ? item?.AppointmentTimeSlot?.timeSlotLocation?.doctorAddress
        : item?.doctorAddress;

    const appointmentAddress = `${temAdress?.name},${temAdress?.address},${temAdress?.city},${temAdress?.state},${temAdress?.pincode}`;
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <AppText
          weight={MEDIUM}
          type={FOURTEEN}
          style={{ flex: 1 }}
          numberOfLines={showFullAddress ? 0 : 2}
        >
          {appointmentAddress ? appointmentAddress : "- - -"}
        </AppText>
        {appointmentAddress.length >= 40 && (
          <AppText
            weight={BOLD}
            style={{
              textAlign: "left",
              alignSelf: "flex-end",
              color: colors.buttonBg,
              flex: 0.3,
            }}
            onPress={() => setShowFullAddress(!showFullAddress)}
          >
            {showFullAddress ? "less" : "more"}
          </AppText>
        )}
      </View>
    );
  };

  const rnoCheck = () => {
    if (
      item?.doctor_details?.rn_number ? item?.doctor_details?.rn_number : rno
    ) {
      return (
        <View
          style={[
            styles.rnoStyle,
            {
              width: item?.doctor_details?.rn_number.length
                ? item?.doctor_details?.rn_number.length * 11
                : department * 11,
            },
          ]}
        >
          <AppText color={WHITE}>
            {item?.doctor_details?.rn_number
              ? item?.doctor_details?.rn_number
              : rno}
          </AppText>
        </View>
      );
    }
  };

  const downloadIcon = () => {
    if (download) {
      return (
        <Image
          source={bellIcon}
          resizeMode="contain"
          style={styles.downloadIcon}
        />
      );
    }
  };

  const starPattern = () => {
    // const handleRating = () => {
    //   let data = {
    //     reviewer_id: item?.Users?.id,
    //     ratings: rating,
    //     remarks: "ratings",
    //   };
    //   // setRating(value)
    //   dispatch(addRatings(data, setIsRatingModal));
    // };

    return (
      <View style={styles.ratingContainer}>
        <StarRating
          selectedStars={
            item?.Users?.ratings?.average_rating !== undefined
              ? item?.Users?.ratings?.average_rating
              : item?.ratings?.average_rating
              ? item?.ratings?.average_rating
              : 0
          }
          startingValue={
            item?.Users?.ratings?.average_rating !== undefined
              ? item?.Users?.ratings?.average_rating
              : item?.ratings?.average_rating
              ? item?.ratings?.average_rating
              : 0
          }
        />
        {featureType == "completed" && (
          <TouchableOpacityView
            onPress={() => setIsRatingModal(true)}
            style={styles.ratingBtnStyle}
          >
            <AppText weight={BOLD} type={TWELVE}>
              {"Rating"}
            </AppText>
          </TouchableOpacityView>
        )}
        <RatingScreen
          isModalVisible={isRatingModal}
          setModalVisible={setIsRatingModal}
          defaultRating={rating}
          setDefaultRating={setRating}
          handleRating={() => handleRating()}
        />
      </View>
    );
  };

  const statusCheck = () => {
    if (item?.appointment_status) {
      return (
        <View style={[styles.status]}>
          <AppText color={WHITE}>{getStatus(item?.appointment_status)}</AppText>
        </View>
      );
    }
  };

  const doctorStatusCheck = () => {
    if (doctorStatus) {
      return (
        <View
          style={{
            backgroundColor:
              doctorStatus === "Scheduled" ? colors.loader : colors.pink,
            borderRadius: 50,
            paddingHorizontal: 10,
          }}
        >
          <AppText
            style={{
              flex: 3,
              textAlignVertical: "center",
            }}
            color={WHITE}
            type={TWELVE}
          >
            {doctorStatus}
          </AppText>
        </View>
      );
    }
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
    <View style={[styles.doctorBoxContainer]}>
      <TouchableOpacityView
        onPress={onNavigation}
        style={[styles.homeToolContainer5, { backgorundColor: "red" }]}
        disabled={onNavigation ? false : true}
      >
        {item?.Users?.avatar != null && item?.Users?.avatar ? (
          <Image
            source={{
              uri: IMAGE_PATH1 + item?.Users?.avatar,
            }}
            resizeMode="cover"
            style={styles.doctorImage}
          />
        ) : (
          <Image
            source={DummyMr}
            resizeMode="contain"
            style={[styles.doctorImage, { borderRadius: 0 }]}
          />
        )}
        <View style={styles.homeToolContainer3}>
          <View style={styles.drdownloadContainer}>
            <AppText
              style={{ width: "80%" }}
              type={TWENTY}
              weight={MEDIUM}
              numberOfLines={1}
            >
              {item?.name
                ? item?.name
                : item?.Users?.name
                ? item?.Users?.name
                : "- - -"}
            </AppText>
            {doctorStatusCheck()}
            {downloadIcon()}
          </View>
          <AppText type={FOURTEEN} weight={MEDIUM}>
            {item?.Users?.phone}
          </AppText>
          <View
            style={{ flexDirection: "row", flex: 1, gap: 10, flexWrap: "wrap" }}
          >
            {starPattern()}
            {featureNo !== 2 && item?.appointment_status && statusCheck()}
          </View>

          <View style={styles.statusContainer}>
            <View
              style={{
                backgroundColor: colors.buttonBg,
                borderRadius: 20,
                paddingHorizontal: universalPaddingVertical,
                paddingVertical: 5,
                marginTop: 10,
              }}
            >
              <AppText color={WHITE}>
                {item?.spec_detail?.speciality?.specialization
                  ? item?.spec_detail?.speciality?.specialization
                  : item?.Users?.Company?.company_name
                  ? item?.Users?.Company?.company_name
                  : item?.speciality
                  ? item?.speciality
                  : department}
              </AppText>
            </View>
            {rejectReason()}
            {rnoCheck()}
          </View>
          <View style={[styles.homeToolContainer4, { paddingHorizontal: 0 }]}>
            <>
              {imageSelect(num)}
              {locationDate(location)}
            </>
          </View>
        </View>
      </TouchableOpacityView>
      {/* {featureValidation()} */}
      {renderFeatureComponent()}
    </View>
  );
};

export { DoctorBox };
