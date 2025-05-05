import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  FIFTEEN,
  Input,
  LIGHT,
  Toolbar,
} from "../../../common";
import KeyBoardAware from "../../../common/KeyboardAware";
import {
  SettingsImage,
  leftArrow,
  location_Icon,
} from "../../../helper/ImageAssets";
import { universalPaddingHorizontal } from "../../../theme/dimens";
import { colors } from "../../../theme/colors";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  DoctorAvailabilityStatus,
  DrEditProfile,
} from "../../../slices/drSlice/drAction";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import NavigationService from "../../../navigation/NavigationService";
import {
  DOCTOR_CHANGE_PASSWORD_SCREEN,
  MY_LOCATION,
} from "../../../navigation/routes";
import { Switch } from "react-native-switch";
import MoreTab from "../../common/MoreTab";

const DoctorSettings = () => {
  const dispatch = useAppDispatch();

  const { drAvailabilityStatus, drEditProfile } = useAppSelector((state) => {
    return state.doctor;
  });

  const [isEnabled, setIsEnabled] = useState(
    drAvailabilityStatus === 1 ? true : false
  );

  useEffect(() => {
    dispatch(DrEditProfile());
  }, []);

  const toggleSwitch = () => {
    let data = {
      id: drEditProfile?.spec_detail[0].user_id,
    };
    dispatch(DoctorAvailabilityStatus(data));
    setIsEnabled(!isEnabled);
  };

  const changePassword = () => {
    NavigationService.navigate(DOCTOR_CHANGE_PASSWORD_SCREEN);
  };

  return (
    <AppSafeAreaView>
      <Toolbar title="Settings" />
      <KeyBoardAware>
        <Image
          resizeMode="contain"
          source={SettingsImage}
          style={styles.settingsImage}
        />
        <View style={styles.availabilityView}>
          <AppText type={FIFTEEN} style={styles.availableStyle} weight={LIGHT}>
            My Availability
          </AppText>
          <View
            style={{ alignSelf: "center", borderRadius: 25, marginRight: 20 }}
          >
            <Switch
              value={isEnabled}
              onValueChange={toggleSwitch}
              disabled={false}
              activeText={"On"}
              inActiveText={"Off"}
              circleSize={30}
              barHeight={27}
              circleBorderWidth={0}
              backgroundActive={colors.toggleColor}
              backgroundInactive={colors.white}
              circleActiveColor={colors.loader}
              circleInActiveColor={colors.toggleCircle}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              outerCircleStyle={{}}
              renderActiveText={true}
              renderInActiveText={true}
              switchLeftPx={2}
              switchRightPx={2}
              switchWidthMultiplier={2}
              switchBorderRadius={30}
              activeTextStyle={{ color: colors.loader }}
              inactiveTextStyle={{ color: colors.toggleCircle }}
            />
          </View>
        </View>
        <TouchableOpacityView onPress={changePassword}>
          <Input
            value="Change Password"
            icon={leftArrow}
            containerStyle={styles.passwordInput}
            editable={false}
          />
        </TouchableOpacityView>

        <MoreTab
          tabStyle={styles.mylocationTabStyle}
          source2={location_Icon}
          title="My Locations"
          source2Style={styles.locationIconStyle}
          onPress={() => NavigationService.navigate(MY_LOCATION)}
        />
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default DoctorSettings;

const styles = StyleSheet.create({
  nameContainer: {
    marginTop: 50,
  },
  btnView: {
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  availabilityView: {
    height: 60,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 6,
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  availableStyle: {
    marginHorizontal: 16,
    alignSelf: "center",
  },
  settingsImage: {
    height: 221,
    marginTop: 30,
    width: "100%",
  },
  passwordInput: {
    marginTop: 20,
  },
  mylocationTabStyle: {
    marginHorizontal: 0,
    marginTop: 20,
  },
  locationIconStyle: {
    height: 19,
    width: 19,
  },
  freeSlotsContainer: {
    marginTop: 20,
    height: 80,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.border,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  freeSlotsInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  increDecreButton: (color) => ({
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: color,
  }),
  countText: {
    paddingHorizontal: 20,
    fontSize: 24,
    textAlign: "center",
    color: colors.rbSheetBackgroung,
  },
  increDecreText: {
    color: colors.white,
  },
});
