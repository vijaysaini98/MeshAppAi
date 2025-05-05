import React, { useEffect, useState } from "react";
import { AppSafeAreaView, Toolbar } from "../../common";
import { FlatList, RefreshControl, View } from "react-native";
import { styles } from "../../styles/styles";
import { DoctorBox } from "../mr/Home/Home";
import { ListEmptyComponent } from "./Appointment";
import { commonStyles } from "../../theme/commonStyles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { mrAppointmentType } from "../../slices/mrSlice/mrAction";
import { AnimationSpinner } from "../../animation";

const UpcomingAppointment = () => {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(mrAppointmentType("Upcoming"));
  }, []);

  const onRefresh = () => {
    dispatch(mrAppointmentType("Upcoming"));
  };

  const { isLoading, upcomingAppointmentType,ongoingAppointmentType } = useAppSelector((state) => {
    return state.mr;
  });

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView>
        <Toolbar title="Upcoming Appointments" />
        <View style={styles.mainPadding}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={upcomingAppointmentType}
            renderItem={({ item }) => {
              return <DoctorBox item={item} featureNo={6} />;
            }}
            keyExtractor={(item) => item?.id}
            ListEmptyComponent={ListEmptyComponent}
            contentContainerStyle={commonStyles.flexGrow}
            style={{ marginTop: 20 }}
          />
        </View>
      </AppSafeAreaView>
    </>
  );
};

export default UpcomingAppointment;
