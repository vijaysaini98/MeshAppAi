import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { AppText, BOLD, FOURTEEN, SEMI_BOLD, TWELVE } from "../../../common";
import Swiper from "react-native-swiper";
import { colors } from "../../../theme/colors";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { Cross_icon } from "../../../helper/ImageAssets";
import { IMAGE_PATH1 } from "../../../helper/Constants";
import { useAppSelector } from "../../../store/hooks";
import FastImage from 'react-native-fast-image'

const ProductModal = ({ isModalVisible, onClose }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const { appointmentProductData } = useAppSelector((state) => state?.doctor);

  useEffect(() => {
    let timer;
    if (isModalVisible) {
      setCountdown(5);
      setShowCloseButton(false);
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
  }, [isModalVisible]);

  const renderProductSlide = useCallback(
    (item, productIndex) => (
      <View key={productIndex} style={styles.productSlide}>
        <AppText type={FOURTEEN} weight={SEMI_BOLD}>
          {`Product Name: ${item?.name}`}
        </AppText>
        <Swiper
          loop
          autoplay
          autoplayTimeout={3}
          showsPagination={false}
          style={styles.imageSwiper}
        >
          {item?.images?.map((image, imageIndex) => (
            <View key={imageIndex} style={styles.imageSlide}>
              <FastImage
                source={{ uri: IMAGE_PATH1 + image }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ))}
        </Swiper>
        <View style={styles.descriptionContainer}>
          <AppText type={FOURTEEN} weight={SEMI_BOLD}>
            {item?.description}
          </AppText>
        </View>
      </View>
    ),
    []
  );

  const productSlides = useMemo(
    () => appointmentProductData?.map(renderProductSlide),
    [appointmentProductData, renderProductSlide]
  );

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={showCloseButton ? onClose : null}
      style={styles.modal}
    >
      <View style={styles.absoluteFill}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {showCloseButton ? (
            <TouchableOpacityView onPress={onClose} style={styles.closeButton}>
              <Image source={Cross_icon} style={styles.closeIcon} />
            </TouchableOpacityView>
          ) : (
            <View style={styles.countdownContainer}>
              <AppText
                type={TWELVE}
                weight={BOLD}
                style={styles.countdownText}
              >{`Close in ${countdown}s`}</AppText>
            </View>
          )}

          <Swiper
            loop={false}
            showsPagination
            dotColor="#ccc"
            activeDotColor={colors.buttonBg}
            paginationStyle={{ bottom: 15 }}
          >
            {productSlides}
          </Swiper>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  absoluteFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingVertical:Platform.OS == "ios" ? 40 :20
  },
  scrollContent: {
    flexGrow: 1,
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 999,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  productSlide: {
    height: 400,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 30,
  },
  imageSwiper: {
    height: 300,
  },
  imageSlide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: colors.white,
  },
  countdownContainer: {
    position: "absolute",
    right: 5,
    top: 15,
    zIndex: 999,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 5,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  countdownText: {
    fontSize: 14,
    color: colors.buttonBg,
  },
});
