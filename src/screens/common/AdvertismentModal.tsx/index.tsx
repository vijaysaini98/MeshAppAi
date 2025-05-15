// import React, { useEffect, useRef, useState, useCallback } from "react";
// import {
//   Image,
//   Linking,
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Animated,
//   Platform,
//   Alert,
// } from "react-native";
// import Video from "react-native-video";
// import LinearGradient from "react-native-linear-gradient";
// import { Screen } from "../../../theme/dimens";
// import { colors } from "../../../theme/colors";
// import { AppText, BOLD, TWELVE } from "../../../common";
// import { AnimationSpinner } from "../../../animation";

// const MAX_COUNTDOWN = 15;

// interface AdvertismentMediaModalProps {
//   visible: boolean;
//   onClose: () => void;
//   media: {
//     url: string;
//     type: "image" | "video";
//     link: string;
//   };
// }

// export const AdvertismentMediaModal = ({
//   visible,
//   onClose,
//   media,
// }: AdvertismentMediaModalProps) => {

//   const videoRef = useRef(null);
//   const progress = useRef(new Animated.Value(0)).current;

//   const [countdown, setCountdown] = useState(MAX_COUNTDOWN);
//   const [showCloseButton, setShowCloseButton] = useState(false);
//   const [isVideoReady, setIsVideoReady] = useState(false);

//   const animateProgressBar = useCallback(() => {
//     progress.setValue(0);
//     Animated.timing(progress, {
//       toValue: 1,
//       duration: MAX_COUNTDOWN * 1000,
//       useNativeDriver: false,
//       easing: Animated?.Easing?.linear,
//     }).start();
//   }, [progress]);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;

//     if (visible) {
//       // setCountdown(MAX_COUNTDOWN);
//       setShowCloseButton(false);
//       animateProgressBar();

//       timer = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev <= 1) {
//             clearInterval(timer);
//             setShowCloseButton(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }

//     return () => clearInterval(timer);
//   }, [visible, animateProgressBar]);

//   const progressBarWidth = progress.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: ["0%", "50%", "100%"],
//   });

//     const handlePress = useCallback(async () => {
//       const url = media?.link;
//       if (!url) {
//         Alert.alert('No URL provided');
//         return;
//       }
//       try {
//           await Linking.openURL(url);
//       } catch (error) {
//         console.error('Error opening URL:', error);
//         Alert.alert('Failed to open URL');
//       }
//     }, [media?.link]);

//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <LinearGradient
//         colors={colors.modalBagColor}
//         style={styles.overlay}
//       >

//       <View style={styles.progressWrapper}>
//         <Animated.View
//           style={[styles.progressAnimated, { width: progressBarWidth }]}
//         >
//           <LinearGradient
//             colors={colors.progressBarColor}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.progressFill}
//           />
//         </Animated.View>
//       </View>

//         {showCloseButton && (
//           <TouchableOpacity
//           activeOpacity={0.6}
//           onPress={onClose}
//           style={styles.countdownContainer}
//           >

//             <AppText type={TWELVE} weight={BOLD} style={styles.countdownText}>
//               Skip
//             </AppText>
//           </TouchableOpacity>
//         )}

//         <TouchableOpacity
//           style={styles.mediaWrapper}
//           onPress={ media?.link ? handlePress : ()=>{console.log("no link provided")}}
//           activeOpacity={1}
//         >
//           {media.type === "image" ? (
//             <Image
//               source={{ uri: media.url }}
//               style={styles.media}
//               resizeMode="stretch"
//             />
//           ) : media.type === "video" ? (
//             <View style={styles.media}>
//               {!isVideoReady && (
//                 <View style={styles.loaderContainer}>
//                   <AnimationSpinner />
//                 </View>
//               )}
//               <Video
//                 ref={videoRef}
//                 source={{ uri: media.url }}
//                 style={styles.media}
//                 resizeMode="contain"
//                 muted={false}
//                 volume={1.0}
//                 paused={false}
//                 ignoreSilentSwitch="ignore"
//                 onLoadStart={() => setIsVideoReady(false)}
//                 onLoad={() => setIsVideoReady(true)}
//                 onBuffer={({ isBuffering }) => setIsVideoReady(!isBuffering)}
//               />
//             </View>
//           ) : null}
//         </TouchableOpacity>

//       </LinearGradient>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   mediaWrapper: {
//     marginTop: 20,
//     backgroundColor: "transparent",
//   },
//   media: {
//     borderRadius: 8,
//     width: Screen.Width * 0.9,
//     height: Screen.Width * 0.5,
//     overflow: "hidden",
//   },
//   countdownContainer: {
//     position: "absolute",
//     top: Platform.OS === "ios" ? 45 : 8,
//     right: 5,
//     backgroundColor: colors.white,
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 999,
//   },
//   countdownText: {
//     fontSize: 14,
//     color: colors.buttonBg,
//     textDecorationLine:'underline',
//     letterSpacing:2
//   },
//   progressWrapper: {
//     position: "absolute",
//     top: Platform.OS === "ios" ? 45 : 10,
//     left: 5,
//     right: 5,
//     height: 4,
//     backgroundColor: colors.black,
//     borderRadius: 2,
//     overflow: "hidden",
//   },
//   progressAnimated: {
//     height: "100%",
//   },
//   progressFill: {
//     flex: 1,
//     borderRadius: 2,
//   },
//   loaderContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.4)",
//     zIndex: 1,
//   },
// });

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Platform,
  Alert,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import Video from "react-native-video";
import LinearGradient from "react-native-linear-gradient";
import { Screen } from "../../../theme/dimens";
import { colors } from "../../../theme/colors";
import { AppText, BOLD, TWELVE } from "../../../common";
import { AnimationSpinner } from "../../../animation";

const MAX_COUNTDOWN = 10;

interface AdvertismentMediaModalProps {
  visible: boolean;
  onClose: () => void;
  media: {
    url: string;
    type: "image" | "video";
    link: string;
  };
}

export const AdvertismentMediaModal = ({
  visible,
  onClose,
  media,
}: AdvertismentMediaModalProps) => {
  const videoRef = useRef(null);
  const progress = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState({
    countdown: MAX_COUNTDOWN,
    showCloseButton: false,
    isVideoReady: false,
  });

  const animateProgressBar = useCallback(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: MAX_COUNTDOWN * 1000,
      useNativeDriver: false,
      easing: Animated?.Easing?.linear,
    }).start();
  }, [progress]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visible) {
      setState((prev) => ({
        ...prev,
        countdown: MAX_COUNTDOWN,
        showCloseButton: false,
      }));
      animateProgressBar();

      timer = setInterval(() => {
        setState((prev) => {
          if (prev.countdown <= 1) {
            clearInterval(timer);
            return { ...prev, countdown: 0, showCloseButton: true };
          }
          return { ...prev, countdown: prev.countdown - 1 };
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [visible, animateProgressBar]);

  const progressBarWidth = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ["0%", "50%", "100%"],
      }),
    [progress]
  );

  const handlePress = useCallback(async () => {
    const url = media?.link;
    if (!url) {
      Alert.alert("No URL provided");
      return;
    }
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening URL:", error);
      Alert.alert("Failed to open URL");
    }
  }, [media?.link]);

  const handleVideoLoadStart = useCallback(() => {
    setState((prev) => ({ ...prev, isVideoReady: false }));
  }, []);

  const handleVideoLoad = useCallback(() => {
    setState((prev) => ({ ...prev, isVideoReady: true }));
  }, []);

  const handleBuffer = useCallback(
    ({ isBuffering }: { isBuffering: boolean }) => {
      setState((prev) => ({ ...prev, isVideoReady: !isBuffering }));
    },
    []
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <LinearGradient colors={colors.modalBagColor} style={styles.overlay}>
        <ProgressBar
          progressBarColor={colors.progressBarColor}
          progressBarWidth={progressBarWidth}
        />

        {state.showCloseButton && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onClose}
            style={styles.countdownContainer}
          >
            <AppText type={TWELVE} weight={BOLD} style={styles.countdownText}>
              Skip
            </AppText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.mediaWrapper}
          onPress={
            media?.link ? handlePress : () => console.log("no link provided")
          }
          activeOpacity={1}
        >
          <MediaContent
            media={media}
            videoRef={videoRef}
            isVideoReady={state.isVideoReady}
            onLoadStart={handleVideoLoadStart}
            onLoad={handleVideoLoad}
            onBuffer={handleBuffer}
          />
        </TouchableOpacity>
      </LinearGradient>
    </Modal>
  );
};

export const ProgressBar = ({
  progressBarWidth,
  progressBarColor,
  style
}: {
  progressBarWidth: Animated.AnimatedInterpolation;
  progressBarColor: any;
  style:ViewStyle
}) => (
  <View style={[styles.progressWrapper,style]}>
    <Animated.View
      style={[styles.progressAnimated, { width: progressBarWidth }]}
    >
      <LinearGradient
        colors={progressBarColor}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.progressFill}
      />
    </Animated.View>
  </View>
);

const MediaContent = ({
  media,
  videoRef,
  isVideoReady,
  onLoadStart,
  onLoad,
  onBuffer,
}: {
  media: { url: string; type: "image" | "video" };
  videoRef: React.RefObject<any>;
  isVideoReady: boolean;
  onLoadStart: () => void;
  onLoad: () => void;
  onBuffer: (event: { isBuffering: boolean }) => void;
}) => {
  if (media.type === "image") {
    return (
      <Image
        source={{ uri: media.url }}
        style={styles.media}
        resizeMode="stretch"
      />
    );
  }

  if (media.type === "video") {
    return (
      <View style={styles.media}>
        {!isVideoReady && (
          <View style={styles.loaderContainer}>
          <ActivityIndicator color={colors.white} size={"large"}/>
          </View>
        )}
        <Video
          ref={videoRef}
          source={{ uri: media.url }}
          style={styles.media}
          resizeMode="contain"
          muted={false}
          volume={1.0}
          paused={false}
          ignoreSilentSwitch="obey"
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onBuffer={onBuffer}
        />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mediaWrapper: {
    marginTop: 20,
    backgroundColor: "transparent",
  },
  media: {
    borderRadius: 8,
    width: Screen.Width * 0.9,
    height: Screen.Width * 0.5,
    overflow: "hidden",
  },
  countdownContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 45 : 8,
    right: 5,
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  countdownText: {
    fontSize: 14,
    color: colors.buttonBg,
    textDecorationLine: "underline",
    letterSpacing: 2,
  },
  progressWrapper: {
    position: "absolute",
    top: Platform.OS === "ios" ? 45 : 10,
    left: 5,
    right: 5,
    height: 4,
    backgroundColor: colors.black,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressAnimated: {
    height: "100%",
  },
  progressFill: {
    flex: 1,
    borderRadius: 2,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1,
  },
});
