import React, { useEffect, useState } from "react";
import { AppSafeAreaView } from "../../common";
import NavigationService from "../../navigation/NavigationService";
import {
  NAVIGATION_AUTH_STACK,
  NAVIGATION_DR_BOTTOM_TAB_STACK,
  NAVIGATION_MR_BOTTOM_TAB_STACK,
} from "../../navigation/routes";
import { SpinnerSecond } from "../../common/SpinnerSecond";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_TYPE, USER_TOKEN_KEY } from "../../helper/Constants";
import { useAppDispatch } from "../../store/hooks";
import { MrProfileData } from "../../slices/mrSlice/mrAction";
import { DrEditProfile } from "../../slices/drSlice/drAction";
import { authAmination } from "../../helper/ImageAssets";
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { Screen, universalPaddingHorizontal } from "../../theme/dimens";

// import Video from "react-native-video";

// const { width } = Dimensions.get("window");

// const media = {
//   type: "video",
//   url: "https://www.w3schools.com/html/mov_bbb.mp4", // replace with your actual video URL
// };

// export const SingleMediaModal = ({ visible, onClose, media }) => {
//   const handlePress = async () => {
//     const supported = await Linking.canOpenURL(media.url);
//     if (supported) {
//       await Linking.openURL(media.url);
//     } else {
//       console.warn("Can't open URL:", media.url);
//     }
//   };

//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <View style={styles.overlay}>
//         <TouchableOpacity style={styles.background} onPress={onClose} />

//         <TouchableOpacity style={styles.mediaWrapper} onPress={handlePress}>
//           {media.type === "image" ? (
//             <Image
//               source={{ uri: media.url }}
//               style={styles.media}
//               resizeMode="contain"
//             />
//           ) : (
//             <Video
//               source={{ uri: media.url }}
//               style={styles.media}
//               resizeMode="contain"
//               paused
//               controls
//             />
//           )}
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   );
// };

const AuthLoading = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      bootstrapAsync();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  const bootstrapAsync = async () => {
    try {
      const customerToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
      const loginType = await AsyncStorage.getItem(LOGIN_TYPE);

      if (customerToken) {
        if (loginType === "DR") {
          NavigationService.reset(NAVIGATION_DR_BOTTOM_TAB_STACK);
          dispatch(DrEditProfile());
        } else {
          NavigationService.reset(NAVIGATION_MR_BOTTOM_TAB_STACK);
          dispatch(MrProfileData());
        }
      } else {
        NavigationService.reset(NAVIGATION_AUTH_STACK);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [visible, setVisible] = useState(true);

  return (
    <AppSafeAreaView>
      <View style={styles.topContainer}>
        <AnimatedLottieView
          style={styles.animation}
          source={authAmination}
          autoPlay
          loop
        />
        <SpinnerSecond loading={true} />
      </View>
    </AppSafeAreaView>
  );
};

export default AuthLoading;

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "white",
  },

  animation: {
    height: Screen.Height * 0.6,
    width: Screen.Width - universalPaddingHorizontal,
  },
  overlay: {
    flex: 1,
    backgroundColor: "#000000cc",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  mediaWrapper: {
    width: Screen.Width * 0.9,
    height: Screen.Width * 0.6,
    zIndex: 1,
  },
  media: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
