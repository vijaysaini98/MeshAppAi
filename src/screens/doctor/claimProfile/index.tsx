import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, Keyboard, View } from "react-native";
;
import {
  AppSafeAreaView,
  AppText,
  BUTTON_BG,
  Button,
  FOURTEEN,
  Input,
  MEDIUM,
  SEMI_BOLD,
  SIXTEEN,
  THIRTY,
  TWENTY,
  WHITE,
} from "../../../common";
import styles from "./styles";
import { IMAGE_PATH1, placeHolderText } from "../../../helper/Constants";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { DummyUser, backIcon, locationIcon, searchIconBlue } from "../../../helper/ImageAssets";
import NavigationService from "../../../navigation/NavigationService";
import { ADD_MY_PROFILE } from "../../../navigation/routes";
import { colors } from "../../../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { getSpeciality, serachDoctorAPI } from "../../../slices/drSlice/drAction";
import { useAppSelector } from "../../../store/hooks";
import { useIsFocused } from "@react-navigation/native";
import {
  deleteUploadImages,
  setAddress,
  setAddressState,
  setCity,
  setEmail,
  setEmptyDrProfileData,
  setName,
  setPhone,
  setPinCode,
  setRNO,
  setSearchDataInitial,
  setSearchDoctors,
  setSpeciality,
} from "../../../slices/drSlice/drSlice";
import { AnimationSpinner } from "../../../animation";
import { setPrivacyPolicy, setVerifyOtp } from "../../../slices/authSlice/authSlice";
import { ListEmptyComponent } from "../Appointment";

const HomeSearchBar = ({ setStatus }) => {
  const [value, setValue] = useState<string>("");

  const onPressback = () => {
    NavigationService.goBack();
  };
  const timeout: any = useRef(null);
  const dispatch: any = useDispatch();

  const onChangeHandler = (value: string) => {
    setValue(value);
    setStatus("")
    clearTimeout(timeout.current);
    if (value?.trim()) {

      timeout.current = setTimeout(() => {
        dispatch(serachDoctorAPI(value));
      }, 500);
    } else {
      dispatch(setSearchDataInitial(false));
    }
  };

  let focus = useIsFocused();

  useEffect(() => {
    if (!focus) {
      setValue("");
      dispatch(setSearchDataInitial(false));
    }
  }, [focus]);

  return (
    <View style={{ backgroundColor: colors.mainBg }}>
      <View style={styles.searchContainer}>
        <TouchableOpacityView
          style={styles.filterContainer}
          onPress={() => onPressback()}
        >
          <Image
            source={backIcon}
            resizeMode="contain"
            style={styles.bellIcon}
          />
        </TouchableOpacityView>
        <Input
          containerStyle={{ marginLeft: 20 }}
          placeholder={placeHolderText.search}
          value={value}
          onChangeText={(text) => onChangeHandler(text)}
          autoCapitalize="none"
          returnKeyType="done"
          mainContainer={styles.searchInput}
          icon2={searchIconBlue}
        />
      </View>
    </View>
  );
};

const ClaimProfile = () => {
  const dispatch = useDispatch();
  let focus = useIsFocused();

  const { isLoading, searchDataInitial, doctorSpeciality,searchDoctors} = useSelector((state) => {
    return state.doctor;
  });

  const [status, setStatus] = useState();

  const onPressBox = (id) => {
    Keyboard.dismiss()
    setStatus(id);
  };

  useEffect(() => {
    if (!focus) {
      setSearchDoctors("");
      dispatch(setSearchDoctors([]));
    }
  }, [focus]);

  useEffect(() => {
    if (focus) {
      dispatch(getSpeciality());
    }
  }, [focus]);

  const onPressNext = (item) => {
    let speciality = doctorSpeciality.find(e => e?.specialization === item?.speciality)?.id

    if (status == item?.id) {
      dispatch(setName(item?.name))
      dispatch(setEmail(item?.email))
      dispatch(setPhone(item?.mobile_number))
      dispatch(setRNO(item?.registration_number))
      dispatch(setAddress(item?.address))
      dispatch(setCity(item?.city))
      dispatch(setAddressState(item?.state))
      dispatch(setPinCode(item?.pincode))
      dispatch(setSpeciality(speciality))
      setSearchDoctors("");
      dispatch(setPrivacyPolicy(false));
      dispatch(setSearchDoctors([]));
      dispatch(deleteUploadImages(undefined, {}))
      dispatch(deleteUploadImages("degree", {}))
      dispatch(deleteUploadImages("aadhar", {}))
      dispatch(deleteUploadImages("profile", {}))
      setStatus("");
      dispatch(setVerifyOtp(false))
      NavigationService.navigate(ADD_MY_PROFILE, { data: item });
    }
  };

  const handleNavigation = () => {
    dispatch(deleteUploadImages("profile", {}))
    dispatch(deleteUploadImages("degree", {}))
    dispatch(deleteUploadImages("aadhar", {}))
    dispatch(setVerifyOtp(false))
    dispatch(setPrivacyPolicy(false));
    dispatch(setEmptyDrProfileData())
    NavigationService.navigate(ADD_MY_PROFILE)
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacityView
        key={index}
        style={[styles.mainCardContainer, {
          borderColor: status == item?.id ? colors.buttonBg : colors.border
        }]}
        onPress={() => onPressBox(item?.id)}
      >
        <View style={styles.containerStyle}>
          <Image
            source={item?.Users?.avatar ? {
              uri: IMAGE_PATH1 + item?.Users?.avatar
            }
              :
              DummyUser
            }
            resizeMode="contain"
            style={styles.profileImageStyle}
          />
          <View style={{ flex: 1 }}>
            <AppText
              type={TWENTY} weight={MEDIUM} numberOfLines={1}>
              {item?.name}
            </AppText>

            <View style={styles.specRegContainer}>
              <View style={styles.specialityContainer}>
                <AppText color={WHITE}>
                  {item?.speciality}
                </AppText>
              </View>
              {item?.registration_number && (
                <View
                  style={
                    styles.regContainerStyle
                  }
                >
                  <AppText color={WHITE}>
                    {item?.registration_number}
                  </AppText>
                </View>
              )}
            </View>
            <View style={styles.locationContainer}>
              <Image
                source={locationIcon}
                resizeMode="contain"
                style={styles.locationIconStyle}
              />
              <AppText weight={MEDIUM} type={FOURTEEN} style={{ flex: 1 }}>
                {item?.address}
              </AppText>
            </View>
          </View>
        </View>
        <Button
          onPress={() => onPressNext(item)}
          containerStyle={{
            backgroundColor:
              status == item?.id
                ? colors.buttonBg
                : colors.border,
          }}
          children="Claim My Profile"
          titleStyle={{
            color:
              status == item?.id
                ? colors.white
                : colors.textColor,
          }}
        />
      </TouchableOpacityView>
    )
  }

  return (
    <AppSafeAreaView>
      {isLoading && <AnimationSpinner />}
      <HomeSearchBar
        setStatus={setStatus}
      />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {searchDataInitial &&
          <FlatList
            data={searchDoctors}
            keyExtractor={item => item?.id?.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainerStyle}
            ListEmptyComponent={() => (
              <ListEmptyComponent title={"Doctor"}/>
            )}
          />
        }
      </View>
      <TouchableOpacityView
        onPress={() => handleNavigation()}
        style={styles.addContainer}
      >
        <AppText style={styles.add} color={WHITE} type={THIRTY}>
          +
        </AppText>
      </TouchableOpacityView>
    </AppSafeAreaView>
  );
};

export default ClaimProfile;
