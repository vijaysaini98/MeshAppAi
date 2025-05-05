import { View, Alert, Modal, Image } from "react-native";
import React, { useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  Button,
  SIXTEEN,
  Toolbar,
} from "../../../common";
import styles from "./styles";
;
import { Cross_icon, SelfieCamera } from "../../../helper/ImageAssets";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
// import ImagePicker from "react-native-image-crop-picker";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { uploadSelfieImage } from "../../../slices/drSlice/drAction";
import NavigationService from "../../../navigation/NavigationService";
import {
  MR_APPOINTMENT_SCREEN,
} from "../../../navigation/routes";
import { AddSelfie } from "../../../slices/mrSlice/mrAction";
import { AnimationSpinner } from "../../../animation";
import { SectionListhangeMrTabScreen } from "../../../slices/mrSlice/mrSlice";
import { createAlert, getCameraPermissions } from "../../common/cameraModal";
import { CameraOptions, launchCamera } from "react-native-image-picker";

const Selfie = ({ route }) => {
  const dispatch = useAppDispatch();
  const [imagFound, setImageFound] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { appointment_id } = route?.params ?? "";

  const { isLoading } = useAppSelector((state) => {
    return state.mr;
  });

  // const openCamera = () => {
  //   setTimeout(() => {
  //     ImagePicker.openCamera({
  //       width: 500,
  //       height: 600,
  //       cropping: true,
  //       compressImageQuality: 1.0, 
  //     })
  //       .then(async (image) => {

  //         const data = {
  //           uri: image.path,
  //           name: image.modificationDate + "." + image.mime.split("/")[1],
  //           type: image.mime,
  //         };
  //         setImageFound(data);
  //       })
  //       .catch(() => {});
  //   }, 1000);
  // };



  const openCamera = () => {
    let options: CameraOptions = {
      mediaType: 'photo',
    };
    launchCamera(options)
      .then(image => {
        let temp = image?.assets[0];
        temp['mediaType'] = 'image';
        setImageFound ? setImageFound(temp) : null;
        // successCallBack(temp);
          // let formData = new FormData();
          // formData.append("image", temp);
          // dispatch(uploadSelfieImage(formData, undefined, addSelfie));
      })
      .catch(e => {
        console.log('e::::', e);
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

  const onPressNext = () => {
    if (!imagFound?.uri) {
      Alert.alert("Please upload image");
    } else {
      const _data = {
        uri: imagFound.uri,
        name: imagFound.fileName,
        type: imagFound.type,
      };
      let formData = new FormData();
      formData.append("image", _data);
      dispatch(uploadSelfieImage(formData,isLoading, successCallback));
    }
  };

  const successCallback = (data) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    let reqData = {
      appointment_id: appointment_id,
      selfie: data,
    };
    dispatch(AddSelfie(reqData,isLoading, selfisuccess));
  };

  const selfisuccess = () => {
    NavigationService.navigate(MR_APPOINTMENT_SCREEN);
    dispatch(SectionListhangeMrTabScreen(2));
  };

  const onPressCancel = () => {
    setImageFound("");
  };
  const handleModal = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}

      <AppSafeAreaView style={styles.mainContainer}>
        <Toolbar title="Selfie" noBack={true} />
        <View style={styles.subContainer}>
          <View
            style={styles.selfieContainer}
          >
            {imagFound?.uri ? (
              <>
                <TouchableOpacityView
                  onPress={() => onPressCancel()}
                  style={styles.crossBtn}
                >
                  <Image
                    resizeMode="contain"
                    source={Cross_icon}
                    style={styles.crossIcon}
                  />
                </TouchableOpacityView>
                <TouchableOpacityView onPress={() => handleModal()}>
                  <Image
                    source={{ uri: imagFound?.uri }}
                    resizeMode="cover"
                    style={styles.imageFound}
                  />
                </TouchableOpacityView>
              </>
            ) : (
              <TouchableOpacityView
                onPress={() => openCamera()}
                style={{ alignItems: "center" }}
              >
                <Image
                  source={SelfieCamera}
                  resizeMode="contain"
                  style={styles.selfieCamera}
                />
                <AppText type={SIXTEEN} style={styles.textStyle}>
                  Take a Selfie of {"\n"} the location
                </AppText>
              </TouchableOpacityView>
            )}
          </View>
        </View>
        <View style={styles.btnView}>
          <Button children="Next" onPress={() => onPressNext()} />
        </View>
        <ImageViewModal
          isVisible={isVisible}
          imageUrl={imagFound?.uri}
          onClose={() => handleClose()}
        />
      </AppSafeAreaView>
    </>
  );
};

export default Selfie;

export const ImageViewModal = ({ imageUrl, isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacityView onPress={onClose} style={styles.closeButton}>
          <Image
            resizeMode="cover"
            source={Cross_icon}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacityView>
        <View style={styles.modal}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      </View>
    </Modal>
  );
};