import { TabBar } from "react-native-tab-view";
import { AppText, FOURTEEN } from "../../../common";
import { colors } from "../../../theme/colors";

import { styles } from "../../../styles/styles";

export const RenderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        renderLabel={({ route, focused }) => (
          <AppText
            type={FOURTEEN}
            style={
              focused
                ? {
                    color: colors.buttonBg,
                  }
                : { color: colors.second_text }
            }
          >
            {route.title}
          </AppText>
        )}
        indicatorStyle={{ backgroundColor: colors.buttonBg }}
        scrollEnabled={true}
        tabStyle={[{ marginTop: 20 }, props.tabStyle]}
        pressColor={colors.transparent}
        style={[styles.tabbar, props.style]}
      />
    );
  };