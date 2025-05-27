import { Image, Keyboard, View } from "react-native";
import React from "react";
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  Input,
  MEDIUM,
  RadioButton,
  SIXTEEN,
  THIRTEEN,
  Toolbar,
} from "../../../common";
import { colors } from "../../../theme/colors";
import {
  checkbox_check,
  checkbox_uncheck,
  emailIcon,
  phoneNumber_Icon,
  Profile_Icon,
} from "../../../helper/ImageAssets";
import { DropdownComponent } from "../../common";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import KeyBoardAware from "../../../common/KeyboardAware";
import {
  communicationMode,
  contactTime,
  insuranceTypeData,
} from "../../../helper/dummydata";
import styles from "./styles";

const Insurance = () => {
  const [state, setState] = React.useState({
    name: "",
    phone: "",
    email: "",
    insuranceType: "",
    isInsuranceTypeFocues: false,
    age: "",
    contactTime: "",
    communicationMode: "",
    privacyPolicy: false,
  });

  const [insuranceType, setInsuranceType] = React.useState("");

  const onPressContactTime = (value: string) => {
    if (state?.contactTime !== value) {
      setState((prev) => ({ ...prev, contactTime: value }));
    } else {
      setState((prev) => ({ ...prev, contactTime: "" }));
    }
  };

  const onPressCommunication = (value: string) => {
    if (state?.communicationMode !== value) {
      setState((prev) => ({ ...prev, communicationMode: value }));
    } else {
      setState((prev) => ({ ...prev, communicationMode: "" }));
    }
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    let data = {
      name: state?.name,
      phone: state?.phone,
      email: state?.email,
      insuranceType: insuranceType,
      age: state?.age,
      contactTime: state?.contactTime,
      communicationMode: state?.communicationMode,
      privacyPolicy: state?.privacyPolicy,
    };
    console.log("Insurance Data: ", data);
  };

  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <Toolbar title="Gat an Insurance Quote" />
      <View style={styles.container}>
        <KeyBoardAware>
          <Input
            title={"Name"}
            required
            value={state?.name}
            onChangeText={(value) => setState({ ...state, name: value })}
            placeholder="Name"
            icon={Profile_Icon}
          />
          <Input
            title={"Phone"}
            required
            value={state?.phone}
            onChangeText={(value) => setState({ ...state, phone: value })}
            placeholder="Phone"
            keyboardType="phone-pad"
            maxLength={10}
            icon={phoneNumber_Icon}
          />
          <Input
            title={"Email"}
            required
            value={state?.email}
            onChangeText={(value) => setState({ ...state, email: value })}
            placeholder="Email"
            icon={emailIcon}
          />
          <DropdownComponent
            required
            data={insuranceTypeData}
            title={"Type of Insurance"}
            placeholder={
              !state?.isInsuranceTypeFocues ? "Select Speciality" : "..."
            }
            // xyz={state?.insuranceType}
            xyz={insuranceType}
            isFocus={state.isInsuranceTypeFocues}
            onFocus={() => setState({ ...state, isInsuranceTypeFocues: true })}
            onBlur={() => setState({ ...state, isInsuranceTypeFocues: false })}
            // onChange={(item: any) => {
            //     console.log("Selected Insurance Type: ", item?.value);

            //   setState((prev)=>({ ...prev, insuranceType: item?.value }));
            // }}
            onChange={(item: any) => {
              console.log("Selected Insurance Type: ", item?.value);
              setInsuranceType(item?.value);
              // setState((prev) => ({ ...prev, insuranceType: item?.value }));
            }}
          />
          <Input
            title={"Age"}
            required
            value={state?.age}
            onChangeText={(value) => setState({ ...state, age: value })}
            placeholder="Age"
            icon={Profile_Icon}
            keyboardType="numeric"
            maxLength={2}
          />
          <AppText
            type={SIXTEEN}
            weight={MEDIUM}
            style={styles.typeOfAppointment}
          >
            Preferred Contact Time
            <AppText type={FOURTEEN} style={styles.requiredTextStyle}>
              {"*"}
            </AppText>
          </AppText>
          <View style={styles.messageBox}>
            {contactTime?.map((e, index) => {
              return (
                <View key={e.id} style={styles.appointmentBox}>
                  <TouchableOpacityView
                    onPress={() => onPressContactTime(e?.value)}
                    style={styles.appointmentContainer(
                      state?.contactTime === e?.value
                    )}
                  >
                    <RadioButton
                      color={
                        state?.contactTime
                          ? colors.buttonBg
                          : colors.place_holder
                      }
                      value={state?.contactTime === e?.value ? true : false}
                      onPress={() => onPressContactTime(e?.value)}
                      message={e?.value}
                    />
                  </TouchableOpacityView>
                </View>
              );
            })}
          </View>
          <AppText
            type={SIXTEEN}
            weight={MEDIUM}
            style={styles.typeOfAppointment}
          >
            Preferred Mode of Communication
            <AppText type={FOURTEEN} style={styles.requiredTextStyle}>
              {"*"}
            </AppText>
          </AppText>
          <View style={styles.messageBox}>
            {communicationMode?.map((e, index) => {
              return (
                <View key={e.id} style={styles.appointmentBox}>
                  <TouchableOpacityView
                    onPress={() => onPressCommunication(e?.value)}
                    style={styles.appointmentContainer(
                      state?.communicationMode === e?.value
                    )}
                  >
                    <RadioButton
                      color={
                        state?.communicationMode
                          ? colors.buttonBg
                          : colors.place_holder
                      }
                      value={
                        state?.communicationMode === e?.value ? true : false
                      }
                      onPress={() => onPressCommunication(e?.value)}
                      message={e?.value}
                    />
                  </TouchableOpacityView>
                </View>
              );
            })}
          </View>
          <TouchableOpacityView
            onPress={() =>
              setState((prev) => ({
                ...prev,
                privacyPolicy: !state.privacyPolicy,
              }))
            }
            style={styles.privacyClickContainer}
          >
            <Image
              source={state?.privacyPolicy ? checkbox_check : checkbox_uncheck}
              style={styles.concentImageStyle}
              tintColor={
                state?.privacyPolicy ? colors.buttonBg : colors.place_holder
              }
            />
            <AppText weight={MEDIUM} type={THIRTEEN} style={styles.policyLink}>
              {" "}
              {"I agree to be contacted for insurance related services"}
              <AppText type={FOURTEEN} style={styles.requiredTextStyle}>
                {"*"}
              </AppText>
            </AppText>
          </TouchableOpacityView>
          <View style={styles.btnView}>
            <Button
              //   disabled={!doctorCondition}
              children="Submit"
              onPress={() => handleSubmit()}
              //   loading={isLoading || (isBtnLoading && doctorCondition)}
            />
          </View>
        </KeyBoardAware>
      </View>
    </AppSafeAreaView>
  );
};

export default Insurance;
