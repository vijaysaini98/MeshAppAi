import React, { useEffect, useRef, useState } from "react";
import { AppSafeAreaView, AppText, BOLD, Button, FOURTEEN, Input, MEDIUM, THIRTEEN, Toolbar, TWENTY, WHITE } from "../../common";
import { FlatList, Image, RefreshControl, StyleSheet, View } from "react-native";
import { DummyDoctor, locationIcon, searchIcon } from "../../helper/ImageAssets";
import TouchableOpacityView from "../../common/TouchableOpacityView";
import { IMAGE_PATH1, placeHolderText } from "../../helper/Constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useIsFocused } from "@react-navigation/native";
import { mrNearByDoctor } from "../../slices/mrSlice/mrAction";
import NavigationService from "../../navigation/NavigationService";
import { DOCTOR_PROFILE_SCREEN, REQUEST_APPOINTMENT_SCREEN } from "../../navigation/routes";
import { AnimationSpinner } from "../../animation";
import { borderWidth, universalPaddingHorizontal, universalPaddingVertical } from "../../theme/dimens";
import { colors } from "../../theme/colors";
import { getStatus } from "../../helper/utility";

const HomeSearchBar = () => {
  const [value, setValue] = useState<string>("");

  const timeout: any = useRef(null);
  const dispatch = useAppDispatch();


  const onChangeHandler = (value: string) => {
    setValue(value);
    // handler(value)
    clearTimeout(timeout.current);
    if (value?.trim()) {
      timeout.current = setTimeout(() => {
        dispatch(mrNearByDoctor(null, value));
      }, 500);
    } else {
      dispatch(mrNearByDoctor(null));
    }
  };

  return (
    <View>
      <Toolbar title="Doctors Lists" />
      <View style={styles.searchContainer}>
        <Input
          placeholder={placeHolderText.search}
          value={value}
          onChangeText={(text) => onChangeHandler(text)}
          autoCapitalize="none"
          returnKeyType="done"
          mainContainer={styles.searchInput}
          icon2={searchIcon}
        />
      </View>
    </View>
  );
};


interface UserDetailCardProps {
  profileImage: string;
  name: string;
  speciality: string | string[];
  showFullAddress: () => void;
  address: string | boolean;
  availability: number;
  handleViewMoreBtn: () => void;
  status: number;
  type: string;
}

export const UserDetailCard = ({
  profileImage,
  name,
  speciality,
  showFullAddress,
  address,
  availability,
  handleViewMoreBtn,
  status,
  type
}: UserDetailCardProps) => {
  return (
    <View style={styles.containerStyle}>
      <Image
        source={profileImage}
        resizeMode="cover"
        style={styles.profileImageStyle}
      />
      <View
        style={{ flex: 1 }}
      >
        <AppText
          type={TWENTY} weight={MEDIUM} numberOfLines={1}>
          {name}
        </AppText>

        <View style={styles.secondContainerStyle}>
          <View
            style={styles.specializationStyle}
          >
            <AppText color={WHITE}>
              {speciality}
            </AppText>
          </View>
          {status && <View style={styles.statusContainer}>
            <AppText color={WHITE}>{
              type != "Rejected" ?
                getStatus(status) : status}</AppText>
          </View>
          }
        </View>
        {address &&
          ( <View
              style={styles.locationContainerStyle}
            >
              <Image
                source={locationIcon}
                resizeMode="contain"
                style={styles.locationIconStyle}
              />
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <AppText weight={MEDIUM} type={FOURTEEN} style={{ flex: 1 }}
                  numberOfLines={showFullAddress ? 0 : 2}
                >
                  {address}
                </AppText>
                {address?.length >= 60 &&
                  <AppText
                    weight={BOLD}
                    style={styles.showMoreTextStyle}
                    onPress={handleViewMoreBtn}
                  >
                    {showFullAddress ? "less" : "more"}
                  </AppText>
                }
              </View>
            </View>
          )}
        {(availability) &&
          (
          <AppText
              style={{
                marginTop: 10,
                color: colors.buttonBg
              }}
              type={THIRTEEN} weight={MEDIUM} >{`Not Available`}</AppText>
          )
        }
      </View>
    </View>
  )
}


export const NearByCard = ({ item, index, handleOnPressBox, handleRequestOnPress }) => {

  const [showFullAddress, setShowFullAddress] = useState(false);

  const address = `${item?.address?.address},${item?.address?.city},${item?.address?.state}`

  return (
    <TouchableOpacityView
      onPress={handleOnPressBox}
      key={item?.id}
      style={styles.cardMainContainerStyle(item?.rn_number?.availability == 1 || item?.doctor_details?.availability == 1)}
    >
      <UserDetailCard
        item={item}
        profileImage={item?.user_details?.avatar ? {
          uri: IMAGE_PATH1 + item?.user_details?.avatar
        } :
          item?.avatar ? {
            uri: IMAGE_PATH1 + item?.avatar
          }
            :
            DummyDoctor
        }
        name={
          item?.name ? item?.name :
            item?.user_details?.name}
        address={item?.address?.address != null ? address : false}
        speciality={
          item?.doctor_speciality ? item?.doctor_speciality[0]?.specialization :
            item?.spec_details[0]?.speciality?.specialization
        }
        availability={item?.rn_number?.availability == 0 || item?.doctor_details?.availability == 0}
        showFullAddress={showFullAddress}
        handleViewMore={() => setShowFullAddress(!showFullAddress)}
      />
      <Button
        onPress={handleRequestOnPress}
        children="Request An Appointment"
      />
    </TouchableOpacityView>
  );
}


const DoctorList = () => {
  const dispatch = useAppDispatch();
  let focus = useIsFocused();

  const { isLoading, nearByDoctor, nearByProfile } = useAppSelector((state) => {
    return state.mr;
  });

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (focus) {
      dispatch(mrNearByDoctor(null));
    }
  }, [focus]);


  const onRefresh = () => {
    dispatch(mrNearByDoctor(null));
  };

  const onPressBox = (e) => {
    NavigationService.navigate(DOCTOR_PROFILE_SCREEN, { data: e });
  };

  const onPressRequest = (item) => {
    NavigationService.navigate(REQUEST_APPOINTMENT_SCREEN, { data: item });
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}

      <AppSafeAreaView style={{ backgroundColor: colors.white }}>
        <HomeSearchBar />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={nearByDoctor[0]?.near_by_doctor ? nearByDoctor[0]?.near_by_doctor : nearByDoctor}
          renderItem={({ item, index }) => (
            <NearByCard
              item={item}
              index={index}
              handleOnPressBox={() => onPressBox(item)}
              handleRequestOnPress={() => onPressRequest(item)}
            />
          )}
          contentContainerStyle={styles.listContainerStyle}
          keyExtractor={(item) => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
        />
      </AppSafeAreaView>
    </>
  );
};

export default DoctorList;


const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.mainBg,
    paddingHorizontal: universalPaddingHorizontal,
    // paddingTop: 10,
  },
  searchInput: {
    flex: 1,
    // marginEnd: 5,
  },
  listContainerStyle: {
    // paddingTop:10,
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingHorizontal: universalPaddingHorizontal,
    paddingBottom: 10
  },
  cardMainContainerStyle: (availability: boolean): object => ({
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: borderWidth,
    borderColor: availability ? colors.bordeColor1 : colors.border,
    borderRadius: 6,
    marginTop: 10,
    gap: 10,
  }),
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    gap: 10
  },
  profileImageStyle: {
    height: 115,
    width: 110,
    borderRadius: 8,
  },
  secondContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    gap: 5
  },
  specializationStyle: {
    backgroundColor: colors.buttonBg,
    borderRadius: 20,
    paddingHorizontal: universalPaddingVertical,
    paddingVertical: 5,
    marginTop: 10,
  },
  locationContainerStyle: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 5
  },
  locationIconStyle: {
    height: 18,
    width: 18,
  },
  statusContainer: {
    backgroundColor: colors.loader,
    borderRadius: 20,
    paddingHorizontal: universalPaddingVertical,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginLeft: 8,
  },
  showMoreTextStyle: {
    textAlign: 'left',
    alignSelf: 'flex-end',
    color: colors.buttonBg,
    flex: 0.2
  }
})