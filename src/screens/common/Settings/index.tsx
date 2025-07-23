import React, { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import {
  AppSafeAreaView,
  Button,
  FIFTEEN,
  FOURTEEN,
  Input,
  THIRTEEN,
  Toolbar,
} from "../../../common";
import KeyBoardAware from "../../../common/KeyboardAware";
import {
  Profile_Icon,
  emailId_Icon,
  phoneNumber_Icon,
  leftArrow,
  downArrow,
} from "../../../helper/ImageAssets";
import { colors } from "../../../theme/colors";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useIsFocused } from "@react-navigation/native";
import { MrProfileData, updateMrProfile } from "../../../slices/mrSlice/mrAction";
import Toast from "react-native-simple-toast";
import { DrChangePassword } from "../../../slices/drSlice/drAction";
import MoreTab from "../MoreTab";
import styles from "./styles";

const Settings = () => {
  const dispatch = useAppDispatch();
  const focus = useIsFocused();

  const { mrProfiledata } = useAppSelector((state) => state.mr);
  const { isBtnLoading } = useAppSelector((state) => state.auth)
  const { isLoading } = useAppSelector((state) => state.doctor)

  const [nameEditable, setNameEditable] = useState(false);
  const [name, setName] = useState(mrProfiledata?.name ?? "")
  const [changePassword, setChangePassword] = useState({
    isChangePassword: false,
    isPasswordVisible: true,
    isNewPasswordVisible: true,
    isConfirmPasswordVisible: true,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (focus) {
      dispatch(MrProfileData());
    }
  }, [focus, dispatch]);

  const handleChangePassword = useCallback(() => {
    if (!changePassword.oldPassword) {
      return Toast.show("Please Enter Old Password...", Toast.LONG);
    }
    if (!changePassword.newPassword) {
      return Toast.show("Please Enter New Password...", Toast.LONG);
    }
    if (!changePassword.confirmPassword) {
      return Toast.show("Please Enter Confirm password...", Toast.LONG);
    }
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      return Toast.show(
        "New password and Confirm password must be the same.",
        Toast.LONG
      );
    }
    const data = {
      oldPassword: changePassword.oldPassword,
      newPassword: changePassword.newPassword,
      confirmPassword: changePassword.confirmPassword,
    };
    dispatch(DrChangePassword(data));
  }, [changePassword, dispatch]);

  const toggleEditName = useCallback(() => {
    setNameEditable((prev) => !prev);
  }, []);

  const toggleChangePassword = useCallback(() => {
    setChangePassword((prev) => ({
      ...prev,
      isChangePassword: !prev.isChangePassword,
    }));
  }, []);

  const togglePasswordVisibility = useCallback((field: string) => {
    setChangePassword((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  }, []);

  const handleChangeName = () => {
    if (mrProfiledata?.name == name) {
      setNameEditable(false)
      return Toast.show("No changes detected. Please modify your name before saving.", Toast.LONG);
    }
    let data = {
      name: name
    }
    dispatch(updateMrProfile(data, setNameEditable(false)))
  }

  let changePassCheck = changePassword.oldPassword != "" &&
    changePassword.newPassword !== "" &&
    changePassword.confirmPassword !== "" &&
    (changePassword.newPassword === changePassword.confirmPassword)

  return (
    <AppSafeAreaView>
      <Toolbar title="Settings" />
      <KeyBoardAware>
        <View style={styles.nameContainer}>
          <Input
            mainContainer={styles.nameInputContainer}
            value={name}
            onChangeText={(val) => setName(val)}
            icon={Profile_Icon}
            editable={nameEditable}
          />
          <Button
            loading={isBtnLoading}
            appTextType={THIRTEEN}
            isSecond={!nameEditable}
            containerStyle={styles.nameEditeBtn(nameEditable)}
            children={nameEditable ? "Save" : "Edit"}
            onPress={nameEditable ? handleChangeName : toggleEditName}
          />
        </View>
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
        <MoreTab
          tabStyle={styles.changePassTabStyle}
          titleType={FOURTEEN}
          titleStyle={styles.tabTitleStyle}
          title="Change Password"
          source2={changePassword.isChangePassword ? downArrow : leftArrow}
          onPress={toggleChangePassword}
          source2Style={{ height: 18, width: 18 }}
          tintColor={colors.defaultText}
        />

        {changePassword.isChangePassword && (
          <>
            <Input
              placeholder="Old Password"
              value={changePassword.oldPassword}
              onChangeText={(val) =>
                setChangePassword((prev) => ({ ...prev, oldPassword: val }))
              }
              secureTextEntry={changePassword.isPasswordVisible}
              isSecure
              onPressVisible={() =>
                togglePasswordVisibility("isPasswordVisible")
              }
            />
            <Input
              placeholder="New Password"
              value={changePassword.newPassword}
              onChangeText={(val) =>
                setChangePassword((prev) => ({ ...prev, newPassword: val }))
              }
              secureTextEntry={changePassword.isNewPasswordVisible}
              isSecure
              onPressVisible={() =>
                togglePasswordVisibility("isNewPasswordVisible")
              }
            />
            <Input
              isSecure
              placeholder="Confirm Password"
              value={changePassword.confirmPassword}
              secureTextEntry={changePassword.isConfirmPasswordVisible}
              onChangeText={(val) =>
                setChangePassword((prev) => ({
                  ...prev,
                  confirmPassword: val,
                }))
              }
              onPressVisible={() =>
                togglePasswordVisibility("isConfirmPasswordVisible")
              }
            />
            <Button
              children="Submit"
              loading={isLoading}
              appTextType={FIFTEEN}
              disabled={!changePassCheck}
              onPress={handleChangePassword}
              containerStyle={styles.changePassBtn}
            />
          </>
        )}
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default Settings;
