import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  Button,
  BUTTON_BG,
  EIGHTEEN,
  FOURTEEN,
  Input,
  MEDIUM,
  THIRTEEN,
  Toolbar,
  TWENTY,
  WHITE,
} from "../../common";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import {
  DummyDoctor,
  locationIcon,
  noResult,
  searchIcon,
} from "../../helper/ImageAssets";
import TouchableOpacityView from "../../common/TouchableOpacityView";
import { IMAGE_PATH1, placeHolderText } from "../../helper/Constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useIsFocused } from "@react-navigation/native";
import { mrNearByDoctor } from "../../slices/mrSlice/mrAction";
import NavigationService from "../../navigation/NavigationService";
import {
  DOCTOR_PROFILE_SCREEN,
  REQUEST_APPOINTMENT_SCREEN,
} from "../../navigation/routes";
import { AnimationSpinner } from "../../animation";
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingVertical,
} from "../../theme/dimens";
import { colors } from "../../theme/colors";
import { getStatus } from "../../helper/utility";
import LottieView from "lottie-react-native";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
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

type NearByCardProps = {
  item: any;
  index: number;
  handleOnPressBox: () => void;
  handleRequestOnPress: () => void;
};

const HomeSearchBar = ({ value, onChangeText }: InputProps) => {
  return (
    <View>
      <View style={styles.searchContainer}>
        <Input
          placeholder={placeHolderText.search}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          returnKeyType="done"
          mainContainer={styles.searchInput}
          icon2={searchIcon}
        />
      </View>
    </View>
  );
};

export const UserDetailCard = ({
  profileImage,
  name,
  speciality,
  showFullAddress,
  address,
  availability,
  handleViewMoreBtn,
  status,
  type,
}: UserDetailCardProps) => {
  return (
    <View style={styles.containerStyle}>
      <Image
        source={profileImage}
        resizeMode="cover"
        style={styles.profileImageStyle}
      />
      <View style={{ flex: 1 }}>
        <AppText type={TWENTY} weight={MEDIUM} numberOfLines={1}>
          {name}
        </AppText>

        <View style={styles.secondContainerStyle}>
          <View style={styles.specializationStyle}>
            <AppText color={WHITE}>{speciality}</AppText>
          </View>
          {status && (
            <View style={styles.statusContainer}>
              <AppText color={WHITE}>
                {type != "Rejected" ? getStatus(status) : status}
              </AppText>
            </View>
          )}
        </View>
        {address && (
          <View style={styles.locationContainerStyle}>
            <Image
              source={locationIcon}
              resizeMode="contain"
              style={styles.locationIconStyle}
            />
            <View style={{ flexDirection: "row", flex: 1 }}>
              <AppText
                weight={MEDIUM}
                type={FOURTEEN}
                style={{ flex: 1 }}
                numberOfLines={showFullAddress ? 0 : 2}
              >
                {address}
              </AppText>
              {address?.length >= 60 && (
                <AppText
                  weight={BOLD}
                  style={styles.showMoreTextStyle}
                  onPress={handleViewMoreBtn}
                >
                  {showFullAddress ? "less" : "more"}
                </AppText>
              )}
            </View>
          </View>
        )}
        {availability && (
          <AppText
            style={{
              marginTop: 10,
              color: colors.buttonBg,
            }}
            type={THIRTEEN}
            weight={MEDIUM}
          >{`Not Available`}</AppText>
        )}
      </View>
    </View>
  );
};

export const NearByCard = ({
  item,
  index,
  handleOnPressBox,
  handleRequestOnPress,
}: NearByCardProps) => {
  const [showFullAddress, setShowFullAddress] = useState(false);

  const address = `${item?.address?.address},${item?.address?.city},${item?.address?.state}`;

  return (
    <TouchableOpacityView
      onPress={handleOnPressBox}
      key={item?.id}
      style={styles.cardMainContainerStyle(
        item?.rn_number?.availability == 1 ||
          item?.doctor_details?.availability == 1
      )}
    >
      <UserDetailCard
        item={item}
        profileImage={
          item?.user_details?.avatar
            ? {
                uri: IMAGE_PATH1 + item?.user_details?.avatar,
              }
            : item?.avatar
            ? {
                uri: IMAGE_PATH1 + item?.avatar,
              }
            : DummyDoctor
        }
        name={item?.name ? item?.name : item?.user_details?.name}
        address={item?.address?.address != null ? address : false}
        speciality={
          item?.doctor_speciality
            ? item?.doctor_speciality[0]?.specialization
            : item?.spec_details[0]?.speciality?.specialization
        }
        availability={
          item?.rn_number?.availability == 0 ||
          item?.doctor_details?.availability == 0
        }
        showFullAddress={showFullAddress}
        handleViewMore={() => setShowFullAddress(!showFullAddress)}
      />
      <Button
        onPress={handleRequestOnPress}
        children="Request An Appointment"
      />
    </TouchableOpacityView>
  );
};

let LIMIT = 10;
const DoctorList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { isLoading, nearByDoctor } = useAppSelector((state) => state.mr);

  const timeout: any = useRef(null);

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (isFocused) {
      fetchDoctors(1);
    }
  }, [isFocused]);

  const fetchDoctors = useCallback(
    (
      pageNumber?: number,
      value?: string | undefined,
      isRefreshing?: boolean
    ) => {
      if (isRefreshing) {
        setValue("");
      }
      const limt = pageNumber * LIMIT;
      dispatch(mrNearByDoctor(limt, value));
    },
    [dispatch, page]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDoctors(1, undefined, true);
    setPage(1);
    setTimeout(() => setRefreshing(false), 1000);
  }, [fetchDoctors]);

  const onPressBox = useCallback((doctor: any) => {
    NavigationService.navigate(DOCTOR_PROFILE_SCREEN, { data: doctor });
  }, []);

  const onPressRequest = useCallback((doctor: any) => {
    NavigationService.navigate(REQUEST_APPOINTMENT_SCREEN, { data: doctor });
  }, []);

  const onChangeHandler = (value: string) => {
    setPage(1);
    setValue(value);
    clearTimeout(timeout.current);
    if (value?.trim()) {
      timeout.current = setTimeout(() => {
        dispatch(mrNearByDoctor(page, value));
      }, 500);
    } else {
      dispatch(mrNearByDoctor(null));
    }
  };

  const renderDoctorCard = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <NearByCard
        item={item}
        index={index}
        handleOnPressBox={() => onPressBox(item)}
        handleRequestOnPress={() => onPressRequest(item)}
      />
    ),
    [onPressBox, onPressRequest]
  );

  const loadMoreDoctors = useCallback(() => {
    if (!isFetchingMore) {
      const nextPage = page + 1;
      fetchDoctors(nextPage, value);
      setPage(nextPage);
    }
  }, [fetchDoctors, isFetchingMore, page]);

  const listEmptyContainer = useCallback(() => {
    return (
      <View style={styles.emptyListContainerStyle}>
        <LottieView
          resizeMode="contain"
          style={styles.emptyLottieStyle}
          source={noResult}
          autoPlay
          loop
        />
        <AppText
          style={styles.emptyLottieText}
          type={EIGHTEEN}
          weight={MEDIUM}
          color={BUTTON_BG}
        >
          No Doctor's Found
        </AppText>
      </View>
    );
  }, []);

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView style={{ backgroundColor: colors.white }}>
        <Toolbar title="Doctors Lists" />
        <HomeSearchBar value={value} onChangeText={onChangeHandler} />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={nearByDoctor}
          renderItem={renderDoctorCard}
          contentContainerStyle={styles.listContainerStyle}
          keyExtractor={(item) => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreDoctors}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingMore && <AnimationSpinner />}
          ListEmptyComponent={listEmptyContainer}
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
  },
  searchInput: {
    flex: 1,
  },
  listContainerStyle: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingHorizontal: universalPaddingHorizontal,
    paddingBottom: 10,
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
    flexDirection: "row",
    gap: 10,
  },
  profileImageStyle: {
    height: 115,
    width: 110,
    borderRadius: 8,
  },
  secondContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 5,
  },
  specializationStyle: {
    backgroundColor: colors.buttonBg,
    borderRadius: 20,
    paddingHorizontal: universalPaddingVertical,
    paddingVertical: 5,
    marginTop: 10,
  },
  locationContainerStyle: {
    flexDirection: "row",
    marginTop: 10,
    gap: 5,
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
    textAlign: "left",
    alignSelf: "flex-end",
    color: colors.buttonBg,
    flex: 0.2,
  },
  emptyListContainerStyle: {
    flex: 1,
    alignItems: "center",
  },
  emptyLottieStyle: {
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  emptyLottieText: {
    alignSelf: "center",
    marginBottom: 30,
    color: colors.bg_one_dark,
  },
});
