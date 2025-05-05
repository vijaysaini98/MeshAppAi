import { StyleSheet, View } from "react-native";
import React from "react";
import { Rating } from "react-native-ratings";
import { AppText, FIFTEEN } from "./AppText";

const StarRating = ({
  customContainerStyle,
  count,
  selectedStars,
  handleRatingStar,
  startingValue,
  ...props
}: InputProps) => {

  return (
    <View style={[styles.mainContainer, customContainerStyle]}>
      <Rating
        // ratingCount={5}
        size={26}
        // count={1}
        onFinishRating={handleRatingStar}
        imageSize={15}
        readonly={true}
        startingValue={startingValue}
      // showReadOnlyText={4}
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
