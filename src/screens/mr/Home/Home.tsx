import React, { FC, useEffect, useRef, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  BUTTON_BG,
  EIGHTEEN,
  FOURTEEN,
  Input,
  MEDIUM,
  THIRTY_EIGHT,
  WHITE,
} from "../../../common";
import {
  Image,
  ImageBackground,
  NativeModules,
  Platform,
  View,
} from "react-native";
import {
  bellIcon,
  DummyMr,
  searchIcon,
  upcoming,
} from "../../../helper/ImageAssets";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { styles } from "../../../styles/styles";
import NavigationService from "../../../navigation/NavigationService";
import {
  NOTIFICATION_SCREEN,
  UPCOMING_APPOINTMENT_SCREEN,
} from "../../../navigation/routes";
import { IMAGE_PATH1, placeHolderText } from "../../../helper/Constants";
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
import {
  MrHomeAppointmentContainerProps,
  MrHomeSearchBarProps,
  MrHomeToolBarProps,
} from "../../../helper/types";
import { NearByList } from "./components/nearByList";

const HomeToolBar: FC<MrHomeToolBarProps> = ({
  data,
  profileImage,
  name,
  address,
  handleNotificationIcon,
}) => {
  return (
    <View style={styles.homeToolContainer}>
      <Image
        source={profileImage}
        resizeMode="cover"
        style={styles.profileImage}
      />
      <View style={styles.homeToolContainer3}>
        <AppText color={BUTTON_BG} weight={MEDIUM} type={FOURTEEN}>
          {name}
        </AppText>
        <AppText weight={MEDIUM} type={FOURTEEN} style={{ marginTop: 10 }}>
          {address}
        </AppText>
      </View>
      <TouchableOpacityView onPress={handleNotificationIcon}>
        <Image source={bellIcon} resizeMode="contain" style={styles.bellIcon} />
      </TouchableOpacityView>
    </View>
  );
};

const HomeSearchBar: React.FC<MrHomeSearchBarProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.searchContainer}>
      <Input
        placeholder={placeHolderText.search}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        returnKeyType="done"
        mainContainer={styles.searchInput}
        icon2={searchIcon}
      />
    </View>
  );
};

const HomeAppointmentContainer: FC<MrHomeAppointmentContainerProps> = ({
  data,
}) => {
  return (
    <View style={styles.upcomigToolContainer}>
      {data.map((e, index) => {
        return (
          <TouchableOpacityView
            onPress={e.onPress}
            style={[styles.appointmentSingle]}
            key={e.id}
          >
            <ImageBackground
              source={upcoming}
              style={styles.upcomingImage}
              resizeMode="stretch"
              key={e?.id}
            >
              <AppText type={THIRTY_EIGHT} weight={BOLD} color={WHITE}>
                {e.value}
              </AppText>
              <AppText type={EIGHTEEN} color={WHITE}>
                {e.title}
              </AppText>
            </ImageBackground>
          </TouchableOpacityView>
        );
      })}
    </View>
  );
};

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
