import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  ADD_LOCATION,
  DOCTOR_PAYMENT_SCREEN,
  DR_APPOINTMENT_SCREEN,
  EDIT_PROFILE,
  NOTIFICATION_SCREEN,
} from "../../../navigation/routes";
import NavigationService from "../../../navigation/NavigationService";
import {
  AppSafeAreaView,
  AppText,
  BUTTON_BG,
  EIGHTEEN,
  FOURTEEN,
  MEDIUM,
} from "../../../common";
import {
  bellIcon,
  DummyDoctor,
} from "../../../helper/ImageAssets";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { styles } from "../../../styles/styles";
import { IMAGE_PATH1 } from "../../../helper/Constants";
import { colors } from "../../../theme/colors";
import {
  DrEditProfile,
  doctorAppointmentList,
  getDoctorLocation,
  getSpeciality,
} from "../../../slices/drSlice/drAction";
import {
  SectionListChangeDrTabScreen,
  setRecentAppointmentList,
} from "../../../slices/drSlice/drSlice";
import { AnimationSpinner } from "../../../animation";
import {
  getMrLocation,
} from "../../../helper/utility";
import { updateFcmToken } from "../../../slices/authSlice/authAction";
import RecentRequests from "./components/recentRequest";
import { UpcomingAndEaringCard } from "./components/upComingCard";
import { HomeToolBarProps } from "../../../helper/types";
import { AcceptTypeSheet, RejectionSheet } from "../../common";

const HomeToolBar: FC<HomeToolBarProps> = ({ avatar, name, handleBellPress }) => {
  return (
    <View style={styles.homeToolContainer}>
      <Image
        source={avatar ? { uri: `${IMAGE_PATH1}${avatar}` } : DummyDoctor}
        resizeMode="cover"
        // resizeMode={FastImage.resizeMode.cover}
        style={styles.profileImage}
      />
      <View style={styles.homeToolContainer3}>
        <AppText color={BUTTON_BG} weight={MEDIUM} type={FOURTEEN}>
          Hello!
        </AppText>
        <AppText type={EIGHTEEN} weight={MEDIUM}>
          {name}
        </AppText>
      </View>
      <TouchableOpacityView onPress={handleBellPress}>
        <Image source={bellIcon} resizeMode="contain" style={styles.bellIcon} />
      </TouchableOpacityView>
    </View>
  );
};

const DoctorHome = () => {
  const dispatch = useAppDispatch();
  let focus = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);
  const [show, setShow] = useState(false);

  const {
    isLoading,
    drEditProfile,
    isLocation,
    upcomingAppointmentList,
    doctorTotalIncome,
    doctorSpeciality
  } = useAppSelector((state) => {
    return state.doctor;
  });

  const getDoctorCurrentLocation = useCallback(async () => {
    let currentLocation = await getMrLocation();
    dispatch(updateFcmToken(currentLocation));
  }, [dispatch]);

  useEffect(() => {
    if (focus) {
      dispatch(setRecentAppointmentList([]));
      dispatch(doctorAppointmentList(0, 1));
      dispatch(DrEditProfile());
      dispatch(SectionListChangeDrTabScreen(0));
      getDoctorCurrentLocation();
      dispatch(getSpeciality());
    }
  }, [focus]);

  const [reqdata, setReqData] = useState([])
  useEffect(() => {
    if (doctorSpeciality?.length) {
      const data = doctorSpeciality?.map((item) => {
        return {
          value: item?.id,
          label: item?.specialization,
        };
      });

      setReqData(data);
    }
  }, [doctorSpeciality]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShow(true), 700);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    const userId = drEditProfile?.spec_detail?.[0]?.user_id;
    if (userId) {
      dispatch(getDoctorLocation(userId));
    }
  }, [drEditProfile?.spec_detail?.[0]?.user_id]);

  useEffect(() => {
    if (!isLocation) {
      const alertTimeout = setTimeout(() => {
        Alert.alert(
          "Add Location",
          "Please add at least one location from More => Settings => My Location.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Add",
              onPress: () => NavigationService.navigate(ADD_LOCATION),
            },
          ],
          { cancelable: true }
        );
      }, 2000);

      return () => clearTimeout(alertTimeout);
    }
  }, [isLocation]);

  useEffect(() => {
    if (drEditProfile?.spec_detail?.length < 1) {
      const alertTimeout = setTimeout(() => {
        Alert.alert(
          "Add Specaility",
          "Please add at least one Specialty from More => Settings => Edit Profile => Specialty Detail",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Add",
              onPress: () => NavigationService.navigate(EDIT_PROFILE, { tabIndex: 1, from: 'home' }),
            },
          ],
          { cancelable: true }
        );
      }, 2000);

      return () => clearTimeout(alertTimeout);
    }
  }, [drEditProfile]);


  const onRefresh = () => {
    dispatch(doctorAppointmentList(0, 1));
  };

  const onPressUpcomming = () => {
    NavigationService.navigate(DR_APPOINTMENT_SCREEN);
    dispatch(SectionListChangeDrTabScreen(2));
  };

  const onPressBell = () => {
    NavigationService.navigate(NOTIFICATION_SCREEN);
  };

  return (
    <AppSafeAreaView style={{ backgroundColor: colors.white }}>
      <HomeToolBar
        name={drEditProfile?.name}
        avatar={drEditProfile?.avatar}
        handleBellPress={() => onPressBell()}
      />
      {!show ? (
        <AnimationSpinner />
      ) : (
        <ScrollView
          style={{ backgroundColor: colors.white }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <UpcomingAndEaringCard
            // totalEarning={doctorTotalIncome ? doctorTotalIncome : 0}
            totalUpcoming={upcomingAppointmentList?.length}
            // handleEarning={() =>
            //   NavigationService.navigate(DOCTOR_PAYMENT_SCREEN)
            // }
            handleUpcoming={() => onPressUpcomming()}
          />
          <RecentRequests 
          
          />
          
        </ScrollView>
      )}
       {/* <AcceptTypeSheet
          refSheet={appointmentTypeSheet}
          id={item?.id}
          date={item?.date}
          timeSlotsAvailable={item?.time_slots_available}
          time={item?.time}
          locationId={
            item?.location_id
              ? item?.location_id
              : item?.AppointmentTimeSlot?.doctor_location_id
          }
          fees={drEditProfile?.doctor_details?.fees}
          appointmentFeeType={item?.fee_type == "200" ? "Free" : "Paid"}
        />
        <RejectionSheet
          refSheet={rejectionSheet}
          id={item?.id}
          date={item?.date}
        /> */}
    </AppSafeAreaView>
  );
};

export default DoctorHome;


