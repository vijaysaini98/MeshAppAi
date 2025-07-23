import { View, Alert, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { AppSafeAreaView, AppText, Toolbar } from "../../../common";
import {
  accountDelete,
  clinicIcon,
  clockIcon1,
  DummyDoctor,
  helpIcon,
  insuranceIcon,
  leftArrow,
  logout,
  profileEdit,
  referIcon,
  settings,
} from "../../../helper/ImageAssets";
import { MEDIUM, TWENTY_SIX, FOURTEEN } from "../../../common/AppText";
import MoreTab from "../../common/MoreTab";
import styles from "./styles";
import NavigationService from "../../../navigation/NavigationService";
import * as routes from "../../../navigation/routes";
import KeyBoardAware from "../../../common/KeyboardAware";
import { IMAGE_PATH1 } from "../../../helper/Constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteAccount, logOut } from "../../../slices/authSlice/authAction";
import { AnimationSpinner } from "../../../animation";
import { useIsFocused } from "@react-navigation/native";
import { SectionListChangeDrTabScreen } from "../../../slices/drSlice/drSlice";
import DeleteConfirmationModal from "../../common/deleteConfirmationModal";
import { setProfileTimeSlot } from "../../../slices/mrSlice/mrSlice";
import { colors } from "../../../theme/colors";
import { shareToAny } from "../../../helper/utility";
import {
  getLegalQuestions,
  getSpeciality,
} from "../../../slices/drSlice/drAction";
import FastImage from "react-native-fast-image";

const DoctorMoreScreen = () => {
  const dispatch = useAppDispatch();
  let focus = useIsFocused();

  const { drEditProfile, isLoading } = useAppSelector((state) => {
    return state.doctor;
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (focus) {
      dispatch(SectionListChangeDrTabScreen(0));
    }
  }, [focus]);

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
    dispatch(setProfileTimeSlot([]));
    dispatch(logOut());
  };

  const onDelete = () => {
    dispatch(deleteAccount());
    setShowModal(false);
  };

  const handleReferralCodeShare = () => {
    let Download_here =
      "https://play.google.com/store/apps/details?id=com.meshappAi";
    let message = `"Hey! 🌟 I just discovered this incredible app called MeshApp! 🩺 It's perfect for seamless doctor appointments and easy collaboration. Download it now and experience hassle-free connections. Use my referral code ${drEditProfile?.referral_code} to get started with exclusive benefits! 👉 ${Download_here}"`;

    shareToAny(message);
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView style={styles.mainContainer}>
        <Toolbar title="More" noBack />
        {/* <KeyBoardAware> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.subContainer}>
            <Image
              source={
                drEditProfile?.avatar
                  ? { uri: `${IMAGE_PATH1}${drEditProfile?.avatar}` }
                  : DummyDoctor
              }
              resizeMode="cover"
              style={styles.profileImage}
            />
            {/* <FastImage
                source={
                  drEditProfile?.avatar
                    ? { uri: `${IMAGE_PATH1}${drEditProfile?.avatar}` }
                    : DummyDoctor
                }
                // resizeMode="cover"
                resizeMode={FastImage.resizeMode.cover}
                style={styles.profileImage}
              /> */}
            <View style={styles.nameView}>
              <AppText
                style={styles.mikeStyle}
                type={TWENTY_SIX}
                weight={MEDIUM}
              >
                {drEditProfile?.name}
              </AppText>

              <AppText style={styles.emailStyle} type={FOURTEEN}>
                {drEditProfile?.email}
              </AppText>
            </View>
          </View>
          <MoreTab
            tabStyle={styles.paymentStyle}
            source={profileEdit}
            title="Edit Profile"
            source2={leftArrow}
            onPress={() => {
              dispatch(getSpeciality());
              NavigationService.navigate(routes.EDIT_PROFILE);
            }}
          />
          <MoreTab
            tabStyle={styles.settingStyle}
            source={clinicIcon}
            title="Clinic"
            source2={leftArrow}
            onPress={() => NavigationService.navigate(routes.CLINIC)}
          />
          <MoreTab
            tabStyle={styles.settingStyle}
            source={settings}
            title="Settings"
            source2={leftArrow}
            onPress={() =>
              NavigationService.navigate(routes.DOCTOR_SETTINGS_SCREEN)
            }
          />
          <MoreTab
            tabStyle={styles.settingStyle}
            source={clockIcon1}
            title="My Availability"
            source2={leftArrow}
            onPress={() =>
              NavigationService.navigate(routes.DOCTOR_AVAILABILITY_SCREEN)
            }
          />
          <MoreTab
            tabStyle={styles.settingStyle}
            source={insuranceIcon}
            title="Insurance"
            source2={leftArrow}
            onPress={() => NavigationService.navigate(routes.INSURANCE_SCREEN)}
          />
          <MoreTab
            tabStyle={styles.settingStyle}
            source={helpIcon}
            title="Legal Help"
            source2={leftArrow}
            onPress={() => {
              dispatch(getLegalQuestions());
              NavigationService.navigate(routes.LEAGAL_HELP);
            }}
          // label={"Coming Soon"}
          />
          <MoreTab
            tabStyle={styles.settingStyle}
            source={logout}
            title="Logout"
            onPress={() => createAlert()}
          />
          <MoreTab
            tabStyle={styles.settingStyle}
            source={accountDelete}
            title="Delete Account"
            onPress={() => setShowModal(true)}
          />
          <MoreTab
            tabStyle={styles.settingStyle1}
            source={referIcon}
            tintColor={colors.buttonBg}
            title="Share Refer Code"
            onPress={() => handleReferralCodeShare()}
          />
          {/* </KeyBoardAware> */}
        </ScrollView>
      </AppSafeAreaView>
      <DeleteConfirmationModal
        visible={showModal}
        onDelete={() => onDelete()}
        confirmationText={"Are you sure?\nyou want to delete your account?"}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default DoctorMoreScreen;
