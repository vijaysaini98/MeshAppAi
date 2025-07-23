import { Animated, Platform, StyleSheet } from "react-native";
import { Screen } from "../../../theme/dimens";
import { colors } from "../../../theme/colors";

export interface MediaData {
  ad: number;
  code: number;
  data: {
    advertiser_id: number;
    createdAt: string;
    deletedAt: string | null;
    description: string;
    end_date: string;
    id: number;
    media_path: string[];
    redirect_url: string;
    start_date: string;
    status: number;
    title: string;
    type: "image" | "video";
    updatedAt: string;
  };
  message: string;
  success: boolean;
}

export interface AdvertismentMediaModalProps {
  visible: boolean;
  onClose?: () => void | any;
  mediaData: MediaData | any;
}

export interface ProgressBarProps {
  progressBarWidth: Animated.AnimatedInterpolation;
  progressBarColor: string[];
}

export interface MediaContentProps {
  data: MediaData["data"];
  videoRef: React.RefObject<Video>;
  isVideoReady: boolean;
  onLoadStart: () => void;
  onLoad: () => void;
  onBuffer: (event: { isBuffering: boolean }) => void;
  handlePress?: () => void;
  isImageReady?: boolean;
  imageSize?: { width: number; height: number } | null;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mediaWrapper: {
    marginTop: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  media: {
    borderRadius: 8,
    width: Screen.Width * 0.9,
    height: Screen.Width * 0.5,
    overflow: "hidden",
    alignSelf: "center",
  },
  carouselContainer: {
    marginTop: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height:500,
    padding: 1,
    borderRadius: 8,
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
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: -10,
    width: "100%",
  },
  descriptionContainer: {
    maxHeight: "100%",
    // minHeight:"60%",
    paddingHorizontal: 16,
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
    // backgroundColor:'red'
  },
  dotBase: {
  borderRadius: 4,
  marginHorizontal: 4,
  backgroundColor: 'gray',
},

  dot: (isActive: boolean) => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: isActive ? colors.buttonBg : "#ccc",
    paddingHorizontal: isActive ? 10 : 0,
  }),
  imageStyle: (imageSize: any) => ({
    width: imageSize.width,
    height: imageSize.height,
    alignSelf: "center",
  }),
});

export default styles;
