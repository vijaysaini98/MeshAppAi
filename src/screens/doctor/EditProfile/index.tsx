/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { View } from "react-native";
import { commonStyles } from "../../../theme/commonStyles";
import {
  AppSafeAreaView,
  AppText,
  FIFTEEN,
  SIXTEEN,
  Toolbar,
} from "../../../common";
import { styles } from "../../../styles/styles";
import { colors } from "../../../theme/colors";
import PersonalDetail from "./PersonalDetail";
import SpecialityDetail from "./SpecialtyDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DrEditProfile } from "../../../slices/drSlice/drAction";
import { useIsFocused } from "@react-navigation/native";

export const ListEmptyComponent = () => {
  return (
    <View style={commonStyles.center}>
      <AppText type={SIXTEEN}>Nothing to show</AppText>
    </View>
  );
};

export const RenderTabBar = (props) => {
  
  return (
    <TabBar
      {...props}
      renderLabel={({ route, focused }) => (
        <AppText
          type={FIFTEEN}
          style={
            focused
              ? {
                  color: colors.buttonBg,
                  textAlign: "center",
                }
              : { color: colors.second_text, textAlign: "center", }
          }
        >
          {route.title}
        </AppText>
      )}
      indicatorStyle={{ backgroundColor: colors.buttonBg }}
      scrollEnabled={props.scrollEnabled ??  true}
      tabStyle={[{ marginTop: 20 }, props.tabStyle]}
      pressColor={colors.transparent}
      style={[styles.tabbar, props.style,]}
    />
  );
};

const EditProfile = () => {
  const dispatch = useDispatch();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "personalDetail", title: "Personal Detail" },
    { key: "specialtyDetail", title: "Specialty Detail" },
    // { key: "bankDetail", title: "Bank Detail" },
    // { key: "panCardDetails", title: "Pan Card Details" },
  ]);

  const renderScene = SceneMap({
    personalDetail: () => <PersonalDetail />,
    specialtyDetail: () => <SpecialityDetail />,
    // bankDetail: () => <BankDetail />,
    // panCardDetails: () => <PanCardDetail />,
  });

  let focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      dispatch(DrEditProfile());
    }
  }, [focus]);

  return (
    <AppSafeAreaView>
      <Toolbar title="Edit Profile" />
      <View style={styles.main}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(props) => (
            <RenderTabBar {...props} 
            scrollEnabled={false}
            style={{
              backgroundColor: colors.white,
              justifyContent: "space-around", // Distribute tabs evenly
              elevation: 0,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
            
            />
          )}
          onIndexChange={setIndex}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default EditProfile;
