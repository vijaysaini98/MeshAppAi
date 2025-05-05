import React, { useEffect, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  BUTTON_BG,
  EIGHTEEN,
  FOURTEEN,
  MEDIUM,
  SIXTEEN,
  Toolbar,
} from "../../../common";
import { FlatList, Image, RefreshControl, View } from "react-native";
import LottieView from "lottie-react-native";
import DeleteConfirmationModal from "../../common/deleteConfirmationModal";
import { CLINIC_REQUST } from "../../../navigation/routes";
import NavigationService from "../../../navigation/NavigationService";
import { AnimationSpinner } from "../../../animation";
import { colors } from "../../../theme/colors";
import {
  delete_icon,
  location_Icon,
  noResult,
} from "../../../helper/ImageAssets";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  deleteclinicRequest,
  getClinicList,
} from "../../../slices/drSlice/drAction";

export const ListEmptyComponent = ({ title }) => {
  return (
    <>
      <LottieView
        resizeMode="contain"
        style={styles.emptyContainerStyle}
        source={noResult}
        autoPlay
        loop
      />
      <AppText style={styles.emptyTextStyle} type={FOURTEEN} color={BUTTON_BG}>
        {title}
      </AppText>
    </>
  );
};

const Clinic = () => {
  const dispatch = useAppDispatch();

  const { clinicList, clinicRequestCount, isLoading, isRefreshingLoading } =
    useAppSelector((state) => state?.doctor);

  const [showModal, setShowModal] = useState(false);
  const [deleteClinic, setDeleteClinic] = useState({});

  useEffect(() => {
    dispatch(getClinicList(isLoading));
  }, []);

  const handleDeleteClinicRequest = () => {
    let apiData = {
      clinic_id: deleteClinic?.clinic_id,
      id: deleteClinic?.id,
    };
    dispatch(deleteclinicRequest(apiData, onSuccess()));
  };

  const onSuccess = () => {
    setShowModal(false);
  };

  const onRefresh = () => {
    dispatch(getClinicList(undefined, isRefreshingLoading));
  };

  const renderItem = ({ item, index }) => {
    let address = `${item?.clinic_list[0]?.street_address}, ${item?.clinic_list[0]?.city}, ${item?.clinic_list[0]?.state}, ${item?.clinic_list[0]?.zipcode}`;

    return (
      <View style={styles.card} key={index}>
        <View style={styles.infoContainer}>
          <AppText weight={MEDIUM} type={SIXTEEN}>
            {item?.clinic_list[0]?.clinic_name}
          </AppText>
          <View style={styles.addressContainer}>
            <Image
              source={location_Icon}
              style={styles.iconStyle}
              resizeMode="contain"
              tintColor={colors.black}
            />
            <AppText type={FOURTEEN} style={styles.address}>
              {address}
            </AppText>
          </View>
        </View>
        <TouchableOpacityView
          style={styles.deleteButton}
          onPress={() => {
            setDeleteClinic({
              clinic_id: item?.clinic_id,
              id: item?.id,
            });
            setShowModal(true);
          }}
        >
          <Image
            source={delete_icon}
            style={styles.iconStyle}
            resizeMode="contain"
            tintColor={colors.buttonBg}
          />
        </TouchableOpacityView>
      </View>
    );
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView style={styles.mainContainer}>
        <Toolbar title="Clinic" />
        {clinicRequestCount > 0 && (
          <View style={styles.headerContainer}>
            <AppText type={SIXTEEN} weight={BOLD}>
              {"Clinic Request"}
              <AppText
                type={EIGHTEEN}
                weight={BOLD}
                style={styles.reqCountText}
              >
                {` ${clinicRequestCount}`}
              </AppText>
            </AppText>
            <TouchableOpacityView
              onPress={() => {
                NavigationService.navigate(CLINIC_REQUST);
              }}
            >
              <AppText type={SIXTEEN} weight={BOLD} style={styles.seeAllText}>
                {" See all"}
              </AppText>
            </TouchableOpacityView>
          </View>
        )}
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefreshingLoading}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          data={clinicList}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
          style={{ marginTop: 20, paddingHorizontal: 20 }}
          contentContainerStyle={{ paddingBottom: 50, gap: 20 }}
          ListEmptyComponent={() => <ListEmptyComponent title={"No Clinic"} />}
        />
        <DeleteConfirmationModal
          visible={showModal}
          onDelete={() => handleDeleteClinicRequest()}
          confirmationText={"Are you sure?\nyou want to Delete this Clinic?"}
          onCancel={() => {
            setShowModal(false);
            setDeleteClinic({});
          }}
          buttonTitle={"Delete"}
        />
      </AppSafeAreaView>
    </>
  );
};

export default Clinic;
