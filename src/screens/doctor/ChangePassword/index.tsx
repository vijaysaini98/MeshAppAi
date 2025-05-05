import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { AppSafeAreaView, Button, Input, Toolbar } from "../../../common";
import KeyBoardAware from "../../../common/KeyboardAware";
import { universalPaddingHorizontal } from "../../../theme/dimens";
import { colors } from "../../../theme/colors";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { DrChangePassword } from "../../../slices/drSlice/drAction";
import { AnimationSpinner } from "../../../animation";
import Toast from "react-native-simple-toast";

const ChangePasswordScreen = () => {
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const changePasswordApi = () => {
    // Alert.alert("hii")
    if (!oldPassword) {
      return Toast.show("Please Enter Old Password...", Toast.LONG);
    } else if (!newPassword) {
      return Toast.show("Please Enter New Password...", Toast.LONG);
    } else if (!confirmPassword) {
      return Toast.show("Please Enter Confirm password...", Toast.LONG);
    } else if (newPassword !== confirmPassword) {
      return Toast.show(
        "New password and  Confirm password Must be Same ...",
        Toast.LONG
      );
    } else {
      let data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      dispatch(DrChangePassword(data));
    }
  };
  const { isLoading } = useAppSelector((state) => {
    return state.doctor;
  });

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView>
        <Toolbar title="Change Password" />
        <KeyBoardAware>
          <Input
            placeholder="Old Password"
            //   icon={eye_close_icon}
            containerStyle={styles.passwordInput}
            value={oldPassword}
            onChangeText={(val) => setOldPassword(val)}
            secureTextEntry={!isPasswordVisible}
            isSecure
            onPressVisible={() => setIsPasswordVisible(!isPasswordVisible)}
          />
          <Input
            placeholder="New Password"
            containerStyle={styles.passwordInput}
            value={newPassword}
            onChangeText={(val) => setNewPassword(val)}
            secureTextEntry={!isNewPasswordVisible}
            isSecure
            onPressVisible={() =>
              setIsNewPasswordVisible(!isNewPasswordVisible)
            }
          />

          <Input
            placeholder="Confirm Password"
            containerStyle={styles.passwordInput}
            value={confirmPassword}
            onChangeText={(val) => setConfirmPassword(val)}
            secureTextEntry={!isConfirmPasswordVisible}
            isSecure
            onPressVisible={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          />
        </KeyBoardAware>
        <View style={styles.btnView}>
          <Button
            containerStyle={styles.btnStyle}
            children="Update & Save"
            onPress={() => changePasswordApi()}
          />
        </View>
      </AppSafeAreaView>
    </>
  );
};

export default ChangePasswordScreen;

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
  },
  passwordInput: {
    marginTop: 40,
  },
});
