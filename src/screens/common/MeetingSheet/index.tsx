import { View, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  AppText,
  BOLD,
  Button,
  FOURTEEN,
  MEDIUM,
  SIXTEEN,
  THIRTY,
} from "../../../common";
import { styles } from "../../../styles/styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  uploadImage,
  uploadSelfieImage,
} from "../../../slices/drSlice/drAction";
import { colors } from "../../../theme/colors";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import {
  Cross_icon,
  SelfieCamera,
  add,
  attachment,
  camera,
} from "../../../helper/ImageAssets";
import CameraModal, { createAlert, getCameraPermissions } from "../cameraModal";
import { PDFModal } from "../PDFModal";
import { IMAGE_PATH1, placeHolderText } from "../../../helper/Constants";
import { fontFamily } from "../../../theme/typography";
import {
  AddSelfie,
  submit_MeetingReport,
} from "../../../slices/mrSlice/mrAction";
import Pdf from "react-native-pdf";
import { Screen } from "../../../theme/dimens";
import Toast from "react-native-simple-toast";
import DocumentPreViewModal from "../DocumentPreViewModal";
import KeyBoardAware from "../../../common/KeyboardAware";
// import ImagePicker from "react-native-image-crop-picker";
import { showError } from "../../../helper/logger";
import { CameraOptions, launchCamera } from "react-native-image-picker";

const CancelImageBtn = ({ handleCancel }: { handleCancel: () => void }) => {
  return (
    <TouchableOpacityView
      onPress={handleCancel}
      style={meetingTypeSheetStyle.cancelImageBtnStyle}
    >
      <Image
        source={Cross_icon}
        resizeMode="contain"
        style={meetingTypeSheetStyle.crossImageStyle}
      />
    </TouchableOpacityView>
  );
};

const MeetingTypeSheet = ({ refSheet, item }) => {
  const { isBtnLoading } = useAppSelector((state) => {
    return state.auth;
  });

  const dispatch = useAppDispatch();
  const inputRef = useRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const [imgUrl, stImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]);
  const [pdfUpload, setPdfUpload] = useState("");
  const [APiResponse, setAPiResponse] = useState("");
  const [uploadedImage, setuploadedImage] = useState([]);
  const [pdfLoader, setPdfLoader] = useState(false);
  const [morePdfLoader, setMorePdfLoader] = useState(false);
  const [preViewData, setPreViewData] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [imagFound, setImageFound] = useState("");

  let formData = new FormData();
  useEffect(() => {
    if (imgUrl) {
      const _data = {
        uri: imgUrl.uri,
        name: imgUrl.fileName,
        type: imgUrl.type,
      };
      formData.append("image", _data);
      dispatch(uploadImage(formData, uploadedImage, setuploadedImage));
    }
  }, [imgUrl]);

  useEffect(() => {
    if (APiResponse) {
      setMedia(media?.concat(APiResponse));
    }
  }, [APiResponse]);

  const openPdf = (type?: string) => {
    if (type === "addMore") {
      PDFModal(undefined, setAPiResponse, setMorePdfLoader);
    } else {
      PDFModal(undefined, setPdfUpload, setPdfLoader);
    }
  };

  const getUri = (path?: string) => {
    const data = {
      uri: `${IMAGE_PATH1}${path}`,
    };
    return data;
  };

  const handleClickDoc = (type?: string) => {
    openPdf(type);
  };

  const handleSubmitMeetLink = () => {
    let data = {
      appointment_id: item?.id,
      meeting_report_doc:
        media?.length || pdfUpload ? [...media, pdfUpload].filter(Boolean) : [],
      description: description ? description : "",
      image: uploadedImage[0] ? uploadedImage[0] : "",
    };
    if (!imagFound && !item?.meeting_details?.selfie) {
      showError("Please add selfie");
      return;
    }

    const cleanObject = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== "")
      );
    };

    data = cleanObject(data);
    dispatch(submit_MeetingReport(data));
    // }
  };

  const handleImageCancel = () => {
    stImgUrl("");
  };

  const handleCancelPdf = (
    type?: string | undefined,
    index?: number | undefined
  ) => {
    if (type === "addMore") {
      let newMedia = [...media];
      newMedia?.splice(index, 1);
      setMedia(newMedia);
    } else {
      setPdfUpload("");
    }
  };

  const handleModal = (type?: string, data?: any) => {
    if (type === "image") {
      setPreViewData(data);
    } else {
      setPreViewData(data);
    }
    setIsVisible(true);
  };

  const handleClose = () => {
    setPreViewData("");
    setIsVisible(false);
  };

  const openCamera = () => {
    let options: CameraOptions = {
      mediaType: "photo",
    };
    launchCamera(options)
      .then((image) => {
        let temp = image?.assets[0];
        temp["mediaType"] = "image";
        setImageFound ? setImageFound(temp) : null;
        // successCallBack(temp);
        let formData = new FormData();
        // formData.append("image", temp);
        const _data = {
          uri: temp.uri,
          name: temp.fileName,
          type: temp.type,
        };
        formData.append("image", _data);
        dispatch(uploadSelfieImage(formData, undefined, addSelfie));
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

  const addSelfie = (data?:any) => {
    let reqData = {
      appointment_id: item?.id,
      selfie: data,
    };

    dispatch(AddSelfie(reqData));
  };

  return (
    <RBSheet
      ref={refSheet}
      height={Screen.Height * 0.9}
      customStyles={{
        wrapper: {
          backgroundColor: colors.sheetBgColor,
        },
        draggableIcon: {
          height: 5,
          backgroundColor: colors.border,
        },
        container: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          elevation: 3,
          backgroundColor: colors.white,
        },
      }}
      closeOnDragDown={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      animationType={"slide"}
      openDuration={200}
      closeDuration={200}
      dragFromTopOnly={true}
      onClose={() => {}}
    >
      <View style={styles.meetingBottom}>
        <KeyBoardAware
          enableOnAndroid={true}
          //  extraScrollHeight={30}
        >
          <AppText
            color={colors.loader}
            style={styles.meetingReport}
            type={THIRTY}
            weight={MEDIUM}
          >
            Meeting Report
          </AppText>
          <View style={meetingTypeSheetStyle.secondContainer}>
            <View>
              <AppText
                type={SIXTEEN}
                weight={MEDIUM}
                color={colors.loader}
                style={meetingTypeSheetStyle.subTitleText}
              >
                {"Selfie"}
                <AppText style={meetingTypeSheetStyle.required}>{"*"}</AppText>
              </AppText>
              <View style={[styles.imageContainer, { marginTop: 10 }]}>
                {imagFound?.uri || item.meeting_details ? (
                  <>
                    <Image
                      source={{
                        uri: item?.meeting_details?.selfie
                          ? `${IMAGE_PATH1}${item.meeting_details.selfie}`
                          : imagFound?.uri,
                      }}
                      resizeMode="cover"
                      style={styles.selfieCamera1}
                    />
                  </>
                ) : (
                  <TouchableOpacityView
                    onPress={() => checkCamera()}
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
            <View>
              <AppText
                type={SIXTEEN}
                weight={MEDIUM}
                color={colors.loader}
                style={meetingTypeSheetStyle.subTitleText}
              >
                Image
              </AppText>
              <View style={{ marginTop: 10 }}>
                {imgUrl && imgUrl?.uri ? (
                  <View style={styles.imageContainer}>
                    {/* <TouchableOpacityView
                      onPress={() => handleImageCancel()}
                      style={meetingTypeSheetStyle.cancelImageBtnStyle}
                    >
                      <Image
                        source={Cross_icon}
                        resizeMode="contain"
                        style={{
                          height: 16,
                          width: 16,
                        }}
                      />
                    </TouchableOpacityView> */}
                    <CancelImageBtn handleCancel={() => handleImageCancel()} />
                    {/* <TouchableOpacityView
                      onPress={() => handleModal("image", imgUrl?.uri)}
                    > */}
                    <Image
                      source={{ uri: imgUrl?.uri }}
                      resizeMode="cover"
                      style={styles.selfieCamera1}
                    />
                    {/* </TouchableOpacityView> */}
                  </View>
                ) : (
                  <TouchableOpacityView
                    onPress={() => setModalVisible(true)}
                    style={styles.imageContainer}
                  >
                    <Image
                      source={camera}
                      style={styles.cameraIcon}
                      resizeMode="contain"
                    />
                    <AppText
                      type={FOURTEEN}
                      color={colors.loader}
                      style={[
                        styles.uploadText,
                        { marginTop: 14, textAlign: "center" },
                      ]}
                    >
                      CLICK TO UPLOAD
                    </AppText>
                  </TouchableOpacityView>
                )}
              </View>
              <CameraModal
                KycCamraisModalVisible={isModalVisible}
                setKycCamraisModalVisible={setModalVisible}
                stImgUrl={stImgUrl}
              />
            </View>
          </View>
          <AppText
            type={SIXTEEN}
            weight={MEDIUM}
            color={colors.loader}
            style={{ marginTop: 21 }}
          >
            Meeting Report Documents
          </AppText>
          <View style={styles.documentContainer}>
            <View style={styles.imageContainer}>
              {pdfUpload ? (
                <View>
                  {/* <TouchableOpacityView
                    onPress={() => handleCancelPdf()}
                    style={{
                      alignSelf: "flex-end",
                      position: "absolute",
                      zIndex: 1,
                      top: 0,
                      left: "80%",
                      borderRadius: 20,
                      backgroundColor: "white",
                      //  right:,
                    }}
                  >
                    <Image
                      source={Cross_icon}
                      resizeMode="contain"
                      style={{
                        height: 16,
                        width: 16,
                      }}
                    />
                  </TouchableOpacityView> */}
                  <CancelImageBtn handleCancel={() => handleCancelPdf()} />
                  <TouchableOpacityView
                    onPress={() => handleModal("pdf", pdfUpload)}
                  >
                    <Pdf
                      source={getUri(pdfUpload)}
                      style={styles.pdf_two}
                      trustAllCerts={false}
                    />
                  </TouchableOpacityView>
                </View>
              ) : (
                <TouchableOpacityView
                  onPress={handleClickDoc}
                  // style={styles.imageContainer}
                  loader={pdfLoader}
                >
                  <Image
                    source={attachment}
                    style={styles.cameraIcon}
                    resizeMode="contain"
                  />
                  <AppText
                    type={FOURTEEN}
                    color={colors.loader}
                    style={[
                      styles.uploadText,
                      { marginTop: 14, textAlign: "center" },
                    ]}
                  >
                    DOCUMENT UPLOAD
                  </AppText>
                </TouchableOpacityView>
              )}
            </View>
            {media?.length !== 0 && (
              <>
                {media?.map((item, index) => {
                  let space = index % 2 !== 0 && { marginRight: 2 };
                  return (
                    <View style={[styles.imageContainer, space]}>
                      {/* <TouchableOpacityView
                        onPress={() => handleCancelPdf("addMore", index)}
                        style={{
                          alignSelf: "flex-end",
                          position: "absolute",
                          zIndex: 1,
                          top: 0,
                          left: "80%",
                          borderRadius: 20,
                          backgroundColor: "white",
                          //  right:,
                        }}
                      >
                        <Image
                          source={Cross_icon}
                          resizeMode="contain"
                          style={{
                            height: 16,
                            width: 16,
                          }}
                        />
                      </TouchableOpacityView> */}
                      <CancelImageBtn
                        handleCancel={() => handleCancelPdf("addMore", index)}
                      />
                      <TouchableOpacityView
                        onPress={() => handleModal("pdf", item)}
                      >
                        <Pdf
                          source={getUri(item)}
                          style={[styles.pdf_two]}
                          trustAllCerts={false}
                        />
                      </TouchableOpacityView>
                    </View>
                  );
                })}
              </>
            )}
            {pdfUpload && (
              <TouchableOpacityView
                onPress={() => handleClickDoc("addMore")}
                style={[styles.imageContainer, { marginLeft: 10 }]}
                loader={morePdfLoader}
              >
                <Image
                  source={add}
                  style={styles.cameraIcon}
                  resizeMode="contain"
                />
                <AppText
                  type={FOURTEEN}
                  color={colors.loader}
                  style={[styles.uploadText, { marginTop: 14 }]}
                >
                  ADD
                </AppText>
                <AppText
                  type={FOURTEEN}
                  color={colors.loader}
                  style={styles.uploadText}
                >
                  MORE
                </AppText>
              </TouchableOpacityView>
            )}
          </View>
          <AppText style={styles.fileSize}>
            File must be less than <AppText weight={BOLD}>4 MB.</AppText>{" "}
          </AppText>
          <AppText>
            Allowed file types:
            <AppText weight={BOLD}>Jpg png txt pdf doc xls.</AppText>{" "}
          </AppText>
          <AppText
            type={SIXTEEN}
            weight={MEDIUM}
            color={colors.loader}
            style={{ marginTop: 21 }}
          >
            Description
          </AppText>
          <TouchableOpacity
            style={styles.typeHereBox}
            onPress={() => inputRef?.current?.focus()}
          >
            <TextInput
              placeholderTextColor={colors.place_holder}
              placeholder={placeHolderText.typeHere}
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              ref={inputRef}
              value={description}
              style={meetingTypeSheetStyle.descInputStyle}
            />
          </TouchableOpacity>
        </KeyBoardAware>
      </View>

      <View style={styles.submitButtonContainer}>
        <Button
          children="Submit"
          containerStyle={styles.submitButton}
          onPress={() => handleSubmitMeetLink()}
          loading={isBtnLoading}
        />
      </View>

      <DocumentPreViewModal
        isVisible={isVisible}
        data={preViewData}
        onClose={() => handleClose()}
      />
    </RBSheet>
  );
};

export default MeetingTypeSheet;

const meetingTypeSheetStyle = StyleSheet.create({
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subTitleText: {
    marginTop: 21,
  },
  required: { color: "red" },
  descInputStyle: {
    fontFamily: fontFamily,
    fontSize: 14,
    color: colors.defaultText,
  },
  cancelImageBtnStyle: {
    alignSelf: "flex-end",
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: "80%",
    borderRadius: 20,
    backgroundColor: "white",
    //  right:,
  },
  crossImageStyle: {
    height: 16,
    width: 16,
  },
});
