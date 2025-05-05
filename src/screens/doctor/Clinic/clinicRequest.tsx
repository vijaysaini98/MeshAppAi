import React, { useEffect, useRef, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  EIGHTEEN,
  FOURTEEN,
  MEDIUM,
  SIXTEEN,
  Toolbar,
  WHITE,
} from "../../../common";
import { location_Icon } from "../../../helper/ImageAssets";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../../theme/colors";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  clinicRequestStatus,
  getClinicRequestList,
  getDoctorLocation,
} from "../../../slices/drSlice/drAction";
import { AnimationSpinner } from "../../../animation";
import { ListEmptyComponent } from ".";
import ClinicRequestAcceptSheet from "./ClinicRequestAcceptSheet";
import DeleteConfirmationModal from "../../common/deleteConfirmationModal";

const ClinicRequest = () => {
  const dispatch = useAppDispatch();

  const refSheet = useRef();

  const {  doctorLocations, drEditProfile, clinicRequsetList, isLoading, isRefreshingLoading } = useAppSelector(
    (state) => state?.doctor
  );

  const [locationId,setLocationId]=useState();
  const [requestData,setRequestData] = useState({});
  const [deleteShowModal,setDeleteShowModal] = useState(false);
  const [tempLocationData, setTempLocationData] = useState([]);

  useEffect(() => {
    dispatch(getClinicRequestList(isLoading));
  }, []);


  useEffect(() => {
    if (doctorLocations.length > 0) {
      const formattedLocations = doctorLocations.flatMap((item) =>
        item.doctorLocations.map((location) => ({
          value: item?.id,
          label: `${location?.name}, ${location?.address}, ${location?.city}, ${location?.pincode}, ${location?.state}`,
        }))
      );
      setTempLocationData(formattedLocations);
    }
  }, [doctorLocations]);
  
  useEffect(() => {
    if (drEditProfile?.spec_detail[0]?.user_id) {
      dispatch(getDoctorLocation(drEditProfile?.spec_detail[0]?.user_id));
    }
  }, [drEditProfile?.spec_detail[0]?.user_id]);

  const onRefresh = () => {
    dispatch(getClinicRequestList(undefined, isRefreshingLoading));
  };

  const onAccept = (temp) => {
    let apiData = {
      location_id: locationId,
      clinic_id: requestData?.clinic_id,
      request: true,
      id: requestData?.id,
    };
    dispatch(clinicRequestStatus(apiData,onSuccess));
  };

  const onReject = (temp) => {
    let apiData = {
      clinic_id: requestData?.clinic_id,
      request: false,
      id: requestData?.id,
    };
    dispatch(clinicRequestStatus(apiData,onSuccess));
  };

const onSuccess = () => {
  setRequestData({});
setLocationId(null)
  if (deleteShowModal) {
    setDeleteShowModal(false);
  } else if (refSheet.current?.open) {
    refSheet.current.close();
  }
};

  const renderItem = ({ item, index }) => {
let address = `${item?.clinic_list[0]?.street_address}, ${item?.clinic_list[0]?.city}, ${item?.clinic_list[0]?.state}, ${item?.clinic_list[0]?.zipcode}`

    return (
      <View key={index} style={styles.card}>
        <View style={styles.infoContainer}>
          <AppText type={SIXTEEN} weight={MEDIUM}>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacityView
            style={[styles.button, styles.acceptButton]}
            // onPress={() => onAccept(item)}
            onPress={()=> {
              setRequestData(item)
              refSheet.current.open()}}
          >
            <AppText weight={MEDIUM} type={EIGHTEEN} color={WHITE}>
              Accept
            </AppText>
          </TouchableOpacityView>
          <TouchableOpacityView
            style={[styles.button, styles.rejectButton]}
            // onPress={() => onReject(item)}
            onPress={() => {
              setRequestData(item);
              setDeleteShowModal(true);
            }}
          >
            <AppText weight={MEDIUM} type={EIGHTEEN} color={WHITE}>
              Reject
            </AppText>
          </TouchableOpacityView>
        </View>
      </View>
    );
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView style={styles.mainContainer}>
        <Toolbar title="Clinic Request" />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefreshingLoading}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          data={clinicRequsetList}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
          style={{ marginTop: 20, paddingHorizontal: 20 }}
          contentContainerStyle={{ paddingBottom: 50, gap: 20 }}
          ListEmptyComponent={() => (
            <ListEmptyComponent title={"No Clinic Request"}/>
          )}
        />
      </AppSafeAreaView>
      <ClinicRequestAcceptSheet
      refSheet={refSheet}
      // isLoading={}
      onPressSubmit={()=>onAccept()}
      locationData={tempLocationData}
      locationId={locationId}
      setLocationId={setLocationId}
      />
       <DeleteConfirmationModal
          visible={deleteShowModal}
          onDelete={() => onReject()}
          confirmationText={"Are you sure?\nyou want to Reject this Clinic Request?"}
          onCancel={() => {
            setDeleteShowModal(false);
            setRequestData({});
          }}
          buttonTitle={"Reject"}
        />
    </>
  );
};

export default ClinicRequest;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  emptyContainerStyle: {
    height: 250,
    width: 250,
    alignSelf: "center",
  },
  emptyTextStyle: {
    alignSelf: "center",
    marginBottom: 30,
    color: colors.bg_one_dark,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    // marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 10,
  },
  address: {
    flexWrap: "wrap",
    width: "90%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptButton: {
    backgroundColor: colors.buttonBg,
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: colors.loader,
  },
  iconStyle:{ width: 20, height: 20 }
});
