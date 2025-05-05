import { View, RefreshControl, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Profile_Icon,
  password,
  uploadPan,
  delete_icon,
} from "../../../../helper/ImageAssets";
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  Input,
} from "../../../../common";
import styles from "./styles";
import TouchableOpacityView from "../../../../common/TouchableOpacityView";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  DrEditProfile,
  UpdateDoctorProfile,
  uploadImage,
} from "../../../../slices/drSlice/drAction";
import KeyBoardAware from "../../../../common/KeyboardAware";
import { AnimationSpinner } from "../../../../animation";
import CameraModal from "../../../common/cameraModal";
import Pdf from "react-native-pdf";
import { IMAGE_PATH1 } from "../../../../helper/Constants";
import { PDFModal } from "../../../common/PDFModal";
import DeleteConfirmationModal from "../../../common/deleteConfirmationModal";


const getUri = (path) => {
  const data = {
    uri: `${IMAGE_PATH1}${path}`,
  };
  return data;
};

const PanCardDetail = () => {
  

  const dispatch = useAppDispatch();
  const { drEditProfile, isLoading } = useAppSelector((state) => {
    return state.doctor;
  });

  const [supportedDocument, setSupportedDocument] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState();
  const [panNo, setPanNo] = useState();
  const [address, setAddress] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [imgUrl, stImgUrl] = useState("");
  const [APiResponse, setAPiResponse] = useState("");
  const [showModal,setShowModal]=useState(false)
  const [loader, setLoader] = useState(false);


  useEffect(() => {
    if (drEditProfile) {
      setName(drEditProfile?.name);
      setPanNo(drEditProfile?.doctor_details?.pan_number?.toString());
      setAddress(drEditProfile?.user_details?.address ? drEditProfile?.user_details?.address : "");
      setSupportedDocument(drEditProfile?.doctor_details?.pan_card);
      setAPiResponse(drEditProfile?.doctor_details?.pan_card)
    }
  }, [drEditProfile]);

  useEffect(() => {
    if (imgUrl) {
      const _data = {
        uri: imgUrl.uri,
        name: imgUrl.fileName,
        type: imgUrl.type,
      };
      formData.append("image", _data);
      dispatch(uploadImage(formData, "selfi", setAPiResponse));
    }
  }, [imgUrl]);


  const onRefresh = () => {
    dispatch(DrEditProfile());
  };

  const openPdf = () => {
    PDFModal(undefined, setAPiResponse, setLoader);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  let formData = new FormData();

  const updateApiCall = () => {
    let data = {
      address: address,
      pan_number:panNo,
      pan_card: APiResponse?.data
        ? APiResponse?.data[0]?.path
        : APiResponse
        ? APiResponse
        : drEditProfile?.doctor_details?.pan_card,
    };

    if (!supportedDocument && !APiResponse) {
      return Alert.alert("Please Upload Support Document");
    }
    if (
      address !== drEditProfile?.user_details?.address ||
      supportedDocument !== drEditProfile?.doctor_details?.pan_card ||
      APiResponse
    ) {

    const cleanObject = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== "")
      );
    };

    data = cleanObject(data);
      dispatch(UpdateDoctorProfile(data, successCallback));
    }
  };

  const successCallback = () => {
    setAPiResponse("");
  };

  const onPressDelete = (index) => {
    setAPiResponse("");
    stImgUrl("");
    setSupportedDocument("");
    setShowModal(false)
  };

  
  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView style={styles.container}>
        <KeyBoardAware
          isSecond
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Input
            placeholder="Full Name"
            icon={Profile_Icon}
            value={name}
            onChangeText={(val) => setName(val)}
            editable={false}
          />
          <Input
            placeholder="Pan Number"
            icon={password}
            value={panNo}
            onChangeText={(val) => setPanNo(val)}
            editable={true}
          />

          <View style={styles.subContainer}>
            {(APiResponse || imgUrl) && (
              <TouchableOpacityView
                onPress={() => setShowModal(true)}
                style={{ alignSelf: "flex-end" ,padding:10}}
              >
                <Image
                  source={delete_icon}
                  resizeMode="contain"
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacityView>
            )}
            {APiResponse ? (
              (!APiResponse?.includes(".jpeg")
              && !APiResponse?.includes(".png") 
              && APiResponse?.includes(".pdf")
              ) ? (
                <View style={styles.uploadImage}>
                  <Pdf
                    source={getUri(APiResponse)}
                    style={styles.pdf}
                    trustAllCerts={false}
                  />
                </View>
              ) : 
              <View style={styles.uploadImage}>
              <Image
                source={getUri(APiResponse)}
                resizeMode="contain"
                style={styles.uploadImage}
              />
              </View>
            ) 
            : APiResponse?.includes(".jpeg") ||
              APiResponse?.includes(".png") ? (
              <Image
                source={getUri(APiResponse)}
                resizeMode="contain"
                style={styles.uploadImage}
              />
            ) : (
              <View style={styles.subContainer}>
                {imgUrl ? (
                  <Image
                    source={{ uri: imgUrl?.uri }}
                    resizeMode="contain"
                    style={styles.uploadImage}
                  />
                ) : (
                  <TouchableOpacityView
                    onPress={() => toggleModal()}
                    style={styles.selfieContainer}
                    disable={loader}
                  >
                    <Image
                      source={uploadPan}
                      resizeMode="contain"
                      style={styles.selfieCamera}
                    />

                    <AppText type={FOURTEEN} style={styles.textStyle}>
                      Upload Documents
                    </AppText>
                  </TouchableOpacityView>
                )}
              </View>
            )}
          </View>
          <CameraModal
            KycCamraisModalVisible={isModalVisible}
            setKycCamraisModalVisible={setModalVisible}
            stImgUrl={stImgUrl}
            opnePdf={openPdf}
          />
        </KeyBoardAware>
      </AppSafeAreaView>
      <View style={styles.buttonContainer}>
        <Button children="Save" onPress={() => updateApiCall()} />
      </View>
      <DeleteConfirmationModal
      visible={showModal}
      onDelete={()=>onPressDelete()}
      onCancel={()=>setShowModal(false)}
      />
    </>
  );
};

export default PanCardDetail;
