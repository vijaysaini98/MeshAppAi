import React, { useCallback, useMemo } from "react";
import { Image, Keyboard, View } from "react-native";
import KeyBoardAware from "../../../common/KeyboardAware";
import DropdownComponent from "../Dropdown";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import {
  communicationMode,
  communicationModeData,
  insuranceTypeData,
} from "../../../helper/dummydata";
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  Button,
  FOURTEEN,
  Input,
  MEDIUM,
  NORMAL,
  RadioButton,
  SIXTEEN,
  THIRTEEN,
  Toolbar,
  TWELVE,
} from "../../../common";
import { phoneNumber_Icon, Profile_Icon } from "../../../helper/ImageAssets";
import { colors } from "../../../theme/colors";
import styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { insurance } from "../../../slices/drSlice/drAction";

interface InsuranceState {
  name: string;
  phone: string;
  isInsuranceTypeFocues: boolean;
  contactTime: string;
  communicationMode: string;
  privacyPolicy: boolean;
}

const initialState: InsuranceState = {
  name: "",
  phone: "",
  isInsuranceTypeFocues: false,
  contactTime: "",
  communicationMode: "",
  privacyPolicy: false,
};

const Insurance = () => {
  const dispatch = useAppDispatch();
  const { isBtnLoading } = useAppSelector((state) => state.auth);

  const [state, setState] = React.useState<InsuranceState>(initialState);
  const [insuranceType, setInsuranceType] = React.useState<string>("");

  const { name, phone, isInsuranceTypeFocues, communicationMode } = state;

  const insuranceCondition = useMemo(
    () =>
      !!(
        name &&
        phone &&
        phone.length === 10 &&
        insuranceType &&
        communicationMode
      ),
    [name, phone, insuranceType, communicationMode]
  );

  const onPressCommunication = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      communicationMode: prev.communicationMode !== value ? value : "",
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    const data = {
      name,
      mobile: phone,
      product_interest: insuranceType,
      mode_of_communication: communicationMode,
    };
    dispatch(insurance(data, handleSuccess));
  }, [name, phone, insuranceType, communicationMode, dispatch]);

  const handleSuccess = useCallback(() => {
    setState(initialState);
    setInsuranceType("");
  }, []);

  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <Toolbar title="Get an Insurance Quote" />
      <View style={styles.container}>
        <KeyBoardAware>
          <View style={styles.inputContainer}>
            <Input
              title="Full Name"
              required
              value={name}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, name: value }))
              }
              placeholder="Full Name"
              icon={Profile_Icon}
            />

            <Input
              title="Phone"
              required
              value={phone}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, phone: value }))
              }
              placeholder="Phone"
              keyboardType="phone-pad"
              maxLength={10}
              icon={phoneNumber_Icon}
            />

            <DropdownComponent
              required
              data={insuranceTypeData}
              title="Type of Insurance"
              placeholder={!isInsuranceTypeFocues ? "Select Speciality" : "..."}
              xyz={insuranceType}
              isFocus={isInsuranceTypeFocues}
              onFocus={() =>
                setState((prev) => ({ ...prev, isInsuranceTypeFocues: true }))
              }
              onBlur={() =>
                setState((prev) => ({ ...prev, isInsuranceTypeFocues: false }))
              }
              onChange={(item: any) => setInsuranceType(item?.value)}
            />

            <AppText
              type={THIRTEEN}
              weight={MEDIUM}
              style={styles.typeOfAppointment}
            >
              Preferred Mode of Communication
              <AppText type={TWELVE} style={styles.requiredTextStyle}>
                *
              </AppText>
            </AppText>
            <View style={styles.messageBox}>
              {communicationModeData?.map((e, index) => (
                <TouchableOpacityView
                  key={e.id}
                  onPress={() => onPressCommunication(e.value)}
                  style={[
                    styles.appointmentContainer(communicationMode === e.value),
                    communicationMode === e.value && styles.shadowStyle,
                  ]}
                >
                  <RadioButton
                    messageStyle={{
                      color:
                        communicationMode === e.value
                          ? colors.buttonBg
                          : colors.defaultText,
                    }}
                    color={
                      communicationMode === e.value
                        ? colors.buttonBg
                        : colors.place_holder
                    }
                    value={communicationMode === e.value}
                    appTextWeight={
                      communicationMode === e.value ? MEDIUM : NORMAL
                    }
                    onPress={() => onPressCommunication(e.value)}
                    message={e.value}
                  />
                </TouchableOpacityView>
              ))}
            </View>
          </View>

          <View style={styles.btnView}>
            <Button
              disabled={!insuranceCondition}
              children="Submit"
              onPress={handleSubmit}
              loading={isBtnLoading && insuranceCondition}
            />
          </View>
        </KeyBoardAware>
      </View>
    </AppSafeAreaView>
  );
};

export default Insurance;
