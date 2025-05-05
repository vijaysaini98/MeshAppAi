import { FlatList, View, RefreshControl, Platform, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import {
  AppText,
  NORMAL,
  SIXTEEN,
  MEDIUM,
  EIGHTEEN,
  Button,
  FOURTEEN,
} from "../../../../common";
import DropdownComponent from "../../../common/Dropdown";

import { useSelector } from "react-redux";
import { delete_icon, uploadPan } from "../../../../helper/ImageAssets";
import TouchableOpacityView from "../../../../common/TouchableOpacityView";
import { useAppDispatch } from "../../../../store/hooks";
import {
  AddSpeciality,
  DeleteSpecialization,
  DrEditProfile,
  uploadImage,
} from "../../../../slices/drSlice/drAction";
import { AnimationSpinner } from "../../../../animation";
import CameraModal from "../../../common/cameraModal";
import DeleteConfirmationModal from "../../../common/deleteConfirmationModal";
import Pdf from "react-native-pdf";
import { IMAGE_PATH1 } from "../../../../helper/Constants";
import { PDFModal } from "../../../common/PDFModal";

const SpecialityDetail = () => {
  const dispatch = useAppDispatch();

  const { doctorSpeciality, drEditProfile, isLoading, uploadImages } =
    useSelector((state) => {
      return state.doctor;
    });

  const [dataValue, setDataValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [reqdata, setReqData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();
  const [imgUrl, stImgUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [pdfDetails, setPdfDetails] = useState("");
  const [APiResponse, setAPiResponse] = useState("");
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [type, setType] = useState("");

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

  let formData = new FormData();
  useEffect(() => {
    if (imgUrl) {
      const _data = {
        uri: imgUrl.uri,
        name: imgUrl.fileName,
        type: imgUrl.type,
      };
      formData.append("image", _data);
      dispatch(uploadImage(formData, undefined, undefined, "specialty"));
    }
  }, [imgUrl]);

  const getUri = (path) => {
    const data = {
      uri: `${IMAGE_PATH1}${path}`,
    };
    return data;
  };

  const onDelete = (value) => {
    if (type === "document") {
      setAPiResponse("");
      setShowModal(false);
      stImgUrl("");
    } else {
      let data = {
        id: deleteData?.id,
        specialization: deleteData?.specialization,
      };
      dispatch(DeleteSpecialization(data));
      setShowModal(false);
    }
  };

  const onRefresh = () => {
    dispatch(DrEditProfile());
  };

  const toggleModal = () => {
    // setMoredoc(more);
    setModalVisible(!isModalVisible);
    // Alert.alert("hii")
  };

  const openPdf = () => {
    PDFModal(undefined, setAPiResponse, setLoader);
  };

  const onSubmit = () => {
    let data = {
      specialities: [
        {
          speciality_id: dataValue,
          media: uploadImages ? [uploadImages?.path] : [APiResponse],
        },
      ],
    };

    dispatch(AddSpeciality(data));
    stImgUrl("");
    setDataValue("");
    setAPiResponse("");
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.specialityBox}>
        {drEditProfile?.spec_detail.length > 1 && (
          <TouchableOpacityView
            onPress={() => {
              setShowModal(true);
              setType("specialty");
              setDeleteData({
                id: item?.id,
                specialization: item?.speciality[0]?.specialization,
              });
            }}
            style={styles.deleteBtn}
          >
            <Image
              source={delete_icon}
              style={styles.deleteIcon}
              resizeMode="contain"
            />
          </TouchableOpacityView>
        )}
        <View>
          <AppText weight={NORMAL} style={styles.feature} type={SIXTEEN}>
            {item?.speciality[0]?.specialization}
          </AppText>
        </View>
      </View>
    );
  };
  return (
    <>
      {isLoading && <AnimationSpinner />}

      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={2}
          data={drEditProfile?.spec_detail}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{ flex: 1, paddingHorizontal: 10 }}
        />
        <CameraModal
          KycCamraisModalVisible={isModalVisible}
          setKycCamraisModalVisible={setModalVisible}
          setImage={setImage}
          stImgUrl={stImgUrl}
          setImageName={setImageName}
          opnePdf={openPdf}
        />
        <View style={{ marginHorizontal: 16 }}>
          <AppText type={EIGHTEEN} weight={MEDIUM}>
            Add More Specialty
          </AppText>
          <DropdownComponent
            xyz={dataValue}
            isFocus={isFocus}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder={!isFocus ? "Select Speciality" : "..."}
            dropdownPosition={Platform.OS == "ios" ? "top" : "auto"}
            onChange={(item) => {
              setDataValue(item.value);
              setIsFocus(false);
            }}
            data={reqdata}
          />
          {dataValue && (
            <View style={styles.subContainer}>
              {(APiResponse || imgUrl) && (
                <TouchableOpacityView
                  onPress={() => {
                    setType("document");
                    setShowModal(true);
                  }}
                  style={{ alignSelf: "flex-end" }}
                >
                  <Image
                    source={delete_icon}
                    resizeMode="contain"
                    style={{ height: 20, width: 20 }}
                  />
                </TouchableOpacityView>
              )}
              {APiResponse ? (
                APiResponse?.includes(".pdf") && (
                  <View style={styles.uploadImage}>
                    <Pdf
                      source={getUri(APiResponse)}
                      // trustAllCerts={Platform.OS === "ios"}
                      style={styles.uploadImage}
                      trustAllCerts={false}
                    />
                  </View>
                )
              ) : imgUrl ? (
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
                >
                  <Image
                    source={uploadPan}
                    resizeMode="contain"
                    style={styles.selfieCamera}
                  />
                  <AppText type={FOURTEEN} style={styles.textStyle}>
                    Upload Specialty
                  </AppText>
                </TouchableOpacityView>
              )}
            </View>
          )}
          <View style={styles.requestButtonContainer}>
            <Button
              children="Submit"
              disabled={(imgUrl || APiResponse) && dataValue ? false : true}
              onPress={() => onSubmit()}
            />
          </View>
        </View>
      </View>
      <DeleteConfirmationModal
        visible={showModal}
        onDelete={() => onDelete()}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
};

export default SpecialityDetail;
