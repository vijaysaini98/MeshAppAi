import React, { useEffect, useRef, useState } from "react";
import {
  AppSafeAreaView,
} from "../../../common";
import {
  NativeModules,
  Platform,
} from "react-native";
import {
  DummyMr,
} from "../../../helper/ImageAssets";
import NavigationService from "../../../navigation/NavigationService";
import {
  NOTIFICATION_SCREEN,
  UPCOMING_APPOINTMENT_SCREEN,
} from "../../../navigation/routes";
import { IMAGE_PATH1 } from "../../../helper/Constants";
import { colors } from "../../../theme/colors";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useIsFocused } from "@react-navigation/native";
import {
  MrProfileData,
  ViewMeetingReport,
  mrNearByDoctor,
} from "../../../slices/mrSlice/mrAction";
import { AnimationSpinner } from "../../../animation";
import { SectionListhangeMrTabScreen } from "../../../slices/mrSlice/mrSlice";
import { getClientId, getKey } from "../../../helper/utility";
import { updateFcmToken } from "../../../slices/authSlice/authAction";
import DisplayPermission from "../VideoCallPermission";
import { NearByList } from "./components/nearByList";
import {
  HomeAppointmentContainer,
  HomeSearchBar,
  HomeToolBar,
} from "./components/homeComponent";

const { OverlayPermissionModule, UnlockDevice } = NativeModules;

const Home = () => {
  const { nearByDoctor, isLoading, mrProfiledata, nearByProfile } =
    useAppSelector((state) => {
      return state.mr;
    });

  const dispatch = useAppDispatch();
  let focus = useIsFocused();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [isOverlay, setIsOverlay] = useState(false);
  const timeout: any = useRef(null);

  useEffect(() => {
    if (focus) {
      dispatch(mrNearByDoctor(3));
      dispatch(SectionListhangeMrTabScreen(0));
      dispatch(MrProfileData());
      dispatch(updateFcmToken());
    }
  }, [focus]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShow(true);
      }, 700);
    }
  }, [isLoading]);

  useEffect(() => {
    getKey();
    getClientId();
    // dispatch(getRazorpayKey());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(mrNearByDoctor(3));
    dispatch(ViewMeetingReport(1));
    setTimeout(() => {
      setRefreshing(false);
      setValue("");
    }, 1000);
  };

  const onChangeHandler = (value?: string) => {
    setValue(value);
    clearTimeout(timeout.current);
    if (value?.trim()) {
      timeout.current = setTimeout(() => {
        dispatch(mrNearByDoctor(3, value));
      }, 500);
    } else {
      dispatch(mrNearByDoctor(3));
    }
  };

  const onPressBell = () => {
    NavigationService.navigate(NOTIFICATION_SCREEN);
  };

  const data = [
    {
      id: "2",
      title: `Upcoming\nAppointments`,
      value: nearByProfile?.Upcomingcount,
      onPress: () => NavigationService.navigate(UPCOMING_APPOINTMENT_SCREEN),
    },
  ];

  const overlayPermission = () => {
    if (Platform.OS === "android") {
      OverlayPermissionModule?.isRequestOverlayPermissionGranted(
        (status: any) => {
          if (status) {
            setIsOverlay(true);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      overlayPermission();
    }
  }, []);

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView style={{ backgroundColor: colors.mainBg }}>
        <HomeToolBar
          profileImage={
            mrProfiledata?.avatar
              ? { uri: IMAGE_PATH1 + mrProfiledata?.avatar }
              : DummyMr
          }
          name={mrProfiledata?.name ? `Hello! ${mrProfiledata.name}` : ""}
          address={
            mrProfiledata?.user_details?.address
              ? mrProfiledata?.user_details?.address
              : ""
          }
          handleNotificationIcon={() => onPressBell()}
        />
        {!show ? (
          <AnimationSpinner />
        ) : (
          <>
            <HomeSearchBar
              value={value}
              onChangeText={(text) => onChangeHandler(text)}
            />
            <HomeAppointmentContainer data={data} />
            <NearByList
              data={
                nearByDoctor[0]?.near_by_doctor
                  ? nearByDoctor[0]?.near_by_doctor
                  : nearByDoctor
              }
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </>
        )}
        <DisplayPermission isVisible={isOverlay} setIsVisible={setIsOverlay} />
      </AppSafeAreaView>
    </>
  );
};

export default Home;
