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
  TouchableOpacity,
  View,
  Animated,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import Video from "react-native-video";
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-swiper";
import { colors } from "../../../theme/colors";
import {
  AppText,
  BOLD,
  FOURTEEN,
  MEDIUM,
  TWELVE,
  WHITE,
} from "../../../common";
import { IMAGE_PATH1 } from "../../../helper/Constants";
import { useAppDispatch } from "../../../store/hooks";
import { upateAddvertisment } from "../../../slices/authSlice/authAction";
import styles, {
  AdvertismentMediaModalProps,
  MediaContentProps,
  ProgressBarProps,
} from "./styles";
import FastImage from "react-native-fast-image";
import { Screen } from "../../../theme/dimens";
import Carousel from "react-native-reanimated-carousel";

const MAX_COUNTDOWN = 10;

export const AdvertismentMediaModal = ({
  visible,
  onClose,
  mediaData,
}: AdvertismentMediaModalProps) => {
  const dispatch = useAppDispatch();
  const videoRef = useRef<Video>(null);
  const progress = useRef(new Animated.Value(0)).current;

  const [openTimestamp, setOpenTimestamp] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(MAX_COUNTDOWN);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Animate progress bar
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      setOpenTimestamp(Date.now());
      setCountdown(MAX_COUNTDOWN);
      setShowCloseButton(false);
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: MAX_COUNTDOWN * 1000,
        useNativeDriver: false,
      }).start();

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowCloseButton(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [visible, progress]);

  const progressBarWidth = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
      }),
    [progress]
  );

  const handlePress = useCallback(async () => {
    if (!mediaData?.data?.redirect_url) {
      Alert.alert("No URL provided");
      return;
    }
    console.log("Redirect URL:", mediaData?.data?.redirect_url);

    try {
      await Linking.openURL(`${mediaData?.data?.redirect_url}`);
    } catch (error) {
      Alert.alert("Failed to open URL");
    }
  }, [mediaData?.data?.redirect_url]);

  // Video handlers
  const handleVideoLoadStart = useCallback(() => setIsVideoReady(false), []);
  const handleVideoLoad = useCallback(() => setIsVideoReady(true), []);
  const handleBuffer = useCallback(
    ({ isBuffering }: { isBuffering: boolean }) =>
      setIsVideoReady(!isBuffering),
    []
  );

  const handleClose = useCallback(() => {
    if (openTimestamp) {
      const durationSec = Math.round((Date.now() - openTimestamp) / 1000);
      console.log(`Modal was open for ${durationSec} seconds`);

      const data = {
        id: mediaData?.ad, // Ideally, this should be dynamic
        duration: durationSec,
      };

      dispatch(upateAddvertisment(data));
    }

    setOpenTimestamp(null);
  }, [openTimestamp, dispatch]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <LinearGradient colors={colors.modalBagColor} style={styles.overlay}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <ProgressBar
            progressBarWidth={progressBarWidth}
            progressBarColor={colors.progressBarColor}
          />

          {showCloseButton && (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleClose}
              style={styles.countdownContainer}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <AppText type={TWELVE} weight={BOLD} style={styles.countdownText}>
                Skip
              </AppText>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.mediaWrapper}
            onPress={mediaData?.data?.redirect_url ? handlePress : undefined}
            activeOpacity={1}
          >
            <MediaContent
              data={mediaData?.data}
              videoRef={videoRef}
              isVideoReady={isVideoReady}
              onLoadStart={handleVideoLoadStart}
              onLoad={handleVideoLoad}
              onBuffer={handleBuffer}
            />
          </TouchableOpacity>
          {mediaData?.data?.description && (
            <ScrollView
              style={styles.descriptionContainer}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <ExpandableText
                text={mediaData?.data?.description || ""}
                maxChars={50}
              />
            </ScrollView>
          )}
        </View>
      </LinearGradient>
    </Modal>
  );
};

const ExpandableText = ({
  text,
  maxChars = 100,
}: {
  text: string;
  maxChars?: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = text.length > maxChars;

  const displayedText =
    expanded || !shouldTruncate
      ? text
      : text.substring(0, maxChars).trim() + "...";

  return (
    <View>
      <AppText
        color={WHITE}
        type={FOURTEEN}
        weight={MEDIUM}
        style={{ lineHeight: 22 }}
      >
        {displayedText}
      </AppText>

      {shouldTruncate && (
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          activeOpacity={0.6}
        >
          <AppText
            style={{ color: colors.buttonBg, marginTop: 5 }}
            weight={BOLD}
          >
            {expanded ? "Read Less" : "Read More"}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ProgressBar = ({
  progressBarWidth,
  progressBarColor,
}: ProgressBarProps) => (
  <View style={styles.progressWrapper}>
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
  data,
  videoRef,
  isVideoReady,
  onLoadStart,
  onLoad,
  onBuffer,
}: MediaContentProps) => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isImageReady, setIsImageReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (
      data?.type === "image" &&
      Array.isArray(data.media_path) &&
      data.media_path.length > 0 &&
      !data?.media_path[0].includes(".mp4")
    ) {
      const uri = IMAGE_PATH1 + data.media_path[0];
      Image.getSize(
        uri,
        (width, height) => {
          if (!mounted) return;
          const ratio = height / width;
          const screenWidth = Screen.Width;
          const screenHeight = screenWidth * ratio;

          setImageSize({ width: screenWidth, height: screenHeight });
          setIsImageReady(true);
        },
        (error) => {
          console.warn("Failed to get image size:", error);
          if (!mounted) return;
          setImageSize({ width: Screen.Width, height: Screen.Width * 0.5625 }); // fallback
          setIsImageReady(true);
        }
      );
    }

    return () => {
      mounted = false;
    };
  }, [data?.media_path]);

  const videoHeight = Screen.Width * (9 / 16);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (
    data.type === "image" &&
    Array.isArray(data.media_path) &&
    !data?.media_path[0].includes(".mp4")
  ) {
    if (!imageSize || !isImageReady) {
      return (
        <View
          style={[
            styles.carouselContainer,
            { justifyContent: "center", alignItems: "center", height: 200 },
          ]}
        >
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      );
    }

    return (
      <View style={[styles.carouselContainer, { height: imageSize.height }]}>
        {data.media_path.length > 1 ? (
          // <Swiper
          //   loop
          //   autoplay
          //   autoplayTimeout={3}
          //   showsPagination
          //   dotColor="#ccc"
          //   activeDotColor={colors.buttonBg}
          //   paginationStyle={{ bottom: -15 }}
          //   removeClippedSubviews={false} // important fix for blinking
          //   loadMinimal
          //   loadMinimalSize={1}
          // >
          //   {data.media_path.map((img, idx) => (
          //     <FastImage
          //       key={idx}
          //       source={{ uri: IMAGE_PATH1 + img }}
          //       style={styles.imageStyle(imageSize)}
          //       resizeMode={FastImage.resizeMode.contain}
          //     />
          //   ))}
          // </Swiper>
          <>
            <Carousel
              width={Screen.Width}
              height={imageSize.height}
              autoPlay
              autoPlayInterval={700}
              scrollAnimationDuration={500}
              loop
              data={data.media_path}
              onSnapToItem={(index) => setCurrentIndex(index)}
              renderItem={({ item }) => (
                <FastImage
                  source={{ uri: IMAGE_PATH1 + item }}
                  style={styles.imageStyle(imageSize)}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )}
            />
            {/* Pagination Dots */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                position: "absolute",
                bottom: -10,
                width: "100%",
              }}
            >
              {data.media_path.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    {
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginHorizontal: 4,
                    },
                    currentIndex === idx
                      ? {
                          backgroundColor: colors.buttonBg,
                          paddingHorizontal: 10,
                        }
                      : {
                          backgroundColor: "#ccc",
                        },
                  ]}
                />
              ))}
            </View>
          </>
        ) : (
          <FastImage
            source={{ uri: IMAGE_PATH1 + data?.media_path[0] }}
            style={styles.imageStyle(imageSize)}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </View>
    );
  }

  if (data.type === "video" || data?.media_path[0].includes(".mp4")) {
    return (
      <View
        style={[styles.media, { width: Screen.Width, height: videoHeight }]}
      >
        {!isVideoReady && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={colors.white} size="large" />
          </View>
        )}
        <Video
          ref={videoRef}
          source={{ uri: IMAGE_PATH1 + data?.media_path[0] }}
          style={{ width: Screen.Width, height: videoHeight }}
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
