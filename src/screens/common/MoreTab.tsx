import { Image, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { AppText, BOLD, EIGHTEEN, TWELVE, WHITE } from "../../common";
import TouchableOpacityView from "../../common/TouchableOpacityView";
import Shimmer from "react-native-shimmer";

interface MoreTabProps {
  source?: string | undefined;
  title?: string | undefined;
  source2?: string | undefined;
  tabStyle?: ViewStyle | undefined;
  onPress?: () => void | undefined;
  source2Style?: ViewStyle | undefined;
  tintColor?: string | undefined;
  label?: string | undefined;
  titleStyle?:TextStyle,
  titleType?:string
}

const MoreTab: React.FC<MoreTabProps> = ({
  source,
  title,
  source2,
  tabStyle,
  onPress,
  source2Style,
  tintColor,
  label,
  titleStyle,
  titleType,
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
        <AppText style={[styles.titleStyle,titleStyle]} type={titleType ? titleType : EIGHTEEN}>
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
        {label && (
          <View style={styles.shimmerContainer}>
            <Shimmer
              opacity={1}
              duration={500}
              pauseDuration={200}
              animating={true}
              animationOpacity={0.5}
            >
              <AppText
                type={TWELVE}
                weight={BOLD}
                color={WHITE}
                style={styles.labelStyle}
              >
                {label}
              </AppText>
            </Shimmer>
          </View>
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
    alignItems: "center",
  },
  titleStyle: {
    paddingLeft: 16,
  },
  IconStyle1: {
    width: 20,
    height: 20,
  },
  subContainer: {
    flexDirection: "row",
  },
  IconStyle2: {
    width: 6,
    height: 14,
  },
  shimmerContainer: {
    alignItems: "flex-end",
    // marginTop: -4,
    paddingHorizontal: 10,
  },
  labelStyle: {
    backgroundColor: colors.buttonBg, // Helps shimmer look
    borderRadius: 6,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
