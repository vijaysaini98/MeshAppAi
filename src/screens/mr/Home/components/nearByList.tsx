import React, { FC } from "react";
import { MrNearByListProps } from "../../../../helper/types";
import NavigationService from "../../../../navigation/NavigationService";
import {
  DOCTOR_LIST_SCREEN,
  DOCTOR_PROFILE_SCREEN,
  REQUEST_APPOINTMENT_SCREEN,
} from "../../../../navigation/routes";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import {
  AppText,
  BUTTON_BG,
  FOURTEEN,
  MEDIUM,
  NINETEEN,
} from "../../../../common";
import { commonStyles } from "../../../../theme/commonStyles";
import { NearByCard } from "../../DoctorList";
import { styles } from "../../../../styles/styles";
import LottieView from "lottie-react-native";
import { noResult } from "../../../../helper/ImageAssets";
import { colors } from "../../../../theme/colors";

export const NearByList: FC<MrNearByListProps> = ({
  refreshing,
  onRefresh,
  data,
}) => {
  const onPressBox = (e: any) => {
    NavigationService.navigate(DOCTOR_PROFILE_SCREEN, { data: e });
  };

  const onPressRequest = (item: any) => {
    NavigationService.navigate(REQUEST_APPOINTMENT_SCREEN, { data: item });
  };

  return (
    <View style={nearListStyle.mainContainer}>
      <View style={[styles.nearByContainer, nearListStyle.secondContainer]}>
        <AppText type={NINETEEN} weight={MEDIUM}>
          Doctor's near by you
        </AppText>
        <AppText
          onPress={() => NavigationService.navigate(DOCTOR_LIST_SCREEN)}
          type={FOURTEEN}
          color={BUTTON_BG}
        >
          See All
        </AppText>
      </View>
      <ScrollView
        style={nearListStyle.containerStyle}
        contentContainerStyle={commonStyles.flexGrow}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {data.length >= 1 ? (
          data?.map((item: any, index: number) => (
            <NearByCard
              key={index}
              item={item}
              index={index}
              handleOnPressBox={() => onPressBox(item)}
              handleRequestOnPress={() => onPressRequest(item)}
            />
          ))
        ) : (
          <>
            <LottieView
              resizeMode="contain"
              style={nearListStyle.emptyLottieStyle}
              source={noResult}
              autoPlay
              loop
            />
            <AppText
              style={nearListStyle.emptyLottieText}
              type={FOURTEEN}
              color={BUTTON_BG}
            >
              No Doctor's Found
            </AppText>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const nearListStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  secondContainer: {
    marginHorizontal: 16,
  },
  containerStyle: {
    marginHorizontal: 16,
    flex: 1,
  },
  emptyLottieStyle: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },
  emptyLottieText: {
    alignSelf: "center",
    marginBottom: 30,
    color: colors.bg_one_dark,
  },
});
