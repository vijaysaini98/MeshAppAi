import React, { useEffect, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  BUTTON_BG,
  FOURTEEN,
  MEDIUM,
  TWENTY,
  Toolbar,
} from "../../common";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { FlatList, Image, RefreshControl, View } from "react-native";
import { colors } from "../../theme/colors";
import { styles } from "../../styles/styles";
import { commonStyles } from "../../theme/commonStyles";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { doctorAppointmentType } from "../../slices/drSlice/drAction";
import { AnimationSpinner } from "../../animation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAppointmentProductData, setProductModal } from "../../slices/drSlice/drSlice";
import LottieView from "lottie-react-native";
import { DummyMr, noResult } from "../../helper/ImageAssets";
import { DoctorBox } from "./Home/components/doctorBox";
import TouchableOpacityView from "../../common/TouchableOpacityView";
import { IMAGE_PATH1 } from "../../helper/Constants";
import { RenderTabBar } from "../common/RenderTabBar";

export const ListEmptyComponent = ({ title }) => {
  const { isLoading } = useAppSelector((state) => {
    return state.doctor;
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 700);
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

const Container = ({ featureNo, refreshing, onRefresh, data, featureType }) => {
  const dispatch = useAppDispatch()
  const { isLoading , isProductModalVisible} = useSelector((state) => {
    return state.doctor;
  });

  return (
    <>
      {
        <View style={styles.mainPadding}>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data}
            renderItem={({ item, index }) => (
              <DoctorBox
                item={item}
                featureNo={featureNo}
                index={index}
                featureType={featureType}
              />
            )}
            keyExtractor={(item) => item?.id}
            ListEmptyComponent={
              isLoading ? <AnimationSpinner /> : ListEmptyComponent
            }
            contentContainerStyle={commonStyles.flexGrow}
          />
          
        </View>
      }
    </>
  );
};


// export const RenderTabBar = (props) => {
//   return (
//     <TabBar
//       {...props}
//       renderLabel={({ route, focused }) => (
//         <AppText
//           type={FOURTEEN}
//           style={
//             focused
//               ? {
//                   color: colors.buttonBg,
//                 }
//               : { color: colors.second_text }
//           }
//         >
//           {route.title}
//         </AppText>
//       )}
//       indicatorStyle={{ backgroundColor: colors.buttonBg }}
//       scrollEnabled={true}
//       tabStyle={[{ marginTop: 20 }, props.tabStyle]}
//       pressColor={colors.transparent}
//       style={[styles.tabbar, props.style]}
//     />
//   );
// };

const DoctorAppointment = () => {
  const dispatch = useDispatch();
  let focus = useIsFocused();
  const [index, setIndex] = React.useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [routes] = React.useState([
    { key: "pending", title: "Pending" },
    { key: "ongoing", title: "Ongoing" },
    { key: "upcoming", title: "Upcoming" },
    { key: "completed", title: "Completed" },
    { key: "rejected", title: "Rejected" },
    // { key: "refund", title: "Refunded" },
  ]);

  const {
    changeDrTabScreen,
    pendingAppointmentType,
    upcomingAppointmentType,
    completedAppointmentType,
    rejectedAppointmentType,
    ongoingAppointmentType,
    isProductModalVisible
  } = useAppSelector((state) => {
    return state.doctor;
  });

  useEffect(() => {
    if (changeDrTabScreen || changeDrTabScreen == 0) {
      setIndex(changeDrTabScreen);
    }
  }, [changeDrTabScreen, focus]);

  useEffect(() => {
    // dispatch(setLoading(true));
    const value =
      index === 0
        ? "Pending"
        : index === 1
        ? "Ongoing"
        : index === 2
        ? "Upcoming"
        : index === 3
        ? "Completed"
        : "Rejected";
    // :  index === 4
    // ? "Rejected"
    // : "Refund Request" ;
    
    dispatch(doctorAppointmentType(value));
  }, [index, focus]);

  const onRefresh = () => {
    const value =
      index === 0
        ? "Pending"
        : index === 1
        ? "Ongoing"
        : index === 2
        ? "Upcoming"
        : index === 3
        ? "Completed"
        : "Rejected";
    // :  index === 4
    // ? "Rejected"
    // : "Refund Request" ;
    dispatch(doctorAppointmentType(value));
  };

  const renderScene = SceneMap({
    pending: () => (
      <Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        featureNo={14}
        data={pendingAppointmentType}
        featureType={"pending"}
      />
    ),
    ongoing: () => (
      <Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        featureNo={16}
        data={ongoingAppointmentType}
        featureType={"ongoing"}
      />
    ),
    upcoming: () => (
      <Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        featureNo={11}
        data={upcomingAppointmentType}
        featureType={"upcoming"}
      />
    ),
    completed: () => (
      <Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        featureNo={2}
        data={completedAppointmentType}
        index={index}
        featureType={"completed"}
      />
    ),
    rejected: () => (
      <Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        featureNo={2}
        data={rejectedAppointmentType}
        featureType={"rejected"}
      />
    ),
    //  refund: () => (
    //   <Container
    //     refreshing={refreshing}
    //     onRefresh={onRefresh}
    //     featureNo={15}
    //     data={refundAppointmentType}
    //     num={4}
    //     featureType={"refund"}
    //   />
    // ),
  });

  const handleClose = () =>{
    dispatch(setProductModal(false))
    dispatch(setAppointmentProductData([]))
  }

  return (
    <>
      {/* {isLoading && <AnimationSpinner />} */}
      <AppSafeAreaView style={{ backgroundColor: colors.white }}>
        <Toolbar title="My Appointments" noBack />
        <View style={styles.main}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={(props) => (
              <RenderTabBar {...props} scrollEnabled={true} index={index} />
            )}
            onIndexChange={setIndex}
          />
        </View>
        {/* <ProductModal
          isModalVisible={isProductModalVisible}
          onClose={()=> handleClose()}
          // data={productData}
          /> */}
      </AppSafeAreaView>
    </>
  );
};

export default DoctorAppointment;
