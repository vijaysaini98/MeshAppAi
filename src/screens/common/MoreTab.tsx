import { Image, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { AppText, EIGHTEEN } from "../../common";
import TouchableOpacityView from "../../common/TouchableOpacityView";

interface MoreTabProps {
  source: string | undefined;
  title: string | undefined;
  source2: string | undefined;
  tabStyle: ViewStyle | undefined;
  onPress: () => void | undefined;
  source2Style: ViewStyle | undefined;
  tintColor: string | undefined;
}

const MoreTab: React.FC<MoreTabProps> = ({
  source,
  title,
  source2,
  tabStyle,
  onPress,
  source2Style,
  tintColor,
  ...props
}) => {
  return (
    <TouchableOpacityView
      onPress={onPress}
      style={[styles.container, tabStyle]}
    >
      <View style={styles.subContainer}>
        {source && (
          <Image
            source={source}
            resizeMode="contain"
            style={styles.IconStyle1}
            tintColor={tintColor}
          />
        )}
        <AppText style={{ paddingLeft: 16 }} type={EIGHTEEN}>
          {title}
        </AppText>
      </View>
      <View>
        {source2 && (
          <Image
            source={source2}
            resizeMode="contain"
            style={[styles.IconStyle2, source2Style]}
            tintColor={tintColor}
          />
        )}
      </View>
    </TouchableOpacityView>
  );
};

export default MoreTab;

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginHorizontal: 16,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    // alignSelf:"center",
    alignItems: "center",
  },
  IconStyle1: {
    width: 20,
    height: 20,
    // alignSelf:"center"
  },
  subContainer: {
    flexDirection: "row",
    // backgroundColor:"red",
  },
  IconStyle2: {
    width: 6,
    height: 14,
  },
});
