import { Image, Keyboard, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  Input,
  MEDIUM,
  SIXTEEN,
  Toolbar,
} from "../../../common";
import styles from "./styles";
;
import {
  camera_icon,
  checkbox_check,
  checkbox_uncheck,
  emailId_Icon,
  location_Icon,
  phoneNumber_Icon,
  Profile_Icon,
  registrationIcon,
} from "../../../helper/ImageAssets";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import KeyBoardAware from "../../../common/KeyboardAware";
import DropdownComponent from "../../common/Dropdown/index";
import {
  addMyProfile,
  addNewSpeciality,
  getSpeciality,
  uploadImage,
} from "../../../slices/drSlice/drAction";
import { useDispatch } from "react-redux";
import { colors } from "../../../theme/colors";
import { IMAGE_PATH1, label, placeHolderText } from "../../../helper/Constants";
import CameraModal from "../../common/cameraModal/index";
import OtpModal from "../../common/OtpModal";
import NavigationService from "../../../navigation/NavigationService";
import {
  WEBVIEWE_SCREEN,
  WELCOME_SCREEN,
} from "../../../navigation/routes";
import { PDFModal } from "../../common/PDFModal";
import {
  aadharVerifyValidateOtps,
  onAadharValidateSendotp,
  onValidateSendotp,
  verifyValidateOtps,
} from "../../../slices/authSlice/authAction";
import { useAppSelector } from "../../../store/hooks";
import {
  setPrivacyPolicy,
  setVerifyOtp,
} from "../../../slices/authSlice/authSlice";
import { AnimationSpinner } from "../../../animation";
import {
  deleteUploadImages,
  setAddUploadImages,
  setAddress,
  setAddressState,
  setCity,
  setEmail,
  setGstNo,
  setHcpiNo,
  setMedicalCouncil,
  setName,
  setPhone,
  setPinCode,
  setRNO,
  setSpeciality,
} from "../../../slices/drSlice/drSlice";
import { validatePhoneNumber } from "../../../helper/utility";
import Toast from "react-native-simple-toast";
import { DocUploadContainer } from "../../common/DocumentUoload";
import { CongratulationsSheet } from "../../../common/CongratulationsSheet";
import { stateMadicalCouncil } from "../../../helper/dummydata";

const cleanObject = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => (v !== ""  && v !== undefined ))
  );
};

const AddMyProfile = ({ route }) => {
  const routeData = route?.params?.data ?? "";

  const [isFocus, setIsFocus] = useState(false);
  const [isMedicalCouncilFocus, setIsMedicalCouncilFocus] = useState(false);
  const [imageName, setImageName] = useState("");
  const dispatch = useDispatch();
  const [reqdata, setReqData] = useState([]);
  const [status, setStatus] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();
  const [imgUrl, stImgUrl] = useState("");
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [consent, setConsent] = useState(false);
  const [optModalType, setOtpModalType] = useState("");
  const [modalType, setModalType] = useState("");
  const [aadharVerifyRes, setAadharVerifyRes] = useState();

  let formData = new FormData();

  const {
    doctorSpeciality,
    uploadProfileImages,
    isLoading,
    uploadDegreeImage,
    uploadHcpiImage,
    uploadGstDoc,
    email,
    name,
    phoneNo,
    rNo,
    aadharNo,
    speciality,
    hcpiNo,
    gstNo,
    city,
    addressState,
    pinCode,
    address,
    medicalCouncil
  } = useAppSelector((state) => {
    return state.doctor;
  });

  const { verifyOtp, isBtnLoading, privacyPolicy } =
    useAppSelector((state) => {
      return state.auth;
    });

  const [media, setMedia] = useState([]);
  const [moredoc, setMoredoc] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [degree, setDegree] = useState("");
  const [hcpiDocument, setHcpiDocument] = useState("");
  const [gstDocument, setGstDocument] = useState("");
  const [type, setType] = useState("");
  const [referalCode, setReferalCode] = useState("");
  
  const bottomSheetRef = useRef<any>(null);

  const [viewimgData, setViewData] = useState({
    profile: "",
    medicalInfo: [],
  });
  useEffect(() => {
    if (imgUrl) {
      const _data = {
        uri: imgUrl.uri,
        name: imgUrl.fileName,
        type: imgUrl.type,
      };
      formData.append("image", _data);
      if (moredoc) {
        let medicaldoc = [...viewimgData.medicalInfo];
        setViewData({ ...viewimgData, medicalInfo: [...medicaldoc, imgUrl] });
        dispatch(uploadImage(formData, media, setMedia));
      } else if (type === "hcpi") {
        dispatch(uploadImage(formData, undefined, undefined, type));
      } else if (type === "degree") {
        dispatch(uploadImage(formData, undefined, undefined, type));
      } else if (type === "aadhar") {
        dispatch(uploadImage(formData, undefined, undefined, type));
      } else if (type === "gst") {
        dispatch(uploadImage(formData, undefined, undefined, type));
      } else {
        dispatch(uploadImage(formData, undefined, undefined, undefined));
      }
      setMoredoc("");
    }
  }, [imgUrl]);

  useEffect(() => {
    dispatch(getSpeciality());
  }, []);

  useEffect(() => {
    if (doctorSpeciality?.length) {
      const data = doctorSpeciality?.map((item) => {
        return {
          value: item?.id,
          label: item?.specialization,
        };
      });

      setReqData(data);
    }
  }, [doctorSpeciality]);

  const doctorCondition =
    name &&
    email &&
    phoneNo &&
    speciality &&
    rNo &&
    uploadProfileImages?.path &&
    medicalCouncil &&
    privacyPolicy;

  const onSubmit = () => {
    setModalVisible1(false);
    let data = {
      name: name,
      avatar: uploadProfileImages?.path,
      email: email,
      mobile_number: phoneNo,
      speciality: speciality,
      registration_number: medicalCouncil+rNo,
      address: address,
      pincode: pinCode,
      city: city,
      state: addressState,
      mbbs_degree: uploadDegreeImage?.path ? uploadDegreeImage?.path : degree,
      media: media,
      id: routeData?.id ?? null,
      hcpi_number: hcpiNo,
      gst_in: gstNo,
      gst_in_document: uploadGstDoc.path ? uploadGstDoc.path : gstDocument,
      supporting_documents_hcpi_number: uploadHcpiImage?.path
        ? uploadHcpiImage?.path
        : hcpiDocument,
      referral_code: referalCode,
    };

    data = cleanObject(data);
    Keyboard.dismiss();
    dispatch(addMyProfile(data, successCallBack));

  };
  

  const successCallBack = () => {
    setTimeout(()=>{
      bottomSheetRef?.current?.open();
    },300)
  };

  const toggleModal = (more?: any) => {
    setMoredoc(more);
    setModalVisible(!isModalVisible);
    setType("profile");
  };

  const [pdfDetails, setPdfDetails] = useState("");
  const [APiResponse, setAPiResponse] = useState("");

  const [loader, setLoader] = useState(false);
  const [openPDF, setIsOpenPDF] = useState(false);

  const [customOption, setCustomOption] = useState("");

  const openPdf = (pdfType) => {
    if (type === "hcpi" && pdfType === undefined) {
      PDFModal(undefined, setHcpiDocument, setLoader, handlePdfSucess);
    } else if (type === "degree" && pdfType === undefined) {
      PDFModal(undefined, setDegree, setLoader, handlePdfSucess);
    } else if (type === "aadhar" && pdfType === undefined) {
      PDFModal(undefined, setAadhar, setLoader, handlePdfSucess);
    } else if (type === "gst" && pdfType === undefined) {
      PDFModal(undefined, setGstDocument, setLoader, handlePdfSucess);
    } else if (pdfType === "moreDocs") {
      PDFModal(setPdfDetails, setAPiResponse, setLoader, undefined);
    }
  };

  const handlePdfSucess = (responseJson) => {
    let uploadData = responseJson?.data[0];
    uploadData.uploadType = type;
    dispatch(setAddUploadImages(uploadData));
  };

  useEffect(() => {
    if (pdfDetails) {
      if (viewimgData.medicalInfo?.length) {
        let medicaldoc = [...viewimgData.medicalInfo, pdfDetails];

        setViewData({ ...viewimgData, medicalInfo: medicaldoc });
      } else {
        setViewData({ ...viewimgData, medicalInfo: [pdfDetails] });
      }
    }
  }, [pdfDetails]);

  useEffect(() => {
    if (APiResponse) {
      if (APiResponse.data && APiResponse?.data.length > 0) {
        setMedia((prevMedia) => [...prevMedia, APiResponse?.data[0]?.path]);
      } else {
        setMedia((prevMedia) => [...prevMedia, APiResponse]);
      }
    }
  }, [APiResponse]);

  const [otp, setOtp] = useState("");

  const handleOTPChange = (code) => {
    setOtp(code);
  };

  const openModal = (type) => {
    setOtpModalType(type);
    if (type == "phone") {
      if (!doctorCondition) {
        // if (false) {
        setStatus(true);
      } else if (phoneNo === "") {
        Toast.show("Please Enter Phone Number", Toast.LONG);
      } else if (!validatePhoneNumber(phoneNo)) {
        Toast.show("Phone Number Must be 10-Digit", Toast.LONG);
      } else {
        let data = {
          id: routeData?.id ?? null,
          phone: phoneNo,
          email: email,
        };
        dispatch(onValidateSendotp(data, handleOnSuccess));
      }
    } 
  };

  const aadharSuccess = (response) => {
    setAadharVerifyRes(response);
    setModalVisible1(true);
  };

  const handleOnSuccess = () => {
    setModalVisible1(!isModalVisible1);
    Keyboard.dismiss();
  };

  const handleResendOtp = () => {
    let data = {
      aadharNo: aadharNo,
      consent: consent ? "Y" : "N",
    };
    dispatch(onAadharValidateSendotp(data, aadharSuccess));
  };

  const verifyValidateOtp = () => {
    Keyboard.dismiss();
    if (optModalType == "phone") {
      let data = {
        id: routeData?.id ?? null,
        otp: otp,
        phone: phoneNo,
      };

      dispatch(verifyValidateOtps(data, onSubmit));
    } else if (optModalType == "aadhar") {
      let data = {
        otp: otp,
        accessKey: aadharVerifyRes?.requestId,
        aadhaarNo: aadharNo,
        consent: consent ? "Y" : "N",
        caseid: aadharVerifyRes?.clientData?.caseId,
      };
      dispatch(aadharVerifyValidateOtps(data, handleOtpSucess));
      // setOtpModalType("")
    }
  };

  const handleOtpSucess = () => {
    setModalVisible1(false);
    setOtpModalType("");
  };

  const onPressDelete = (type) => {
    if (type === "hcpi") {
      setHcpiDocument("");
      dispatch(deleteUploadImages(type, {}));
      setType("");
    } else if (type === "aadhar") {
      setAadhar("");
      dispatch(deleteUploadImages(type, {}));
      setType("");
    } else if (type === "gst") {
      setGstDocument("");
      dispatch(deleteUploadImages(type, {}));
      setType("");
    } else {
      setDegree("");
      dispatch(deleteUploadImages(type, {}));
      setType("");
    }
  };

  const onPressAddMoreDelete = (index) => {
    let newMedia = [...media];
    newMedia?.splice(index, 1);
    setMedia(newMedia);
  };

  const handleAddNewSpeciality = () => {
    let data = {
      specialization: customOption,
    };
    dispatch(addNewSpeciality(data, addNewSpecialitySuccess));
  };

  const addNewSpecialitySuccess = (id?: number) => {
    dispatch(setSpeciality(id));
    setCustomOption("");
  };

  return (
    <>
      <AppSafeAreaView style={styles.mainContainer}>
        {(isLoading || loader) && <AnimationSpinner />}
        <Toolbar title="Add My Profile" />
        <View style={styles.subContainer}>
          <TouchableOpacityView
            onPress={() => toggleModal()}
            style={styles.selfieContainer}
          >
            {uploadProfileImages?.path ? (
              <Image
                source={{
                  uri: IMAGE_PATH1 + uploadProfileImages?.path,
                }}
                resizeMode="contain"
                style={styles.selfieCamera1}
              />
            ) : (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={camera_icon}
                  resizeMode="contain"
                  style={styles.selfieCamera}
                />
                <AppText type={FOURTEEN} style={styles.textStyle}>
                  Add Profile{"\n"}Picture
                  <AppText style={{ color: "red" }}>*</AppText>
                </AppText>
              </View>
            )}
          </TouchableOpacityView>
        </View>
        <KeyBoardAware>
          <View style={{ marginHorizontal: 10 }}>
            <Input
              title={"Name"}
              required
              value={name}
              onChangeText={(value) => dispatch(setName(value))}
              placeholder="Name"
              icon={Profile_Icon}
              editable={routeData?.name ? false : true}
            />
            <Input
              placeholder="Email Id"
              title={"Email"}
              required
              icon={emailId_Icon}
              value={email}
              onChangeText={(value) => dispatch(setEmail(value))}
              inputMode="email"
            />
            <Input
              title={"Phone Number"}
              required
              placeholder="Phone Number"
              icon={phoneNumber_Icon}
              value={phoneNo}
              onChangeText={(value) => dispatch(setPhone(value))}
              keyboardType="numeric"
              maxLength={10}
              verifyIcon={verifyOtp}
              editable={!verifyOtp}
              editInput={verifyOtp}
              onPressEditInput={() => {
                dispatch(setVerifyOtp(false));
              }}
            />

            <View>
              <DropdownComponent
                title={"Speciality"}
                required
                xyz={speciality}
                isFocus={isFocus}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholder={!isFocus ? "Select Speciality" : "..."}
                onChange={(item) => {
                  dispatch(setSpeciality(item?.value));
                  setIsFocus(false);
                }}
                data={reqdata}
              />
              {speciality === 98 && (
                <View
                  style={[styles.verificationFieldStyle, { marginTop: 15 }]}
                >
                  <Input
                    mainContainer={styles.phoneNoStyle}
                    containerStyle={{ marginTop: 0 }}
                    placeholder="Enter your speciality"
                    value={customOption}
                    onChangeText={setCustomOption}
                    onSubmitEditing={handleAddNewSpeciality}
                  />
                  <Button
                    onPress={() => {
                      handleAddNewSpeciality();
                    }}
                    containerStyle={{ width: "35%" }}
                    children="Add"
                    disabled={customOption ? false : true}
                  />
                </View>
              )}
            </View>
            <DropdownComponent
                title={"Medical Council"}
                required
                xyz={medicalCouncil}
                isFocus={isMedicalCouncilFocus}
                onFocus={() => setIsMedicalCouncilFocus(true)}
                onBlur={() => setIsMedicalCouncilFocus(false)}
                placeholder={!isMedicalCouncilFocus ? "Select Speciality" : "..."}
                onChange={(item) => {
                  dispatch(setMedicalCouncil(item?.value));
                  setIsMedicalCouncilFocus(false);
                }}
                data={stateMadicalCouncil}
              />
            <Input
              title="Registration Number"
              required
              placeholder="Registration No"
              icon={registrationIcon}
              value={rNo}
              onChangeText={(value) => dispatch(setRNO(value))}
            />
            <Input
              title="HCPI Number"
              value={hcpiNo}
              onChangeText={(value) => dispatch(setHcpiNo(value))}
              placeholder="HCPI No"
            />
            <Input
              title="GST Number"
              value={gstNo}
              onChangeText={(value) => dispatch(setGstNo(value))}
              placeholder="GST No"
            />
            <Input
              title="Address"
              // required
              value={address}
              onChangeText={(value) => dispatch(setAddress(value))}
              placeholder="Address"
              icon={location_Icon}
            />
            <Input
              title="City"
              value={city}
              onChangeText={(value) => dispatch(setCity(value))}
              placeholder="City"
              icon={location_Icon}
            />
            <Input
              title="State"
              value={addressState}
              onChangeText={(value) => dispatch(setAddressState(value))}
              placeholder="State"
              icon={location_Icon}
            />
            <Input
              title="PinCode"
              value={pinCode}
              onChangeText={(value) => dispatch(setPinCode(value))}
              placeholder="Pin Code"
              icon={location_Icon}
              keyboardType={"numeric"}
              maxLength={6}
            />
            <Input
              title={label.referralCode}
              value={referalCode}
              onChangeText={(value) => setReferalCode(value)}
              placeholder={placeHolderText.referralCode}
            />
          </View>
          <AppText style={styles.registrationText} type={SIXTEEN}>
            Upload- medical registration
          </AppText>
          <View style={styles.documentContainerStyle}>
            {/* hcpi Document */}
            <DocUploadContainer
              data={uploadHcpiImage}
              handleDelete={() => onPressDelete("hcpi")}
              handleModal={() => {
                setIsOpenPDF(true);
                setModalVisible(true);
                setType("hcpi");
              }}
              title={"ADD HCPI Document"}
            />
            {/* degreeDocument */}
            <DocUploadContainer
              data={uploadDegreeImage}
              handleDelete={() => onPressDelete("degree")}
              handleModal={() => {
                setIsOpenPDF(true);
                setModalVisible(true);
                setType("degree");
              }}
              title={"ADD MBBS DEGREE"}
            />
            {gstNo !== "" && (
              <DocUploadContainer
                data={uploadGstDoc}
                handleDelete={() => onPressDelete("gst")}
                handleModal={() => {
                  setIsOpenPDF(true);
                  setModalVisible(true);
                  setType("gst");
                }}
                title={"ADD GST Document"}
              />
            )}
            <DocUploadContainer
              type={"more"}
              data={media}
              handleDelete={(index) => onPressAddMoreDelete(index)}
              handleModal={() => {
                setType("");
                openPdf("moreDocs");
              }}
              title={"ADD MORE"}
            />
            <View style={styles.privacyPolicyContainer}>
              <TouchableOpacityView
                onPress={() => dispatch(setPrivacyPolicy(!privacyPolicy))}
                style={{}}
              >
                <Image
                  source={privacyPolicy ? checkbox_check : checkbox_uncheck}
                  style={{ width: 18, height: 18, marginEnd: 10 }}
                  tintColor={colors.buttonBg}
                />
              </TouchableOpacityView>
              <AppText
                weight={MEDIUM}
                type={FOURTEEN}
                onPress={() => {
                  NavigationService.navigate(WEBVIEWE_SCREEN, {
                    type: "doctor",
                  });
                }}
              >
                {"Accept Our"}
                <AppText
                  weight={MEDIUM}
                  type={FOURTEEN}
                  style={styles.policyLink}
                >
                  {" "}
                  {"Privacy Policy/Self Declaration"}
                </AppText>
                <AppText type={FOURTEEN} style={{ color: "red" }}>
                  {"*"}
                </AppText>
              </AppText>
            </View>
          </View>
          <View style={styles.btnView}>
            <Button
              disabled={!doctorCondition}
              children="Submit"
              onPress={() => {
                if (!verifyOtp) {
                  setModalType("OtpModal");
                  openModal("phone");
                  setOtpModalType("phone");
                } else {
                  onSubmit();
                }
              }}
              loading={isLoading || (isBtnLoading && doctorCondition)}
            />
          </View>
        </KeyBoardAware>

        <CameraModal
          KycCamraisModalVisible={isModalVisible}
          setKycCamraisModalVisible={(thing) => {
            setModalVisible(thing);
            setIsOpenPDF(false);
          }}
          setImage={setImage}
          stImgUrl={stImgUrl}
          setImageName={setImageName}
          opnePdf={openPDF && openPdf}
        />
      </AppSafeAreaView>
       <CongratulationsSheet sheetRef={bottomSheetRef} />
      <OtpModal
        isModalVisible={isModalVisible1}
        onBackdropPress={() => {
          setModalVisible1(false);
          setOtp("");
        }}
        onBackButtonPress={() => {
          setModalVisible1(false);
          setOtp("");
        }}
        handleTextChange={handleOTPChange}
        onPress={() => verifyValidateOtp()}
        handleResendOtp={() => handleResendOtp()}
        disabled={
          optModalType == "addhar"
            ? otp.length < 6
            : otp.length < 4
            ? true
            : false
        }
        optModalType={optModalType}
        modalType={modalType}
        handleWaytoLogin={() => {
          setModalType("");
          NavigationService.navigate(WELCOME_SCREEN);
        }}
      />
    </>
  );
};

export default AddMyProfile;
