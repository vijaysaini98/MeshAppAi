import { StyleSheet, View } from "react-native";
import React from "react";
import { Rating } from "react-native-ratings";
import { AppText, FIFTEEN } from "./AppText";

type StarRatingProps = {
  customContainerStyle?: object;
  count?: number;
  selectedStars?: number | null | undefined;
  handleRatingStar?: (rating: number) => void;
  startingValue?: number;
};

const StarRating = ({
  customContainerStyle,
  count,
  selectedStars,
  handleRatingStar,
  startingValue,
  ...props
}: StarRatingProps) => {

  return (
    <View style={[styles.mainContainer, customContainerStyle]}>
      <Rating
        size={26}
        onFinishRating={handleRatingStar}
        imageSize={15}
        readonly={true}
        startingValue={startingValue}
      />

      {selectedStars >= 0 && (
        <AppText
          style={{
            alignSelf: "center",
            justifyContent: "center",
            textAlignVertical: "center",
          }}
          type={FIFTEEN}
        >
          {Math.round(selectedStars * 10) / 10}
        </AppText>
      )}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5
  },
  starNumber: {
    marginLeft: 10,
  },
});
