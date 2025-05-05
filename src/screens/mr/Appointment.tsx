/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  BUTTON_BG,
  TWENTY,
  Toolbar,
} from "../../common";
import { SceneMap, TabView } from "react-native-tab-view";
import { FlatList, RefreshControl, View } from "react-native";
import { colors } from "../../theme/colors";
import { styles } from "../../styles/styles";

import { commonStyles } from "../../theme/commonStyles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { mrAppointmentType } from "../../slices/mrSlice/mrAction";
import { useIsFocused } from "@react-navigation/native";
import { AnimationSpinner } from "../../animation";
import {
  SectionListhangeMrTabScreen,
  setAppointmentType,
  setLoading,
} from "../../slices/mrSlice/mrSlice";
import LottieView from "lottie-react-native";
import { noResult } from "../../helper/ImageAssets";
import { RenderTabBar } from "../common/RenderTabBar";
import { DoctorBox } from "./Home/components/doctorBox";

export const ListEmptyComponent = ({ title }) => {
  const { isLoading } = useAppSelector((state) => {
    return state.mr;
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  return (
    <>
      {!isLoading && show && (
        <>
          <LottieView
            resizeMode="contain"
            style={{ height: 300, width: 300, alignSelf: "center" }}
            source={noResult}
            autoPlay
            loop
          />
          <AppText
            style={{
              alignSelf: "center",
              marginBottom: 30,
              color: colors.bg_one_dark,
            }}
            type={TWENTY}
            color={BUTTON_BG}
          >
            {`No ${title ? title : "Appointments"} Found`}
          </AppText>
        </>
      )}
    </>
  );
};

const Container = ({ featureNo, refreshing, onRefresh, data }) => {
  const { isLoading } = useAppSelector((state) => {
    return state.mr;
  });

  return (
    <View style={styles.mainPadding}>
      {
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => {
            let appointmentAdrress =
              item?.AppointmentTimeSlot?.timeSlotLocation[0]?.doctorAddress
                ?.pincode !== null &&
              item?.AppointmentTimeSlot?.timeSlotLocation[0]?.doctorAddress
                ?.pincode !== undefined
                ? item?.AppointmentTimeSlot?.timeSlotLocation[0]?.doctorAddress
                : item?.doctorAddress;

            return <DoctorBox item={item} featureNo={featureNo} />;
          }}
          keyExtractor={(item) => item?.id}
          ListEmptyComponent={
            isLoading ? <AnimationSpinner /> : ListEmptyComponent
          }
          contentContainerStyle={[commonStyles.flexGrow, { paddingBottom: 10 }]}
        />
      }
    </View>
  );
};

const Appointment = ({ route }) => {
  const dispatch = useAppDispatch();
  const { changeMrTabScreen } = useAppSelector((state) => {
    return state.mr;
  });

  const [index, setIndex] = React.useState(0);

  let focus = useIsFocused();

  useEffect(() => {
    if (!focus) {
    } else {
      setIndex(changeMrTabScreen);
    }
  }, [changeMrTabScreen, focus]);

  useEffect(() => {
    return () => dispatch(SectionListhangeMrTabScreen(0));
  }, []);

  useEffect(() => {
    dispatch(SectionListhangeMrTabScreen(index));
    setIndex(index);
  }, [index]);

  const [routes] = React.useState([
    { key: "pending", title: "Pending" },
    { key: "ongoing", title: "Ongoing" },
    { key: "completed", title: "Completed" },
    { key: "rejected", title: "Rejected" },
    // { key: "refund", title: "Refunded" }
  ]);

  const {
    isLoading,
    appointmentType,
    ongoingAppointmentType,
    completedAppointmentType,
    rejectedAppointmentType,
    refundAppointmentType,
  } = useAppSelector((state) => {
    return state.mr;
  });

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setAppointmentType([]));

    const value =
      index === 0
        ? "Pending"
        : index === 1
        ? "Ongoing"
        : index === 2
        ? "Completed"
        : "Rejected";
    // :  index === 3
    // ? "Rejected"
    // : "Refund Request" ;
    dispatch(mrAppointmentType(value));
  }, [index]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    const value =
      index === 0
        ? "Pending"
        : index === 1
        ? "Ongoing"
        : index === 2
        ? "Completed"
        : "Rejected";
    // :  index === 3
    // ? "Rejected"
    // : "Refund Request" ;
    dispatch(mrAppointmentType(value));
  };

// pending =9
// onGoing= 8
// completed= 11
// rejected=13
// refund=12

  const renderScene = SceneMap({
    pending: () => (
      <Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        featureNo={9}
        data={appointmentType}
        num={0}
        type={"Pending"}
      />
    ),
    ongoing: () => (
      <Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        featureNo={8}
        data={ongoingAppointmentType}
        num={1}
        type={"Ongoing"}
      />
    ),
    completed: () => (
      <Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        featureNo={11}
        data={completedAppointmentType}
        num={2}
        type={"Completed"}
      />
    ),
    rejected: () => (
      <Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        index={index}
        featureNo={13}
        data={rejectedAppointmentType}
        num={3}
        type={"Rejected"}
      />
    ),
    // refund: () => (
    //   <Container
    //     refreshing={refreshing}
    //     onRefresh={onRefresh}
    //     featureNo={12}
    //     data={refundAppointmentType}
    //     num={4}
    //     type={"Refund"}
    //   />
    // )
  });
  return (
    <>
      <AppSafeAreaView style={{ backgroundColor: colors.white }}>
        <Toolbar title="My Appointments" />
        <View style={styles.main}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={(props) => (
              <RenderTabBar {...props} scrollEnabled={true} />
            )}
            onIndexChange={setIndex}
          />
        </View>
      </AppSafeAreaView>
    </>
  );
};

export default Appointment;
