import React, { FC, memo } from "react";
import { Image, ImageBackground, View } from "react-native";
import {
  MrHomeAppointmentContainerProps,
  MrHomeSearchBarProps,
  MrHomeToolBarProps,
} from "../../../../helper/types";
import { styles } from "../../../../styles/styles";
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

// HomeToolBar Component
export const HomeToolBar: FC<MrHomeToolBarProps> = memo(
  ({ profileImage, name, address, handleNotificationIcon }) => {
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
          <Image
            source={bellIcon}
            resizeMode="contain"
            style={styles.bellIcon}
          />
        </TouchableOpacityView>
      </View>
    );
  }
);

// HomeSearchBar Component
export const HomeSearchBar: FC<MrHomeSearchBarProps> = memo(
  ({ value, onChangeText }) => {
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
  }
);

// HomeAppointmentContainer Component
export const HomeAppointmentContainer: FC<MrHomeAppointmentContainerProps> = memo(
  ({ data }) => {
    return (
      <View style={styles.upcomigToolContainer}>
        {data.map((item) => (
          <TouchableOpacityView
            onPress={item.onPress}
            style={styles.appointmentSingle}
            key={item.id}
          >
            <ImageBackground
              source={upcoming}
              style={styles.upcomingImage}
              resizeMode="stretch"
            >
              <AppText type={THIRTY_EIGHT} weight={BOLD} color={WHITE}>
                {item.value}
              </AppText>
              <AppText type={EIGHTEEN} color={WHITE}>
                {item.title}
              </AppText>
            </ImageBackground>
          </TouchableOpacityView>
        ))}
      </View>
    );
  }
);

// Default Props
HomeToolBar.defaultProps = {
  profileImage: null,
  name: "User",
  address: "No Address Available",
  handleNotificationIcon: () => {},
};

HomeSearchBar.defaultProps = {
  value: "",
  onChangeText: () => {},
};

HomeAppointmentContainer.defaultProps = {
  data: [],
};
