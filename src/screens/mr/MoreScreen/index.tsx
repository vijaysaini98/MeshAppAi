import { View, Alert, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AppSafeAreaView, AppText, Toolbar } from "../../../common";
import styles from "./style";
;
import {
  DummyMr,
  DummyUser,
  leftArrow,
  logout,
  payment,
  profileEdit,
  referIcon,
  settings,
} from "../../../helper/ImageAssets";
import { MEDIUM, TWELVE, TWENTY_SIX, FOURTEEN } from "../../../common/AppText";
import MoreTab from "../../common/MoreTab";
import NavigationService from "../../../navigation/NavigationService";
import {
  PAYMENT_HISTORY,
  PRODUCTS,
  SETTINGS_SCREEN,
} from "../../../navigation/routes";
import { IMAGE_PATH1 } from "../../../helper/Constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  MrProfileData,
  updateMrProfile,
} from "../../../slices/mrSlice/mrAction";
import { logOut } from "../../../slices/authSlice/authAction";
import { AnimationSpinner } from "../../../animation";
import { useIsFocused } from "@react-navigation/native";
import { SectionListhangeMrTabScreen } from "../../../slices/mrSlice/mrSlice";
import { colors } from "../../../theme/colors";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import CameraModal from "../../common/cameraModal";
import { shareToAny } from "../../../helper/utility";

const MoreScreen = () => {
  const dispatch = useAppDispatch();
  let focus = useIsFocused();

  const { mrProfiledata, isLoading } = useAppSelector((state) => {
    return state.mr;
  });

  const { isBtnLoading } = useAppSelector((state) => {
    return state.auth;
  });

  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);

  useEffect(() => {
    if (focus) {
      dispatch(SectionListhangeMrTabScreen(0));
    }
  }, [focus]);

  useEffect(() => {
    dispatch(MrProfileData());
  }, []);

  const createAlert = () =>
    Alert.alert("Are you sure you want to Logout", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => onPressLogOut() },
    ]);

  const onPressLogOut = () => {
    dispatch(logOut());
  };

  const toggleModal = (more?: any) => {
    setIsCameraModalVisible(true);
  };

  const updateProfileImage = (data) => {
    let apiData: any = {
      avatar: data,
    };
    dispatch(updateMrProfile(apiData));
  };

  const handleReferralCodeShare = () => {
    let Download_here =
      "https://play.google.com/store/apps/details?id=com.meshappAi";
    let message = `Hey! 🌟 I just discovered this incredible app called MeshApp! 🩺 It's perfect for seamless doctor appointments and easy collaboration. Download it now and experience hassle-free connections. Use my referral code ${mrProfiledata?.referral_code} to get started with exclusive benefits! 👉 ${Download_here}`;
    shareToAny(message);
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView style={styles.mainContainer}>
        <Toolbar title="More" />
        <View style={styles.subContainer}>
          <View style={styles.profileImageContainer}>
            {isBtnLoading ? (
              <ActivityIndicator size={"small"} color={colors.buttonBg} />
            ) : (
              <Image
                source={
                  mrProfiledata?.avatar
                    ? { uri: IMAGE_PATH1 + mrProfiledata?.avatar }
                    : DummyMr
                }
                resizeMode="cover"
                style={styles.profileImage}
              />
            )}
            <TouchableOpacityView
              onPress={() => toggleModal()}
              style={styles.editIconStyle}
            >
              <Image
                source={profileEdit}
                style={styles.profileEditIcon}
                resizeMode="cover"
              />
            </TouchableOpacityView>
          </View>
          <View style={{ flex: 1 }}>
            <AppText type={TWENTY_SIX} weight={MEDIUM} numberOfLines={2}>
              {mrProfiledata?.name}
            </AppText>
            <View style={styles.departmentStyle}>
              <AppText type={TWELVE} style={styles.departmentText}>
                {mrProfiledata?.Company?.company_name}
              </AppText>
            </View>
            <AppText type={FOURTEEN}>{mrProfiledata?.email}</AppText>
            {mrProfiledata?.division_details && (
              <View style={styles.divisionContainer}>
                <AppText style={styles.divisiontextStyle} type={TWELVE}>
                  Division's:
                </AppText>
                <View style={styles.divisionStyle}>
                  <AppText type={TWELVE} style={styles.divisionText}>
                    {mrProfiledata?.division_details?.name}
                  </AppText>
                </View>
              </View>
            )}
          </View>
        </View>
        {/* <MoreTab
          tabStyle={styles.paymentStyle}
          source={payment}
          title="Payment History"
          source2={leftArrow}
          onPress={() => NavigationService.navigate(PAYMENT_HISTORY)}
        /> */}
        <MoreTab
          tabStyle={styles.settingStyle}
          source={settings}
          title="Settings"
          source2={leftArrow}
          onPress={() => NavigationService.navigate(SETTINGS_SCREEN)}
        />
        <MoreTab
          tabStyle={styles.settingStyle}
          source={settings}
          title="Products"
          source2={leftArrow}
          onPress={() => NavigationService.navigate(PRODUCTS)}
        />
        <MoreTab
          tabStyle={styles.settingStyle}
          source={logout}
          title="Logout"
          onPress={() => createAlert()}
        />
        <MoreTab
          tabStyle={styles.settingStyle}
          source={referIcon}
          tintColor={colors.buttonBg}
          title="Share Refer Code"
          onPress={() => handleReferralCodeShare()}
        />
      </AppSafeAreaView>
      <CameraModal
        KycCamraisModalVisible={isCameraModalVisible}
        setKycCamraisModalVisible={(thing) => {
          setIsCameraModalVisible(thing);
        }}
        from={"mrProfile"}
        handleUpdateProfile={(data) => updateProfileImage(data)}
      />
    </>
  );
};

export default MoreScreen;
