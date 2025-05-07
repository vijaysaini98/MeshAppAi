import { Image, ImageBackground, View } from "react-native";
import {
  MrHomeAppointmentContainerProps,
  MrHomeSearchBarProps,
  MrHomeToolBarProps,
} from "../../../../helper/types";
import { styles } from "../../../../styles/styles";
import { FC } from "react";
import {
  AppText,
  BOLD,
  BUTTON_BG,
  EIGHTEEN,
  FOURTEEN,
  Input,
  MEDIUM,
  THIRTY_EIGHT,
  WHITE,
} from "../../../../common";
import TouchableOpacityView from "../../../../common/TouchableOpacityView";
import { bellIcon, searchIcon, upcoming } from "../../../../helper/ImageAssets";
import { placeHolderText } from "../../../../helper/Constants";

export const HomeToolBar: FC<MrHomeToolBarProps> = ({
  data,
  profileImage,
  name,
  address,
  handleNotificationIcon,
}) => {
  return (
    <View style={styles.homeToolContainer}>
      <Image
        source={profileImage}
        resizeMode="cover"
        style={styles.profileImage}
      />
      <View style={styles.homeToolContainer3}>
        <AppText color={BUTTON_BG} weight={MEDIUM} type={FOURTEEN}>
          {name}
        </AppText>
        <AppText weight={MEDIUM} type={FOURTEEN} style={{ marginTop: 10 }}>
          {address}
        </AppText>
      </View>
      <TouchableOpacityView onPress={handleNotificationIcon}>
        <Image source={bellIcon} resizeMode="contain" style={styles.bellIcon} />
      </TouchableOpacityView>
    </View>
  );
};

export const HomeSearchBar: React.FC<MrHomeSearchBarProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.searchContainer}>
      <Input
        placeholder={placeHolderText.search}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        returnKeyType="done"
        mainContainer={styles.searchInput}
        icon2={searchIcon}
      />
    </View>
  );
};

export const HomeAppointmentContainer: FC<MrHomeAppointmentContainerProps> = ({
  data,
}) => {
  return (
    <View style={styles.upcomigToolContainer}>
      {data.map((e, index) => {
        return (
          <TouchableOpacityView
            onPress={e.onPress}
            style={[styles.appointmentSingle]}
            key={e.id}
          >
            <ImageBackground
              source={upcoming}
              style={styles.upcomingImage}
              resizeMode="stretch"
              key={e?.id}
            >
              <AppText type={THIRTY_EIGHT} weight={BOLD} color={WHITE}>
                {e.value}
              </AppText>
              <AppText type={EIGHTEEN} color={WHITE}>
                {e.title}
              </AppText>
            </ImageBackground>
          </TouchableOpacityView>
        );
      })}
    </View>
  );
};
