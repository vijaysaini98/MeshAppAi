import { View, FlatList } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import { AppSafeAreaView, AppText, Toolbar } from "../../../common";
import {
  blueNotify,
  greenNotify,
  redNotify,
} from "../../../helper/ImageAssets";
;

import { MEDIUM, THIRTEEN, NINETEEN } from "../../../common/AppText";
import { notificationListing } from "../../../slices/mrSlice/mrAction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import moment from "moment";
const Notification = () => {
  const dispatch = useAppDispatch();
  const Data = [
    {
      id: "1",
      heading: "Schedule Changes",
      date: "Today 14:30",
      content:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry gsgsdgdd djjkldfalksgk.",
      image: blueNotify,
    },
    {
      id: "2",
      heading: "Booking Success",
      date: "Today 14:30",
      content:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry gsgsdgdd djjkldfalksgk.",

      image: greenNotify,
    },
    {
      id: "3",
      heading: "Booking Cancel",
      date: "Today 14:30",
      content:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry gsgsdgdd djjkldfalksgk.",

      image: redNotify,
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={styles.mainView}>
        <View style={styles.imgView}>
          {/* <Image
            resizeMode="contain"
            style={styles.imageStyles}
            source={greenNotify}
          /> */}
        </View>
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

  useEffect(() => {
    dispatch(notificationListing());
  }, []);

  const { notificationListingData } = useAppSelector((state) => {
    return state.mr;
  });

  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <Toolbar title="Notifications" />
      <FlatList 
      data={notificationListingData} 
      renderItem={renderItem} 
      keyExtractor={(item) => item?.id?.toString()} 
      />
    </AppSafeAreaView>
  );
};

export default Notification;
