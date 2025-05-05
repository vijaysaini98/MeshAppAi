import {
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  FOURTEEN,
  Input,
  NORMAL,
  Toolbar,
} from "../../../common";
import KeyBoardAware from "../../../common/KeyboardAware";
import {
  Profile_Icon,
  emailId_Icon,
  phoneNumber_Icon,
  leftArrow,
} from "../../../helper/ImageAssets";
import { universalPaddingHorizontal } from "../../../theme/dimens";
import { colors } from "../../../theme/colors";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useIsFocused } from "@react-navigation/native";
import { MrProfileData } from "../../../slices/mrSlice/mrAction";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import NavigationService from "../../../navigation/NavigationService";
import { DOCTOR_CHANGE_PASSWORD_SCREEN } from "../../../navigation/routes";

const Settings = () => {
  const dispatch = useAppDispatch();
  let focus = useIsFocused();

  const { mrProfiledata } = useAppSelector(
    (state) => {
      return state.mr;
    }
  );

  useEffect(() => {
    if (focus) {
      dispatch(MrProfileData());
    }
  }, [focus]);

  const changePassword = () => {
    NavigationService.navigate(DOCTOR_CHANGE_PASSWORD_SCREEN);
  };
  

  return (
    <AppSafeAreaView>
      <Toolbar title="Settings" />
      <KeyBoardAware>
        <Input
          mainContainer={styles.nameContainer}
          value={mrProfiledata?.name}
          icon={Profile_Icon}
          editable={false}
        />
        <Input
          value={mrProfiledata?.email}
          icon={emailId_Icon}
          editable={false}
        />
        <Input
          value={mrProfiledata?.phone?.toString()}
          editable={false}
          icon={phoneNumber_Icon}
        />
        <TouchableOpacityView
        onPress={changePassword}
        style={styles.changePasswordBtnContainer}
        >
          <AppText weight={NORMAL} type={FOURTEEN}>{"Change Password"}</AppText>
          <Image
          source={leftArrow}
          style={styles.iconStyle}
          resizeMode="contain"
          />
        </TouchableOpacityView>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  nameContainer: {
    marginTop: 50,
  },
  btnView: {
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
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
    opacity: 0.5,
    marginHorizontal: 16,
    alignSelf: "center",
  },
  addBankView: {
    backgroundColor: colors.bg_second,
    height: 86,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addBankText: {
    alignSelf: "center",
  },
  addBankLogo: {
    height: 30,
    width: 30,
  },
  addBankView1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 35,
    marginHorizontal: 25,
  },
  bankDetailView: { backgroundColor: colors.bg_second },
  mapView: { marginBottom: 10 },
  mapSubView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginVertical: 10,
  },
  bankValueStyle:{ 
    alignSelf: "flex-start", 
     width: "60%" 
    },
  changePasswordBtnContainer:{
    flexDirection:'row',
    justifyContent:"space-between",
    marginTop:20,
    backgroundColor:colors.border,
    paddingVertical:15,
    paddingHorizontal:10,
    borderRadius:8
  },
  iconStyle:{
    height: 22,
    width: 22,
  }
});
