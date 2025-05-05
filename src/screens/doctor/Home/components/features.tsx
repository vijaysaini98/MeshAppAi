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

interface CompleteAndRejectFeatureProps {
  formattedDate: string;
  formattedTime: string;
  appointmentType: string;
}
interface UpComingFeatureProps {
  item: any;
  formattedDate: string;
  formattedTime: string;
  rejectionSheet: any;
  reschedule: () => void | undefined;
  acceptSheetRef: any;
}

interface OnGoingFeature {
  item: any;
  isProductModalVisible: boolean;
  formattedDate: string;
  formattedTime: string;
  handleEndMeeting: () => void;
}
interface PendingFeature {
  item: any;
  formattedDate: string;
  formattedTime: string;
  disableStartButton: boolean;
  hanldeStartMeeting: () => void;
  rejectionSheet: any;
  reschedule: () => void;
}

export const CompleteAndRejectFeature: FC<CompleteAndRejectFeatureProps> = ({
  formattedDate,
  formattedTime,
  appointmentType,
}) => {
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
        <AppText weight={BOLD}>{appointmentType}</AppText>
      </View>
    </View>
  );
};

export const UpComingFeature: FC<UpComingFeatureProps> = ({
  item,
  formattedDate,
  formattedTime,
  rejectionSheet,
  reschedule,
  acceptSheetRef,
}) => {
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
          children="Reject"
          containerStyle={styles.button3}
          onPress={() => rejectionSheet.current.open()}
        />
        <Button
          children="Reschedule"
          onPress={reschedule}
          containerStyle={[
            styles.button6,
            { backgroundColor: colors.buttonBg },
          ]}
        />
      </View>
      {/* {item.appointment_type == 500 && (
            <Button
              children="Join Meeting Link"
              containerStyle={[
                styles.rescheduleButton,
                { backgroundColor: colors.buttonBg },
              ]}
              onPress={() => handleJoinMeetingLink(item?.appointment_link)}
            />
          )} */}
      <AcceptTypeSheet refSheet={acceptSheetRef} id={item?.id} />
      <RejectionSheet
        refSheet={rejectionSheet}
        id={item?.id}
        date={item?.date}
      />
    </View>
  );
};

export const OnGoingFeature: FC<OnGoingFeature> = ({
  item,
  isProductModalVisible,
  formattedDate,
  formattedTime,
  handleEndMeeting,
}) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setProductModal(false));
  };
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
          children="End Meeting"
          containerStyle={[
            styles.button3,
            { backgroundColor: colors.buttonBg },
          ]}
          onPress={handleEndMeeting}
        />
      </View>
      {item?.appointment_type == "400" && (
        <ProductModal
          isModalVisible={isProductModalVisible}
          onClose={() => handleClose()}
          // data={productData}
        />
      )}
    </View>
  );
};

export const PendingFeature: FC<PendingFeature> = ({
  item,
  formattedDate,
  formattedTime,
  disableStartButton,
  hanldeStartMeeting,
  rejectionSheet,
  reschedule,
}) => {
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
      {(item?.fee_type == "300" || item?.payment_status == "700") &&
      item?.appointment_status != "1700" &&
      item?.appointment_status != "800" ? (
        <>
          {disableStartButton && item?.appointment_type != "400" && (
            <AppText
              type={THIRTEEN}
              weight={MEDIUM}
              style={{
                color: colors.red,
                marginHorizontal: 10,
                marginTop: 10,
              }}
            >
              {
                "Note: The scheduled Virtual Meeting time has passed. Please reschedule your appointment."
              }
            </AppText>
          )}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button
              children="Start Meeting"
              containerStyle={[
                styles.button3,
                { backgroundColor: colors.buttonBg },
              ]}
              onPress={hanldeStartMeeting}
              disabled={disableStartButton && item?.appointment_type != "400"}
            />
            <Button
              children="Reject Meeting"
              containerStyle={styles.button3}
              onPress={() => rejectionSheet.current.open()}
            />
          </View>
        </>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            children="Reject"
            containerStyle={styles.button3}
            onPress={() => rejectionSheet.current.open()}
          />
        </View>
      )}

      <View style={{ backgroundColor: colors.white }}>
        <Button
          children="Reschedule Appointment"
          containerStyle={styles.rescheduleButton}
          onPress={reschedule}
        />
      </View>
      <RejectionSheet
        refSheet={rejectionSheet}
        id={item?.id}
        date={item?.date}
      />
      {/* <ProductModal
          data={item?.product_details}
          isModalVisible={isProductModalVisible}
          onClose={()=> handleClose()}
          /> */}
    </View>
  );
};
