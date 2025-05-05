import React, { FC, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { AppText, Button, MEDIUM, SIXTEEN, TWENTY_FOUR } from "../../../common";
import {
  starRating,
  star_filled,
  star_unfilled,
} from "../../../helper/ImageAssets";
import TouchableOpacityView from "../../../common/TouchableOpacityView";

interface RatingScreenProps {
  id?: number;
  isModalVisible: boolean;
  setModalVisible?: any;
  defaultRating?: number | undefined;
  setDefaultRating?: any;
  handleRating?: () => void | undefined;
}

const RatingScreen: FC<RatingScreenProps> = ({
  id,
  isModalVisible,
  setModalVisible,
  defaultRating,
  setDefaultRating,
  handleRating,
}) => {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const onPressSkip = () => {
    setModalVisible(false);
  };

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacityView
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={styles.starImageStyle}
                source={item <= defaultRating ? star_filled : star_unfilled}
              />
            </TouchableOpacityView>
          );
        })}
      </View>
    );
  };
  return (
    <Modal isVisible={isModalVisible}>
      <View
        style={{
          height: 450,
          width: "100%",
          backgroundColor: "#ffff",
          borderRadius: 10,
          alignSelf: "center",
        }}
      >
        <Image
          resizeMode="contain"
          source={starRating}
          style={styles.starStyle}
        />
        <AppText style={styles.rateText} type={TWENTY_FOUR} weight={MEDIUM}>
          Rate Your Experience
        </AppText>
        <CustomRatingBar />
        <Button
          children="Submit"
          containerStyle={{ marginHorizontal: 20, marginTop: 10 }}
          onPress={handleRating}
          disabled={defaultRating === 0 ? true : false}
        />
        <TouchableOpacityView onPress={() => onPressSkip()}>
          <AppText style={styles.skipText} type={SIXTEEN}>
            Skip Now
          </AppText>
        </TouchableOpacityView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  starStyle: {
    width: 183,
    height: 139,
    alignSelf: "center",
    marginTop: 30,
  },
  rateText: {
    textAlign: "center",
    marginTop: 15,
  },
  zStyle: {
    zIndex: 999,
  },
  starImageStyle: {
    width: 40,
    height: 40,
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
  skipText: {
    marginTop: 20,
    textAlign: "center",
  },
});

export default RatingScreen;
