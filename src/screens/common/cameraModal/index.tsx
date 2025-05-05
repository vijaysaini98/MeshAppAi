import {
  StyleSheet,
  View,
  Alert,
  Platform,
  Linking,
  Image,
} from "react-native";
import React from "react";
import { AppText, TWELVE, MEDIUM } from "../../../common";
import Modal from "react-native-modal";
import {
  gallery_icon,
  cameras_icon,
  close_ic,
  pdfIcon,
} from "../../../helper/ImageAssets";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import DeviceInfo from "react-native-device-info";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { colors } from "../../../theme/colors";
import { useAppDispatch } from "../../../store/hooks";
import {
  uploadImage,
  uploadSelfieImage,
} from "../../../slices/drSlice/drAction";
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

export const getCameraPermissions = async () => {
  const granted = await request(
    Platform.OS === "android"
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA
  );

  return granted === RESULTS.GRANTED;
};

export const getGalleryPermissions = async () => {
  let systemVersion = DeviceInfo.getSystemVersion();

  const granted = await request(
    Platform.OS === "android"
      ? systemVersion <= "12"
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.IOS.PHOTO_LIBRARY
  );
  return granted === RESULTS.GRANTED || granted === RESULTS.LIMITED;
};

export const createAlert = () =>
  Alert.alert(
    "We required Library permission in order to use access media library.. Please grant us.",
    "",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => Linking.openSettings() },
    ]
  );

const CameraModal = ({
  KycCamraisModalVisible,
  setKycCamraisModalVisible,
  setImage,
  stImgUrl,
  setImageName,
  opnePdf,
  handleUpdateProfile,
  from,
  setDocument,
  isLoading,
}) => {
  const dispatch = useAppDispatch();

  let formData = new FormData();

  const toggleModal = () => {
    setKycCamraisModalVisible(false);
  };

  const processImage = (data) => {
    const _data = {
      uri: data.uri,
      name: data.fileName,
      type: data.type,
    };
    formData.append("image", _data);

    if (setImage && from !== "gst") {
      setImage(data);
    }
    if (stImgUrl && from !== "gst") {
      stImgUrl(data);
    }
    if (setImageName) {
      setImageName(Platform.OS === "android" ? data?.name : data?.type);
    }
    if (from == "gst") {
      setDocument(data?.uri);
    }
    if (from == "mrProfile") {
      dispatch(
        uploadImage(
          formData,
          undefined,
          undefined,
          from,
          undefined,
          handleUpdateProfile
        )
      );
    }
    if (from == "addProduct") {
      // formData.append("image", data);
      dispatch(uploadSelfieImage(formData, isLoading, handleUpdateProfile));
    }
  };

  const openGallery = () => {
    let options: ImageLibraryOptions = {
      mediaType: "photo",
    };
    launchImageLibrary(options)
      .then((image) => {
        setKycCamraisModalVisible(false);
        let temp = image?.assets[0];
        temp["mediaType"] = "image";
        setImage ? setImage(temp) : null;
        // // successCallBack(temp);
        processImage(temp);
      })
      .catch((err) => {
        console.log("err:::", err);
      });
  };

  const checkGallery = () => {
    getGalleryPermissions().then((res) => {
      if (res) {
        openGallery();
      } else {
        createAlert();
      }
    });
  };

  const openCamera = () => {
    let options: CameraOptions = {
      mediaType: "photo",
    };
    launchCamera(options)
      .then((image) => {
        setKycCamraisModalVisible(false);
        let temp = image?.assets[0];
        temp["mediaType"] = "image";
        setImage ? setImage(temp) : null;
        // successCallBack(temp);
        processImage(temp);
      })
      .catch((e) => {
        console.log("e::::", e);
      });
  };

  const checkCamera = () => {
    getCameraPermissions().then((res) => {
      if (res) {
        openCamera();
      } else {
        createAlert();
      }
    });
  };

  const Data = [
    {
      id: 1,
      title: "PDF",
      onPress: () => {
        setKycCamraisModalVisible(false);
        setTimeout(() => {
          opnePdf();
        }, 800);
      },
      icon: pdfIcon,
      isShown: opnePdf,
    },
    {
      id: 2,
      title: "Gallery",
      onPress: () => {
        checkGallery();
      },
      icon: gallery_icon,
      isShown: true,
    },
    {
      id: 3,
      title: "Camera",
      onPress: () => {
        checkCamera();
      },
      icon: cameras_icon,
      isShown: true,
    },
  ];

  return (
    <Modal isVisible={KycCamraisModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacityView onPress={toggleModal}>
          <Image style={styles.closeIcon} source={close_ic} />
        </TouchableOpacityView>
        <View style={styles.subContainer}>
          {Data.map((item, index) =>
            item?.isShown ? (
              <TouchableOpacityView
                key={index}
                style={styles.optionBtnStyle}
                onPress={item?.onPress}
              >
                <Image
                  resizeMode="contain"
                  style={styles.iconStyle}
                  source={item.icon}
                />
                <AppText type={TWELVE} weight={MEDIUM}>
                  {item?.title}
                </AppText>
              </TouchableOpacityView>
            ) : null
          )}
          {/* {opnePdf && (
            <TouchableOpacityView
              style={styles.optionBtnStyle}
              onPress={() => {
                setKycCamraisModalVisible(false);
                setTimeout(() => {
                  opnePdf();
                }, 800);
              }}
            >
              <Image
                resizeMode="contain"
                 style={styles.iconStyle}
                source={pdfIcon}
              />
              <AppText type={TWELVE} weight={MEDIUM}>
                PDF
              </AppText>
            </TouchableOpacityView>
          )}
          <TouchableOpacityView
            style={styles.optionBtnStyle}
            onPress={() => {
              checkGallery()
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.iconStyle}
              source={gallery_icon}
            />
            <AppText type={TWELVE} weight={MEDIUM}>
              Gallery
            </AppText>
          </TouchableOpacityView>
          <TouchableOpacityView
            style={styles.optionBtnStyle}
            onPress={() => {
              checkCamera()
            }}
          >
            <Image
              resizeMode="contain"
               style={styles.iconStyle}
              source={cameras_icon}
            />
            <AppText type={TWELVE} weight={MEDIUM}>
              Camera
            </AppText>
          </TouchableOpacityView> */}
        </View>
      </View>
    </Modal>
  );
};

export default CameraModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    marginTop: "auto",
    height: 120,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  selectText: {
    color: colors.black,
    textAlign: "center",
  },
  subContainer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelButton: {
    height: 45,
    marginHorizontal: 10,
    backgroundColor: "red",
    marginTop: 25,
    borderRadius: 8,
  },
  cancelText: {
    color: colors.white,
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
  },
  closeIcon: {
    height: 55,
    width: 55,
    alignSelf: "flex-end",
    position: "absolute",
    top: -13,
    right: -13,
  },
  iconStyle: {
    height: 40,
    width: 40,
    tintColor: colors.buttonBg,
  },
  optionBtnStyle: {
    alignItems: "center",
  },
});
