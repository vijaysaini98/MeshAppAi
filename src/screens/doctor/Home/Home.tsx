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



const HomeToolBar:FC<HomeToolBarProps> = ({ avatar, name, handleBellPress }) => {
  return (
    <View style={styles.homeToolContainer}>
      {/* <View style={[styles.homeToolContainer2, { gap: 5 }]}> */}
      <Image
        source={avatar ? { uri: `${IMAGE_PATH1}${avatar}` } : DummyDoctor}
        resizeMode="cover"
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
      {/* </View> */}
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
    }
  }, [focus]);

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
            totalEarning={doctorTotalIncome ? doctorTotalIncome : 0}
            totalUpcoming={upcomingAppointmentList?.length}
            handleEarning={() =>
              NavigationService.navigate(DOCTOR_PAYMENT_SCREEN)
            }
            handleUpcoming={() => onPressUpcomming()}
          />
          <RecentRequests />
        </ScrollView>
      )}
    </AppSafeAreaView>
  );
};

export default DoctorHome;
