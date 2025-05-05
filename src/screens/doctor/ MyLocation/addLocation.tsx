import React, { useCallback, useState } from "react";
import { View, FlatList, ActivityIndicator, Image } from "react-native";
import {
  AppSafeAreaView,
  AppText,
  Button,
  Input,
  NORMAL,
  SEMI_BOLD,
  TEN,
  Toolbar,
} from "../../../common";
import {
  Cross_icon,
  close_ic,
  location_Icon,
} from "../../../helper/ImageAssets";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addLocation, getLocation } from "../../../slices/drSlice/drAction";
import KeyBoardAware from "../../../common/KeyboardAware";
import Toast from "react-native-simple-toast";
import {
  btnTitle,
  GOOGL_API,
  label,
  messages,
  placeHolderText,
  titleText,
} from "../../../helper/Constants";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { styles } from "./styles";
import { colors } from "../../../theme/colors";
import { showError } from "../../../helper/logger";
import { AnimationSpinner } from "../../../animation";

const AddLocation = () => {
  const dispatch = useAppDispatch();

  const { isLoading, drEditProfile } = useAppSelector((state) => state.doctor);

  const [arrLocation, setArrLocation] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [isSelectLoader, setIsSelectLoader] = useState(false);

  const [state, setState] = useState({
    address: "",
    city: "",
    addressState: "",
    pinCode: "",
    phoneNo: "",
    landlineNo: "",
    email: "",
    website: "",
    hospitalName: "",
    lng: "",
    lat: "",
  });

  const onSubmit = () => {
    if (state?.hospitalName == "") {
      Toast.show(messages.hospitalNameRequired, Toast.LONG);
    } else if (state.address == "") {
      Toast.show(messages.streetAddressRequired, Toast.LONG);
    } else if (state.city == "") {
      Toast.show(messages.cityRequired, Toast.LONG);
    } else if (state.addressState == "") {
      Toast.show(messages.stateRequired, Toast.LONG);
    } else if (state.pinCode == "") {
      Toast.show(messages.pinCodeRequired, Toast.LONG);
    } else {
      let data = {
        hospitalName: state?.hospitalName,
        address: state?.address,
        city: state?.city,
        pincode: state?.pinCode,
        state: state?.addressState,
        latitude: state?.lat,
        longitude: state?.lng,
      };

      dispatch(addLocation(data, drEditProfile?.spec_detail[0]?.user_id));
    }
  };

  const handler = useCallback(
    (value?: string) => getLocation(value, setSearchLoader, setArrLocation),
    []
  );

  const onSelectAddress = async (dat?: any) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${dat.place_id}&key=${GOOGL_API}`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      setIsSelectLoader(true);
      if (response.ok) {
        const data = await response.json();
        setArrLocation([]);

        let tempstreetone = "";
        let tempstreettwo = "";
        let tempstreetthree = "";
        for (const component of data.result.address_components) {
          const componentType = component.types[0];

          switch (componentType) {
            case "premise":
              setState((prev) => ({
                ...prev,
                hospitalName: component.short_name,
              }));
              break;
            case "postal_code":
              setState((prev) => ({ ...prev, pinCode: component.short_name }));
              break;
            case "administrative_area_level_1":
              setState((prev) => ({
                ...prev,
                addressState: component.long_name,
              }));
              break;
            case "locality":
              setState((prev) => ({ ...prev, city: component.long_name }));
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

        setState((prev) => ({
          ...prev,
          address:
            `${tempstreetone} ${tempstreettwo} ${tempstreetthree}`.trim(),
          lat: data?.result?.geometry?.location?.lat,
          lng: data?.result?.geometry?.location?.lng,
        }));
        setIsSelectLoader(false);
      } else {
        console.error("Failed to fetch place details:", response.statusText);
        showError(response.statusText);
        setIsSelectLoader(false);
      }
    } catch (error) {
      showError(error);
      console.error("Error fetching place details:", error);
    }
  };

  const RenderLocationList = ({ item, index }) => {
    return (
      <TouchableOpacityView
        onPress={() => onSelectAddress(item)}
        key={index}
        style={styles.locationListContainer}
      >
        <AppText weight={SEMI_BOLD} type={TEN}>
          {item?.description}
        </AppText>
      </TouchableOpacityView>
    );
  };

  return (
    <AppSafeAreaView style={{ backgroundColor: colors.white }}>
      {isSelectLoader && <AnimationSpinner />}
      <Toolbar title={titleText.addLocation} />
      <KeyBoardAware>
        <View style={styles.addLocationContainerStyle}>
          <Input
            required
            title={`${label.hospitalName}`}
            value={state.hospitalName}
            icon={location_Icon}
            placeholder={placeHolderText.hospitalName}
            onChangeText={(text) => {
              handler(text);
              setState((prev) => ({ ...prev, hospitalName: text }));
            }}
          />
          {searchLoader ? (
            <ActivityIndicator size={"small"} color={colors.buttonBg} />
          ) : (
            arrLocation.length > 0 &&
            arrLocation && (
              <View style={styles.locationList}>
                {arrLocation?.map((item, index) => (
                  <>
                    <RenderLocationList item={item} index={index} />
                    <View style={styles.itemSepratorContainer} />
                  </>
                ))}
                <TouchableOpacityView
                  onPress={() => setArrLocation([])}
                  style={styles.cancelBtnStyle}
                >
                  <Image
                    source={Cross_icon}
                    style={styles.crossIconStyle}
                    tintColor={colors.buttonBg}
                  />
                </TouchableOpacityView>
              </View>
            )
          )}
          <Input
            required
            title={label.address}
            value={state.address}
            icon={location_Icon}
            placeholder={placeHolderText.address}
            onChangeText={(value) =>
              setState((prev) => ({ ...prev, address: value }))
            }
          />
          <Input
            required
            title={label.city}
            value={state.city}
            icon={location_Icon}
            placeholder={placeHolderText?.city}
            onChangeText={(value) =>
              setState((prev) => ({ ...prev, city: value }))
            }
          />
          <Input
            required
            title={label.state}
            value={state.addressState}
            icon={location_Icon}
            placeholder={placeHolderText.state}
            onChangeText={(value) =>
              setState((prev) => ({ ...prev, addressState: value }))
            }
          />
          <Input
            required
            title={label.pinCode}
            value={state.pinCode}
            icon={location_Icon}
            placeholder={placeHolderText.pinCode}
            keyboardType={"numeric"}
            maxLength={6}
            onChangeText={(value) =>
              setState((prev) => ({ ...prev, pinCode: value }))
            }
           
          />
        </View>
        <Button
          children={btnTitle.submit}
          onPress={() => onSubmit()}
          loading={isLoading}
          containerStyle={{ marginVertical: 20 }}
        />
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default AddLocation;
