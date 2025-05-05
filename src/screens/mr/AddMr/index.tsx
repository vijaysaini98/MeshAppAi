import React, { useCallback, useRef, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  Button,
  ELEVEN,
  FOURTEEN,
  Input,
  MEDIUM,
  RadioButton,
  SEMI_BOLD,
  TEN,
  THIRTEEN,
  Toolbar,
  TWELVE,
} from "../../../common";
import KeyBoardAware from "../../../common/KeyboardAware";
import { ActivityIndicator, Image, View } from "react-native";
import { colors } from "../../../theme/colors";
import {
  genderData,
  maritalStatusData,
  maritialStatusData,
} from "../../../helper/dummydata";
import DateModal from "../../../common/DateTimePicker";
import moment from "moment";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
;
import {
  btnTitle,
  GOOGL_API,
  IMAGE_PATH1,
  label,
  messages,
  placeHolderText,
  titleText,
} from "../../../helper/Constants";
import {
  camera_icon,
  checkbox_check,
  checkbox_uncheck,
  Cross_icon,
  emailIcon,
  location_Icon,
  phoneNumber_Icon,
  Profile_Icon,
} from "../../../helper/ImageAssets";
import CameraModal from "../../common/cameraModal";
import Toast from "react-native-simple-toast";
import {
  cleanObject,
  validateEmail,
  validatePhoneNumber,
} from "../../../helper/utility";
import { getLocation } from "../../../slices/drSlice/drAction";
import { showError } from "../../../helper/logger";
import { setPrivacyPolicy } from "../../../slices/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import NavigationService from "../../../navigation/NavigationService";
import { WEBVIEWE_SCREEN, WELCOME_SCREEN } from "../../../navigation/routes";
import { styles } from "./styles";
import { addMr } from "../../../slices/mrSlice/mrAction";
import OtpModal from "../../common/OtpModal";
import {
  setEmail,
  setName,
  setFatherName,
  setGender,
  setMaritalStatus,
  setPhoneNo,
  setDob,
  setAddress,
  setCity,
  setPinCode,
  setAddressState,
  setEmptyMrRegistration,
  setProfileImage,
  setJoiningDate,
} from "../../../slices/mrSlice/mrSlice";
import { CongratulationsSheet } from "../../../common/CongratulationsSheet";

const AddMr = () => {
  const dispatch = useAppDispatch();

  const { privacyPolicy } = useAppSelector((state) => {
    return state.auth;
  });

  const {
    companyList,
    companyZone,
    isLoading,
    fullName,
    gender,
    fatherName,
    phoneNo,
    dob,
    maritalStatus,
    email,
    pinCode,
    address,
    addressState,
    city,
    profileImage,
    joiningDate,
  } = useAppSelector((state) => {
    return state.mr;
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isJoiningDatePickerVisible, setJoiningDatePickerVisible] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);

  const [arrLocation, setArrLocation] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const bottomSheetRef = useRef<any>(null);

  let company_name_to_find = "Mesh app Ai";
  let result = {};

  for (let item of companyList) {
    if (item["company_name"] === company_name_to_find) {
      result = item;
      break;
    }
  }
  

  const submitBtnDissabled =
    fullName &&
    phoneNo &&
    email &&
    profileImage &&
    privacyPolicy;
    // dob &&
    // address &&
    // city &&
    // pinCode &&
    // addressState &&
    // maritalStatus &&
    // joiningDate &&;

  const handler = useCallback(
    (value?: string) => getLocation(value, setSearchLoader, setArrLocation),
    []
  );

  const showDatePicker = (type) => {
    if (type === "dob") {
      setDatePickerVisibility(true);
    } else {
      setJoiningDatePickerVisible(true);
    }
  };

  const hideDatePicker = (type) => {
    if (type === "dob") {
      setDatePickerVisibility(false);
    } else {
      setJoiningDatePickerVisible(false);
    }
  };

  const handleConfirm = (date, type) => {
    let dateFormat = moment(date).format("DD-MMM-YYYY");
    if (type === "dob") {
      dispatch(setDob(dateFormat));
      hideDatePicker(type);
    } else {
      dispatch(setJoiningDate(dateFormat));
      hideDatePicker(type);
    }
  };

  const toggleModal = (more?: any) => {
    setModalVisible(!modalVisible);
  };

  const onSelectAddress = async (dat?: any) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${dat.place_id}&key=${GOOGL_API}`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setArrLocation([]);

        let address = "";
        let routeAddress = "";
        let tempstreetone = "";
        let tempstreettwo = "";
        let tempstreetthree = "";
        for (const component of data.result.address_components) {
          const componentType = component.types[0];
          
          switch (componentType) {
            case "premise":
              address = component.short_name;
              break;
            case "route":
              routeAddress = component.short_name;
              break;
            case "postal_code":
              dispatch(setPinCode(component.short_name));
              break;
            case "administrative_area_level_1":
              dispatch(setAddressState(component.long_name));
              break;
            case "locality":
              dispatch(setCity(component.long_name));
              break;
            case "neighborhood":
              tempstreetone = component.long_name;
              break;
            case "sublocality_level_2":
              tempstreettwo = component.long_name;
              break;
            case "sublocality_level_1":
              tempstreetthree = component.long_name;
              break;
            default:
              break;
          }
        }

        dispatch(
          setAddress(
            `${address} ${routeAddress} ${tempstreetone} ${tempstreettwo} ${tempstreetthree}`.trim()
          )
        );
      } else {
        console.error("Failed to fetch place details:", response.statusText);
        showError(response.statusText);
      }
    } catch (error) {
      showError(error);
      console.error("Error fetching place details:", error);
    }
  };

  const onPressSubmit = () => {
    if (!profileImage) {
      return Toast.show(messages.profileImageRequired, Toast.LONG);
    }
    if (fullName == "") {
      return Toast.show(messages.fullNameRequired, Toast.LONG);
    } else if (!validateEmail(email)) {
      return Toast.show(messages.enterEmail, Toast.LONG);
    } else if (email == "") {
      return Toast.show(messages.emailRequired, Toast.LONG);
    } else if (phoneNo == "") {
      Toast.show(messages.enterPhoneNo, Toast.LONG);
    } else if (!validatePhoneNumber(phoneNo)) {
      Toast.show(messages.phoneNumberValidation, Toast.LONG);
    }
    // else if (maritalStatus == "") {
    //     Toast.show(messages.maritalStatusRequired, Toast.LONG);
    // }
    else if (!privacyPolicy) {
      Toast.show(messages.privacyPolicySelect, Toast.LONG);
    } else {
      let data = {
        avatar: profileImage,
        address: address,
        city: city,
        division_id: companyZone?.zones[0]?.company_divisions[0]?.id,
        dob: dob,
        email: email,
        emergency_number: "",
        emp_id: companyZone?.emp_id,
        father_name: fatherName,
        gender: gender,
        name: fullName,
        phone: phoneNo,
        pin_code: pinCode,
        reporting_manager_id: companyZone?.reporting_manager[0]?.id,
        state: addressState,
        zone_id: companyZone?.zones[0]?.id,
        client_id: result?.id,
        maritial_status: maritalStatus,
        joining_date: moment(new Date()).format("DD-MMM-YYYY"),
        referral_code: referralCode,
      };

      data = cleanObject(data);
      dispatch(addMr(data, successCallBack));
    }
  };

  const successCallBack = () => {
    // setModalVisible1(true);
    bottomSheetRef?.current?.open();
    dispatch(setEmptyMrRegistration());
    setReferralCode("");
    dispatch(dispatch(setPrivacyPolicy(false)));
  };

  const RenderLocationList = ({ item, index }) => {
    return (
      <TouchableOpacityView
        onPress={() => onSelectAddress(item)}
        key={index}
        style={{
          padding: 10,
        }}
      >
        <AppText weight={SEMI_BOLD} type={TEN}>
          {item?.description}
        </AppText>
      </TouchableOpacityView>
    );
  };

  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <Toolbar title={titleText.addMr} />
      <KeyBoardAware style={styles.mainContainerSecond}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <>
              <Image
                source={{
                  uri: IMAGE_PATH1 + profileImage,
                }}
                resizeMode="contain"
                style={styles.profileImage}
              />
              <TouchableOpacityView
                style={styles.cancelProfileImageBtn}
                onPress={() => dispatch(setProfileImage(""))}
              >
                <Image
                  source={Cross_icon}
                  style={styles.cancelProfileImage}
                />
              </TouchableOpacityView>
            </>
          ) : (
            <TouchableOpacityView
              onPress={() => toggleModal()}
              style={{ alignItems: "center" }}
            >
              <Image
                source={camera_icon}
                resizeMode="contain"
                style={styles.cameraImageStyle}
              />
              <AppText type={FOURTEEN} style={styles.profileImageLabel}>
                Add Profile{"\n"}Picture
                <AppText style={styles.required}>*</AppText>
              </AppText>
            </TouchableOpacityView>
          )}
        </View>
        <Input
          title={label.fullName}
          required
          value={fullName}
          onChangeText={(value) => dispatch(setName(value))}
          placeholder={placeHolderText.fullName}
          icon={Profile_Icon}
        />
        <Input
          title={label.fatherName}
          value={fatherName}
          onChangeText={(value) => dispatch(setFatherName(value))}
          placeholder={placeHolderText.fatherName}
          icon={Profile_Icon}
        />
        <AppText type={FOURTEEN} weight={MEDIUM} style={styles.labelStyle}>
          {label.gender}
        </AppText>
        <View style={styles.genderRadioBtnContainer}>
          {genderData.map((e, index) => (
            <View key={e?.id} style={styles.radioBtnContainerStyle}>
              <RadioButton
                radioStyle={styles.radioStyle}
                appTextType={THIRTEEN}
                value={gender === e?.name ? true : false}
                onPress={() => dispatch(setGender(e?.name))}
                message={e?.name}
              />
            </View>
          ))}
        </View>

        <AppText
          type={FOURTEEN}
          weight={MEDIUM}
          style={[styles.labelStyle, { marginBottom: 5 }]}
        >
          {label.dob}
        </AppText>
        <TouchableOpacityView
          onPress={() => showDatePicker("dob")}
          style={styles.dobContainer}
        >
          {dob ? (
            <AppText>{dob}</AppText>
          ) : (
            <AppText style={{ color: colors.place_holder }}>
              {placeHolderText.dob}
            </AppText>
          )}
          <DateModal
            date
            mode="date"
            onPress={() => showDatePicker("dob")}
            isVisible={isDatePickerVisible}
            handleConfirm={(date) => handleConfirm(date, "dob")}
            onCancel={() => hideDatePicker("dob")}
            is24Hour={true}
            maximumDate={new Date()}
          />
        </TouchableOpacityView>

        {/* <AppText
          type={FOURTEEN}
          weight={MEDIUM}
          style={[styles.labelStyle, { marginBottom: 5 }]}
        >
          {label.joiningDate}
          <AppText style={styles.required}>*</AppText>
        </AppText>
        <TouchableOpacityView
          onPress={() => showDatePicker("jDate")}
          style={styles.dobContainer}
        >
          {joiningDate ? (
            <AppText>{joiningDate}</AppText>
          ) : (
            <AppText style={{ color: colors.place_holder }}>
              {placeHolderText.joiningDate}
            </AppText>
          )}
          <DateModal
            date
            mode="date"
            onPress={() => showDatePicker("jDate")}
            isVisible={isJoiningDatePickerVisible}
            handleConfirm={(date) => handleConfirm(date, "jDate")}
            onCancel={() => hideDatePicker("jDate")}
            is24Hour={true}
            minimumDate={new Date()}
          />
        </TouchableOpacityView> */}

        <AppText type={FOURTEEN} weight={MEDIUM} style={styles.labelStyle}>
          {label.maritalStatus}
          {/* <AppText style={styles.required}>*</AppText> */}
        </AppText>
        <View style={styles.genderRadioBtnContainer}>
          {maritalStatusData.map((e, index) => (
            <View key={e?.id} style={styles.radioBtnContainerStyle}>
              <RadioButton
                radioStyle={styles.radioStyle}
                appTextType={THIRTEEN}
                value={maritalStatus === e?.name ? true : false}
                // onPress={() => setState((prev) => ({ ...prev, maritalStatus: e?.name }))}
                onPress={() => dispatch(setMaritalStatus(e?.name))}
                message={e?.name}
              />
            </View>
          ))}
        </View>

        <Input
          title={label.email}
          required
          value={email}
          onChangeText={(value) => dispatch(setEmail(value.trim()))}
          placeholder={placeHolderText.email}
          icon={emailIcon}
          keyboardType="email-address"
        />
        <Input
          title={label.phoneNo}
          required
          value={phoneNo}
          onChangeText={(value) => dispatch(setPhoneNo(value))}
          placeholder={placeHolderText.phoneNumber}
          keyboardType="number-pad"
          maxLength={10}
          icon={phoneNumber_Icon}
        />
        <View style={{ flexGrow: 1, zIndex: 1 }}>
          <Input
            title={label.address}
            // required
            value={address}
            onChangeText={(text) => {
              handler(text);
              dispatch(setAddress(text));
            }}
            placeholder={placeHolderText.address}
            icon={location_Icon}
          />
          {searchLoader ? (
            <ActivityIndicator size={"small"} color={colors.buttonBg} />
          ) : (
            arrLocation.length > 0 &&
            arrLocation && (
              <View style={styles.locationListContainerStyle}>
                {arrLocation?.map((item, index) => (
                  <>
                    <RenderLocationList item={item} index={index} />
                    <View style={styles.itemSperatorStyle} />
                  </>
                ))}
                <TouchableOpacityView
                  onPress={() => setArrLocation([])}
                  style={styles.locationClose}
                >
                  <Image
                    source={Cross_icon}
                    style={styles.closeIcon}
                    tintColor={colors.buttonBg}
                  />
                </TouchableOpacityView>
              </View>
            )
          )}
        </View>
        <Input
          title={label.city}
          // required
          value={city}
          onChangeText={(value) => dispatch(setCity(value))}
          placeholder={placeHolderText.city}
          icon={location_Icon}
        />
        <Input
          title={label.pinCode}
          // required
          value={pinCode}
          onChangeText={(value) => dispatch(setPinCode(value))}
          placeholder={placeHolderText.pinCode}
          icon={location_Icon}
        />
        <Input
          title={label.state}
          // required
          value={addressState}
          onChangeText={(value) => dispatch(setAddressState(value))}
          placeholder={placeHolderText.state}
          icon={location_Icon}
        />
        <Input
          title={label.referralCode}
          // required
          value={referralCode}
          onChangeText={(value) => setReferralCode(value)}
          placeholder={placeHolderText.referralCode}
          // icon={location_Icon}
        />

        <View style={styles.privacyContainer}>
          <TouchableOpacityView
            onPress={() => dispatch(setPrivacyPolicy(!privacyPolicy))}
            style={{}}
          >
            <Image
              source={privacyPolicy ? checkbox_check : checkbox_uncheck}
              style={styles.checkIconStyle}
              tintColor={colors.buttonBg}
            />
          </TouchableOpacityView>
          <AppText
            weight={MEDIUM}
            type={FOURTEEN}
            onPress={() => {
              NavigationService.navigate(WEBVIEWE_SCREEN, { type: "mr" });
            }}
            style={styles.privacyPolicyText}
          >
            {"Check and Accept Our"}
            <AppText weight={MEDIUM} type={FOURTEEN} style={styles.privacyLink}>
              {" Privacy Policy"}
            </AppText>
            <AppText type={FOURTEEN} style={styles.required}>
              {"*"}
            </AppText>
          </AppText>
        </View>
        <Button
          disabled={!submitBtnDissabled}
          loading={isLoading ? true : false}
          containerStyle={styles.submitBtnStyle}
          children={btnTitle.submit}
          onPress={() => onPressSubmit()}
        />
      </KeyBoardAware>
      <CameraModal
        KycCamraisModalVisible={modalVisible}
        setKycCamraisModalVisible={(thing) => {
          setModalVisible(thing);
        }}
        setImage={setProfileImage}
        handleUpdateProfile={(data) => dispatch(setProfileImage(data))}
        from={"mrProfile"}
      />
      <CongratulationsSheet sheetRef={bottomSheetRef} />
    </AppSafeAreaView>
  );
};

export default AddMr;
