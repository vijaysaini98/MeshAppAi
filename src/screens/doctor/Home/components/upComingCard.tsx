import { ImageBackground, StyleSheet, View } from "react-native";
import TouchableOpacityView from "../../../../common/TouchableOpacityView";
import { upcoming } from "../../../../helper/ImageAssets";
import {
  AppText,
  BOLD,
  EIGHTEEN,
  THIRTY_EIGHT,
  WHITE,
} from "../../../../common";
import { Screen } from "../../../../theme/dimens";
import { FC } from "react";

export const UpcomingAndEaringCard: FC<{
  totalUpcoming: number;
  handleUpcoming: () => void;
}> = ({ totalUpcoming, handleUpcoming }) => {
  return (
    <View style={styles.upcomigToolContainer}>
      <TouchableOpacityView
        onPress={handleUpcoming}
        style={[styles.appointmentSingle]}
      >
        <ImageBackground
          source={upcoming}
          style={styles.upcomingImage}
          resizeMode="stretch"
        >
          <AppText type={THIRTY_EIGHT} weight={BOLD} color={WHITE}>
            {totalUpcoming <= 9 ? `${totalUpcoming}` : totalUpcoming}
          </AppText>
          <AppText type={EIGHTEEN} color={WHITE}>
            {"Upcoming\nAppointments"}
          </AppText>
        </ImageBackground>
      </TouchableOpacityView>
    </View>
  );
};

const styles = StyleSheet.create({
  upcomigToolContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  appointmentSingle: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  upcomingImage: {
    height: 170,
    width: Screen.Width - 32,
    marginVertical: 8,
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 8,
    paddingHorizontal: 35,
  },
});
