import { View, FlatList } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import { AppSafeAreaView, AppText, Toolbar } from "../../../common";
import { MEDIUM, THIRTEEN, NINETEEN } from "../../../common/AppText";
import { notificationListing } from "../../../slices/mrSlice/mrAction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import moment from "moment";

const Notification = () => {
  const dispatch = useAppDispatch();

  const { notificationListingData } = useAppSelector((state) => {
    return state.mr;
  });

  useEffect(() => {
    dispatch(notificationListing());
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.mainView}>
        <View style={styles.textView}>
          <AppText weight={MEDIUM} type={NINETEEN}>
            {item?.title}
          </AppText>
          <AppText style={styles.dateStyle} type={THIRTEEN}>
            {moment(item?.dateTime).format("DD-MMM-YYYY")}
          </AppText>
          <AppText style={styles.contentStyle} type={THIRTEEN}>
            {item?.message}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <Toolbar title="Notifications" />
      <FlatList 
      data={notificationListingData} 
      showsVerticalScrollIndicator={false}
      renderItem={renderItem} 
      keyExtractor={(item) => item?.id?.toString()} 
      contentContainerStyle={{ gap: 10, marginTop:10, paddingBottom: 50 }}  
      />
    </AppSafeAreaView>
  );
};

export default Notification;
