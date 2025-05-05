import React from "react";
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  EIGHTEEN,
  LIGHT,
  MEDIUM,
  THIRTEEN,
  THIRTY_EIGHT,
  TWENTY,
} from "../../common";
import KeyBoardAware from "../../common/KeyboardAware";
;
import { meshAppLogo } from "../../helper/ImageAssets";
import { styles } from "../../styles/styles";
import { Image, View } from "react-native";
import { welcomeData } from "../../helper/dummydata";
import TouchableOpacityView from "../../common/TouchableOpacityView";
import ReactNativeVersionInfo from "react-native-version-info";
import { colors } from "../../theme/colors";

let version = ReactNativeVersionInfo.appVersion;
let buildVersion = ReactNativeVersionInfo.buildVersion;

const Welcome = () => {
  return (
    <AppSafeAreaView isSecond>
      <KeyBoardAware isSecond>
        <Image
          source={meshAppLogo}
          resizeMode="contain"
          style={styles.welcomeLogo}
        />
        <View style={styles.alignCenter}>
          <AppText type={TWENTY}>Welcome To</AppText>
          <AppText type={THIRTY_EIGHT} weight={BOLD}>
            {" "}
            Mesh
            <AppText weight={LIGHT} type={THIRTY_EIGHT}>
              App
            </AppText>{" "}
          </AppText>
        </View>
        <View style={styles.welcomeRoleContainer}>
          {welcomeData?.map((e, index) => {
            let space = index % 2 === 0 ? { marginEnd: 5 } : { marginStart: 5 };
            return (
              <TouchableOpacityView
                onPress={e?.onPress}
                key={e.id}
                style={[styles.welcomeRoleBox, space]}
              >
                <Image
                  source={e.icon}
                  resizeMode="contain"
                  style={styles.roleIcon}
                />
                <AppText
                  type={EIGHTEEN}
                  weight={MEDIUM}
                  style={styles.textAlignCenter}
                >
                  {e.title}
                </AppText>
              </TouchableOpacityView>
            );
          })}
        </View>
        <View style={styles.versionCodeContainer}>
          <AppText
            type={THIRTEEN}
            weight={MEDIUM}
            style={{
              color: colors.buttonBg,
            }}
          >
            {" "}
            V-{`${version} (${buildVersion})`}
          </AppText>
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default Welcome;
