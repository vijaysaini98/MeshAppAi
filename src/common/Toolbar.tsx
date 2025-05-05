import React from "react";
import { StyleSheet, View, ViewStyle,Image } from "react-native";
import TouchableOpacityView from "./TouchableOpacityView";
import {
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from "../theme/dimens";
import NavigationService from "../navigation/NavigationService";
import {
  AppText,
  MEDIUM,
  SEMI_BOLD,
  SIXTEEN,
  TWENTY_FOUR,
  TWENTY_SIX,
} from "./AppText";
import { colors } from "../theme/colors";
import { add_logo, backIcon, filterSecond } from "../helper/ImageAssets";

interface ToolbarProps {
  isLogo?: boolean| undefined;
  isSecond?: boolean | undefined;
  title?: string | undefined;
  isThird?: boolean | undefined;
  isFavorite?: boolean | undefined;
  onAdd?: () => void | undefined;
  isFourth?: boolean | undefined;
  isBack?: boolean | undefined;
  style?: ViewStyle;
  noBack?: boolean | undefined;
  isFilter?: boolean | undefined;
  isAdd?: boolean | undefined;
  handleAddIcon:() => void | undefined;
  isAddIcon:boolean | undefined;
  rightIcon:any
  backFunction:()=>void | undefined
}

const Toolbar = ({
  title,
  isBack,
  style,
  noBack,
  isFilter,
  isAdd,
  isAddIcon,
  backFunction,
  rightIcon,
  handleAddIcon
}: ToolbarProps) => {
  return isBack ? (
    <TouchableOpacityView
      style={styles.backContainer3}
      onPress={() => NavigationService.goBack()}
    >
      <Image
        source={backIcon}
        style={styles.backIcon}
        resizeMode="contain"
      />
    </TouchableOpacityView>
  ) : (
    <View style={[styles.container, style]}>
      <View style={styles.containerSecond}>
        {!noBack && (
          <TouchableOpacityView
            style={styles.backContainer2}
            onPress={() =>
              backFunction ? backFunction() : NavigationService.goBack()
            }
          >
            <Image
              source={backIcon}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacityView>
        )}

        <AppText
          type={TWENTY_FOUR}
          weight={MEDIUM}
          style={[styles.title, noBack && { marginStart: 20 }]}
        >
          {title}
        </AppText>
      </View>
      {isFilter && (
        <TouchableOpacityView style={styles.backContainer2} onPress={() => {}}>
          <Image
            source={filterSecond}
            style={styles.star}
            resizeMode="contain"
          />
        </TouchableOpacityView>
      )}
      {isAdd && (
        <TouchableOpacityView style={styles.backContainer2} onPress={() => {}}>
          <Image
            source={filterSecond}
            style={styles.star}
            resizeMode="contain"
          />
        </TouchableOpacityView>
      )}
      {isAddIcon && (
        <TouchableOpacityView style={styles.backContainer2} onPress={handleAddIcon}>
          <Image
            source={ rightIcon ? rightIcon : add_logo}
            style={styles.star}
            resizeMode="contain"
          />
        </TouchableOpacityView>
      )}
    </View>
  );
};

export { Toolbar };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: universalPaddingTop,
    backgroundColor: colors.mainBg,
    justifyContent: "space-between",
  },
  backContainer: {
    position: "absolute",
    top: 22,
    padding: universalPaddingHorizontal,
    left: 0,
  },
  backContainer2: {
    padding: universalPaddingHorizontal,
  },
  backContainer3: {
    position: "absolute",
    paddingVertical: universalPaddingHorizontal,
    paddingHorizontal: universalPaddingHorizontal,
    top: 30,
    zIndex: 1,
  },
  backIcon: {
    height: 16,
    width: 16,
  },
  mainLogo: {
    height: 50,
    width: 150,
    marginTop: 12,
  },
  title: {
    // marginTop: 18,
  },
  star: {
    height: 20,
    width: 20,
  },
  starContainer: {
    position: "absolute",
    top: 15,
    padding: universalPaddingHorizontalHigh,
    right: 0,
  },
  containerSecond: {
    flexDirection: "row",
    alignItems: "center",
  },
});
