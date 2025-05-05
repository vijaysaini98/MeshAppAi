/* eslint-disable prettier/prettier */
import { Image, RefreshControl, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Profile_Icon,
  emailId_Icon,
  location_Icon,
  phoneNumber_Icon,
  gstICon,
  profileEdit,
  DummyDoctor,
} from "../../../../helper/ImageAssets";
import styles from "./styles";
import { AppSafeAreaView, Button, Input } from "../../../../common";
import KeyBoardAware from "../../../../common/KeyboardAware";
import { useDispatch } from "react-redux";
import {
  DrEditProfile,
  UpdateDoctorProfile,
  uploadImage,
} from "../../../../slices/drSlice/drAction";
import { useIsFocused } from "@react-navigation/native";
import { useAppSelector } from "../../../../store/hooks";
import {
  onValidateSendotp,
  verifyValidateOtps,
} from "../../../../slices/authSlice/authAction";
import Toast from "react-native-simple-toast";
import { AnimationSpinner } from "../../../../animation";
import { IMAGE_PATH1 } from "../../../../helper/Constants";
import TouchableOpacityView from "../../../../common/TouchableOpacityView";
import { PDFModal } from "../../../common/PDFModal";
import CameraModal from "../../../common/cameraModal";
import { DocUploadContainer } from "../../../common/DocumentUoload";
import {
  deleteUploadImages,
  setAddUploadImages,
} from "../../../../slices/drSlice/drSlice";
import { colors } from "../../../../theme/colors";

const PersonalDetail = () => {
  const dispatch = useDispatch();
  const {
    drEditProfile,
    isLoading,
    uploadImages,
    uploadProfileImages,
    uploadGstDoc,
    uploadDegreeImage,
    uploadAadharImage,
    uploadHcpiImage,
  } = useAppSelector((state) => {
    return state.doctor;
  });

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pinCode, setPinCode] = useState();
  const [gstNo, setGstNo] = useState();
  const [hcpiNo, setHcpiNo] = useState();
  const [aadhar, setAadhar] = useState({});
  const [aadharDetails, setAadharDetails] = useState("");
  const [degreeDetails, setDegreeDetails] = useState("");
  const [hcpiDocument, setHcpiDocument] = useState("");
  const [degree, setDegree] = useState({});
  const [type, setType] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();
  const [imgUrl, stImgUrl] = useState("");
  const [openPDF, setIsOpenPDF] = useState(false);
  const [imageName, setImageName] = useState("");
  const [moredoc, setMoredoc] = useState("");
  const [gstDocument, setGstDocument] = useState("");

  let formData = new FormData();

  const [fee, setFee] = useState<string | null>();

  const [isModalVisible1, setModalVisible1] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOTPChange = (code) => {
    setOtp(code);
  };
  const { loginData } = useAppSelector((state) => {
    return state.auth;
  });

  const verifyValidateOtp = () => {
    let data = {
      id: loginData?.id,
      otp: otp,
    };
    dispatch(verifyValidateOtps(data, setModalVisible1));
  };
  let focus = useIsFocused();

  const openModal = () => {
    if (phoneNo.length !== 10) {
      return Toast.show("Please Enter Walid phonenumber...", Toast.LONG);
    }
    let data = {
      phone: phoneNo,
    };
    dispatch(onValidateSendotp(data));
    setModalVisible1(!isModalVisible1);
  };

  const openPdf = (pdfType) => {
    if (type === "hcpi" && pdfType === undefined) {
      PDFModal(setDegreeDetails, setHcpiDocument, setLoader, handlePdfSucess);
    } else if (type === "degree" && pdfType === undefined) {
      PDFModal(setDegreeDetails, setDegree, setLoader, handlePdfSucess);
    } else if (type === "aadhar" && pdfType === undefined) {
      PDFModal(setAadharDetails, setAadhar, setLoader, handlePdfSucess);
    } else if (type === "gst" && pdfType === undefined) {
      PDFModal(setAadharDetails, setGstDocument, setLoader, handlePdfSucess);
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
    // setMedia()
    if (APiResponse) {
      setMedia([...media, APiResponse?.data[0]?.path]);
    }
  }, [APiResponse]);

  useEffect(() => {
    if (drEditProfile) {
      setName(drEditProfile?.name);
      setEmail(drEditProfile?.email);
      setPhoneNo(drEditProfile?.phone?.toString());
      setAddress(
        drEditProfile?.user_details?.address
          ? drEditProfile?.user_details?.address
          : ""
      );
      setFee(
        drEditProfile?.doctor_details?.fees
          ? drEditProfile?.doctor_details?.fees?.toString()
          : ""
      );
      setGstNo(
        drEditProfile?.user_details?.gst_in
          ? drEditProfile?.user_details?.gst_in
          : ""
      );
      setCity(
        drEditProfile?.user_details?.city
          ? drEditProfile?.user_details?.city
          : ""
      );
      setState(
        drEditProfile?.user_details?.state
          ? drEditProfile?.user_details?.state
          : ""
      );
      setPinCode(
        drEditProfile?.user_details?.pin_code
          ? drEditProfile?.user_details?.pin_code.toString()
          : ""
      );
      setHcpiNo(
        drEditProfile?.user_details?.hcpi_number
          ? drEditProfile?.user_details?.hcpi_number
          : ""
      );
    }
  }, [drEditProfile]);

  const updateApiCall = () => {
    if (fee <= 0) {
      return Toast.show(
        "Please enter a valid fee amount greater than zero.",
        Toast.LONG
      );
    }

    let data = {
      fees: fee,
      city: city,
      state: state,
      address: address,
      pin_code: pinCode,
      hcpi_number: hcpiNo,
      media: media,
      avatar: uploadProfileImages?.path,
      aadhar: uploadAadharImage?.path,
      mbbs_degree: uploadDegreeImage?.path,
      supporting_documents_hcpi_number: uploadHcpiImage?.path
        ? uploadHcpiImage?.path
        : hcpiDocument,
    };
    if (gstNo) {
      data.gst_in = gstNo;
      if (gstDocument || uploadGstDoc.path) {
        data.gst_in_document = uploadGstDoc.path
          ? uploadGstDoc.path
          : gstDocument;
      }
    }

    const cleanObject = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== "")
      );
    };

    data = cleanObject(data);

    dispatch(UpdateDoctorProfile(data));
    // }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    dispatch(DrEditProfile());
  };

  const [pdfDetails, setPdfDetails] = useState("");
  const [APiResponse, setAPiResponse] = useState("");

  const [loader, setLoader] = useState(false);

  const [viewimgData, setViewData] = useState({
    profile: "",
    medicalInfo: [],
  });
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
      setMedia([...media, APiResponse?.data[0]?.path]);
    }
  }, [APiResponse]);
  const [media, setMedia] = useState([]);

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

  const onPressAddMoreDelete = (index) => {
    let newMedia = [...media];
    newMedia?.splice(index, 1);
    setMedia(newMedia);
  };

  const toggleModal = (more?: any) => {
    setMoredoc(more);
    setModalVisible(!isModalVisible);
    setType("camera");
  };

  const onPressDelete = (type) => {
    if (type === "hcpi") {
      setHcpiDocument("");
      dispatch(deleteUploadImages(type, {}));
      setType("");
    } else if (type === "aadhar") {
      setAadharDetails("");
      setAadhar("");
      dispatch(deleteUploadImages(type, {}));
      setType("");
    } else if (type === "gst") {
      setGstDocument("");
      dispatch(deleteUploadImages(type, {}));
      setType("");
    } else {
      setDegreeDetails("");
      setDegree("");
      dispatch(deleteUploadImages(type, {}));
      setType("");
    }
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
          <View
            style={{
              alignItems: "center",
              height: 150,
              width: 150,
              alignSelf: "center",
              marginTop: 25,
              borderRadius: 100,
              borderColor: colors.bg_one_dark,
            }}
          >
            {uploadProfileImages ? (
              <Image
                source={{
                  uri: uploadProfileImages.path
                    ? IMAGE_PATH1 + uploadProfileImages?.path
                    : IMAGE_PATH1 + uploadProfileImages,
                }}
                resizeMode="cover"
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={DummyDoctor}
                style={styles.profileImage}
                resizeMode="cover"
              />
            )}
            <TouchableOpacityView
              onPress={() => toggleModal()}
              style={styles.camera}
            >
              <Image
                source={profileEdit}
                style={{ height: 20, width: 20 }}
                resizeMode="cover"
              />
            </TouchableOpacityView>
          </View>
          <View style={styles.box}>
            <Input
              placeholder="Name"
              icon={Profile_Icon}
              value={name}
              onChangeText={(val) => setName(val)}
              editable={false}
            />
            <Input
              placeholder="Email"
              icon={emailId_Icon}
              value={email}
              onChangeText={(val) => setEmail(val)}
              editable={false}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Input
                mainContainer={{
                  width:
                    drEditProfile?.phone?.toString() !== phoneNo
                      ? "63%"
                      : "100%",
                }}
                placeholder="Phone Number"
                icon={phoneNumber_Icon}
                value={phoneNo}
                onChangeText={(val) => setPhoneNo(val)}
                keyboardType={"number-pad"}
                editable={false}
              />
            </View>
            <Input
              placeholder="Hcpi Number"
              // icon={emailId_Icon}
              value={hcpiNo}
              onChangeText={(val) => setHcpiNo(val)}
              // editable={false}
            />
            {/* <Input
              placeholder="Fees"
              icon={rs_Icon}
              value={fee}
              onChangeText={(val) => setFee(val)}
              keyboardType={"number-pad"}
            /> */}
            <Input
              placeholder="GST Number"
              icon={gstICon}
              value={gstNo}
              onChangeText={(val) => setGstNo(val)}
              // keyboardType={"number-pad"}
              // editable={true}
            />
            <Input
              placeholder="City"
              icon={location_Icon}
              value={city}
              onChangeText={(val) => setCity(val)}
            />
            <Input
              placeholder="State"
              icon={location_Icon}
              value={state}
              onChangeText={(val) => setState(val)}
            />
            <Input
              placeholder="Area"
              icon={location_Icon}
              value={address}
              onChangeText={(val) => setAddress(val)}
            />
            <Input
              placeholder="Pincode"
              icon={location_Icon}
              value={pinCode}
              onChangeText={(val) => setPinCode(val)}
              keyboardType="number-pad"
            />
            {/* <ScrollView horizontal={true}> */}
            <View
              style={{
                // marginBottom: 100,
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                width: "100%",
                gap: 10,
                marginTop: 10,
                // justifyContent: "space-between",
              }}
            >
              {/* hcpiDocument */}
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

              {/* // Adhar Document */}
              <DocUploadContainer
                data={uploadAadharImage}
                handleDelete={() => onPressDelete("aadhar")}
                handleModal={() => {
                  setIsOpenPDF(true);
                  setModalVisible(true);
                  setType("aadhar");
                }}
                title={"ADD AADHAR CARD"}
              />

              {/* Gst Document */}
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
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button children="Save" onPress={() => updateApiCall()} />
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
    </>
  );
};

export default PersonalDetail;
