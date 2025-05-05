import { View, RefreshControl, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Profile_Icon,
  bank_icon,
  delete_icon,
  password,
  uploadPan,
} from "../../../../helper/ImageAssets";
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  Input,
} from "../../../../common";
import styles from "./styles";
import DropdownComponent from "../../../common/Dropdown";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  DrEditProfile,
  UpdateDoctorProfile,
  ifscVerify,
  uploadImage,
} from "../../../../slices/drSlice/drAction";
import KeyBoardAware from "../../../../common/KeyboardAware";
import { AnimationSpinner } from "../../../../animation";
import { colors } from "../../../../theme/colors";
import TouchableOpacityView from "../../../../common/TouchableOpacityView";
import CameraModal from "../../../common/cameraModal";
import { PDFModal } from "../../../common/PDFModal";
import { IMAGE_PATH1 } from "../../../../helper/Constants";
import Pdf from "react-native-pdf";
import DeleteConfirmationModal from "../../../common/deleteConfirmationModal";
import { setBankDetails, setUploadImages } from "../../../../slices/drSlice/drSlice";
import Toast from "react-native-simple-toast";

const BankDetail = () => {
  const [dataValue, setDataValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [imgUrl, stImgUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();

  const dispatch = useAppDispatch();
  const { drEditProfile, isLoading, uploadProfileImages, isBtnLoading } = useAppSelector((state) => {
    return state.doctor;
  });

  let formData = new FormData();

  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [accNo, setAccNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [supportedDocument, setSupportedDocument] = useState("");
  const [APiResponse, setAPiResponse] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ifscCodeVerify, setIfscCodeVerify] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (imgUrl) {
      const _data = {
        uri: imgUrl.uri,
        name: imgUrl.fileName,
        type: imgUrl.type,
      };
      formData.append("image", _data);
      dispatch(uploadImage(formData));
    }
  }, [imgUrl]);


  useEffect(() => {
    if (drEditProfile) {
      setName(drEditProfile?.name);
      setBank(drEditProfile?.doctor_details?.bank_name);
      setAccNo(drEditProfile?.doctor_details?.account_number?.toString());
      setIfscCode(drEditProfile?.doctor_details?.ifsc_code);
      setDataValue(drEditProfile?.doctor_details?.account_type);
      setAPiResponse(drEditProfile?.doctor_details?.supporting_documents)
      setBranch(drEditProfile?.doctor_details?.branch_name)
    }
  }, [drEditProfile]);


  const data = [
    { label: "Current", value: "current" },
    { label: "Saving", value: "savings" },
  ];

  const updateApiCall = () => {
    let data = {
      bank_name: bank,
      account_number: accNo?.toString(),
      account_type: dataValue,
      ifsc_code: ifscCode,
      branch_name: branch,

      supporting_documents: APiResponse
        ? APiResponse
        : uploadProfileImages
          ? uploadProfileImages?.path
          : drEditProfile?.doctor_details?.supporting_documents,
    };

    if (!bank) {
      Toast.show("Please Enter Bank Name", Toast.LONG);
    }
    else if (!accNo) {
      Toast.show("Please Enter Account Number", Toast.LONG);
    }
    else if (!ifscCode) {
      Toast.show("Please Enter IFSC Code", Toast.LONG);
    }
    else if (!dataValue) {
      Toast.show("Please Select Account Type", Toast.LONG);
    }
    else if (!supportedDocument && !APiResponse && !imgUrl) {
      Toast.show("Please upload document", Toast.LONG);
    }
    else if (
      bank !== drEditProfile?.doctor_details?.bank_name ||
      accNo !== drEditProfile?.doctor_details?.account_number?.toString() ||
      ifscCode !== drEditProfile?.doctor_details?.ifsc_code ||
      dataValue !== drEditProfile?.doctor_details?.account_type ||
      APiResponse ||
      uploadProfileImages?.path
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
    dispatch(setUploadImages());
    dispatch(setBankDetails())
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    dispatch(DrEditProfile());
  };
  const toggleModal = () => {
    if(!accNo ){
      Toast.show("Please Enter Account Number", Toast.LONG);
    }else{
      setModalVisible(!isModalVisible);
    }
  };
  const openPdf = () => {
    PDFModal(undefined, setAPiResponse, setLoader);
  };
  const getUri = (path) => {
    const data = {
      uri: `${IMAGE_PATH1}${path}`,
    };
    return data;
  };

  const onPressDelete = () => {
    setAPiResponse("");
    stImgUrl("");
    setSupportedDocument("");
    setShowModal(false);
  };

  const handleIfscCodeVerify = () => {
    let data = {
      ifscCode: ifscCode
    }
    dispatch(ifscVerify(data, onIfscSuccess))
  }

  const onIfscSuccess = (data) => {
    setIfscCodeVerify(true)
    setBank(data?.bank)
    setBranch(data?.branch)
  }

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
          <View style={{marginBottom:80}}>
          <Input
            placeholder="Name"
            icon={Profile_Icon}
            value={name}
            onChangeText={(val) => setName(val)}
            editable={false}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Input
              mainContainer={{
                width: "63%",
              }}
              placeholder="IFSC Code"
              icon={password}
              value={ifscCode}
              onChangeText={(value) => setIfscCode(value)}
            />
            <Button
              onPress={() => handleIfscCodeVerify()}
              containerStyle={{
                width: "33%",
                marginTop: 15,
              }}
              children="Check"
              disabled={(ifscCode == null || ifscCode == "") ? true : false}
              loading={isBtnLoading}
            />
          </View>

          {(ifscCodeVerify || bank || branch) &&
            (<>
              <Input
                placeholder="Bank Name"
                icon={bank_icon}
                value={bank}
                onChangeText={(val) => setBank(val)}
              />
              <Input
                placeholder="Branch Name"
                icon={bank_icon}
                value={branch}
                onChangeText={(val) => setBranch(val)}
              />
            </>)}
          <Input
            placeholder="Account Number"
            icon={password}
            value={accNo}
            onChangeText={(val) => setAccNo(val)}
          />

          <View>
            <DropdownComponent
              xyz={dataValue}
              isFocus={isFocus}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              placeholder={
                isFocus
                  ? drEditProfile?.doctor_details?.account_type
                  : "Select"
              }
              onChange={(item) => {
                setDataValue(item.value);
                setIsFocus(false);
              }}
              data={data}
              customPlaceholderStyle={{ color: colors.defaultText }}
            />
          </View>
            <View style={styles.subContainer}>
              {(APiResponse || supportedDocument || imgUrl) && (
                <TouchableOpacityView
                  onPress={() => {setShowModal(true)}}
                  style={{ alignSelf: "flex-end", padding: 10 }}
                >
                  <Image
                    source={delete_icon}
                    resizeMode="contain"
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacityView>
              )}
              {APiResponse ? (
                APiResponse?.includes(".pdf") ? (
                  <View style={styles.uploadImage}>
                    <Pdf
                      source={getUri(APiResponse)}
                      style={styles.pdf}
                      trustAllCerts={false}
                    />
                  </View>
                ) : (
                  <Image
                    source={getUri(APiResponse)}
                    resizeMode="contain"
                    style={styles.uploadImage}
                  />
                )
              ) : supportedDocument && supportedDocument?.includes(".pdf") ? (
                <View style={styles.uploadImage}>
                  <Pdf
                    source={getUri(supportedDocument)}
                    style={styles.pdf}
                    trustAllCerts={false}
                  />
                </View>
              ) : supportedDocument?.includes(".jpeg") ||
                supportedDocument?.includes(".png") ? (
                <Image
                  source={getUri(supportedDocument)}
                  resizeMode="contain"
                  style={styles.uploadImage}
                />
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
                        loader={loader}
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
            {/* )} */}
          </View>
          <View style={styles.buttonContainer}>
        <Button
          children="Save"
          onPress={() => updateApiCall()}
        />
      </View>
        </KeyBoardAware>
        
      </AppSafeAreaView>
     
      <CameraModal
        KycCamraisModalVisible={isModalVisible}
        setKycCamraisModalVisible={setModalVisible}
        setImage={setImage}
        stImgUrl={stImgUrl}
        setImageName={setImageName}
        opnePdf={openPdf}
      />
      <DeleteConfirmationModal
        visible={showModal}
        onDelete={() => onPressDelete()}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default BankDetail;
