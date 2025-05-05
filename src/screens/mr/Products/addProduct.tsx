import { Image, Keyboard, StyleSheet, TextInput, View } from "react-native";
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  Input,
  MEDIUM,
  NORMAL,
  SEMI_BOLD,
  SIXTEEN,
  Toolbar,
  TWENTY,
  WHITE,
} from "../../../common";
import { colors } from "../../../theme/colors";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { Cross_icon, SelfieCamera } from "../../../helper/ImageAssets";
import {
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingVertical,
} from "../../../theme/dimens";
import { useEffect, useState } from "react";
import { ImageViewModal } from "../SelfieScreen";
import { fontFamily } from "../../../theme/typography";
import CameraModal from "../../common/cameraModal";
import KeyBoardAware from "../../../common/KeyboardAware";
import { IMAGE_PATH, IMAGE_PATH1 } from "../../../helper/Constants";
import { DocUploadContainer } from "../../common/DocumentUoload";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addProduct, updateProduct } from "../../../slices/mrSlice/mrAction";
import NavigationService from "../../../navigation/NavigationService";
import { AnimationSpinner } from "../../../animation";

const AddProduct = ({ route }) => {
  const { paramsData, from } = route?.params ?? "";

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state?.doctor);

  const [imageFound, setImageFound] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [description, setDescription] = useState(
    paramsData?.description ? paramsData?.description : ""
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState(
    paramsData?.name ? paramsData?.name : ""
  );
  const [media, setMedia] = useState(
    paramsData?.images ? paramsData?.images : []
  );

  const submitBtnDissabled = productName && media && description;

  useEffect(() => {
    if (imageFound) {
      if (imageFound.data && imageFound?.data.length > 0) {
        setMedia((prevMedia) => [...prevMedia, imageFound?.data[0]?.path]);
      } else {
        setMedia((prevMedia) => [...prevMedia, imageFound]);
      }
    }
  }, [imageFound]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();

    if (from == "edit") {
      let data = {
        name: productName,
        images: media,
        description: description,
        product_id: paramsData?.id,
      };
      dispatch(updateProduct(data, handleUpdateSuccess));
    } else {
      let data = {
        name: productName,
        images: media,
        description: description,
      };
      dispatch(addProduct(data, handleSuccessCall));
    }
  };

  const handleSuccessCall = () => {
    setDescription("");
    setMedia([]);
    setProductName("");
    NavigationService.goBack();
  };

  const handleUpdateSuccess = () => {
    NavigationService.goBack();
  };

  const onPressAddMoreDelete = (index) => {
    let newMedia = [...media];
    newMedia?.splice(index, 1);
    setMedia(newMedia);
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView style={styles.mainContainer}>
        <Toolbar title="Add Product" />
        {/* <View style={styles.container}> */}
        <KeyBoardAware style={{ marginBottom: 10 }}>
          <View style={styles.container}>
            <Input
              title={"Product Name"}
              titleStyle={{ fontSize: 16 }}
              required
              value={productName}
              containerStyle={{ marginBottom: 20 }}
              onChangeText={(value) => setProductName(value)}
              placeholder={"Enter Product Name"}
              // icon={location_Icon}
            />
            <AppText type={SIXTEEN} weight={NORMAL} style={{ marginBottom: 5 }}>
              {"Product Image"}
              <AppText style={styles.required}>*</AppText>
            </AppText>
            {media.length === 0 ? (
              <View style={styles.selfieContainer}>
                <TouchableOpacityView
                  onPress={() => setModalVisible(true)}
                  style={{ alignItems: "center" }}
                >
                  <Image
                    source={SelfieCamera}
                    resizeMode="contain"
                    style={styles.selfieCamera}
                  />
                  <AppText type={SIXTEEN} style={styles.textStyle}>
                    Add Product {"\n"} Picture
                    <AppText style={styles.required}>*</AppText>
                  </AppText>
                </TouchableOpacityView>
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <DocUploadContainer
                  type={"more"}
                  data={media}
                  handleDelete={(index) => onPressAddMoreDelete(index)}
                  handleModal={() => {
                    setModalVisible(true);
                  }}
                  title={"ADD MORE"}
                />
              </View>
            )}
            <AppText
              type={SIXTEEN}
              weight={NORMAL}
              style={{ marginTop: 20, marginBottom: 5 }}
            >
              {"Description"}
              <AppText style={styles.required}>*</AppText>
            </AppText>
            {/* <View style={styles.descriptionContainer}> */}
            <TextInput
              placeholderTextColor={colors.place_holder}
              placeholder={"Add Description"}
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              value={description}
              style={[styles.descriptionContainer]}
            />
            {/* </View> */}
            <AppText
              type={FOURTEEN}
              style={{
                alignSelf: "flex-end",
                marginTop: 5,
                marginRight: 5,
                color: description.length > 150 ? colors.red : colors.black,
              }}
            >
              {description.length}
              <AppText>/150</AppText>
            </AppText>
          </View>
        </KeyBoardAware>
        <View style={styles.submitBtnContainer}>
          <Button
            disabled={!submitBtnDissabled}
            containerStyle={styles.submitBtn}
            children={"Submit"}
            onPress={() => handleSubmit()}
          />
        </View>

        <CameraModal
          KycCamraisModalVisible={modalVisible}
          setKycCamraisModalVisible={(thing) => {
            setModalVisible(thing);
          }}
          from={"addProduct"}
          handleUpdateProfile={(data) => setImageFound(data)}
          isLoading={true}
        />
        <ImageViewModal
          isVisible={isVisible}
          imageUrl={imageFound}
          onClose={() => handleClose()}
        />
      </AppSafeAreaView>
    </>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  container: {
    // paddingHorizontal: 16,
    marginTop: 29,
    flex: 1,
  },
  selfieContainer: {
    height: 250,
    borderColor: colors.border,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 16,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  selfieCamera: {
    height: 35,
    width: 39,
  },
  textStyle: {
    textAlign: "center",
    marginTop: 10,
  },
  btnView: {
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
    // marginTop:75,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageFound: {
    height: 240,
    width: 329,
    borderRadius: 8,
  },
  crossBtn: {
    alignSelf: "flex-end",
    position: "absolute",
    zIndex: 1,
    top: -5,
    right: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  crossIcon: {
    height: 16,
    width: 16,
  },
  descriptionContainer: {
    height: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    fontFamily: fontFamily,
    fontSize: 14,
    color: colors.defaultText,
    alignContent: "flex-start",
    textAlignVertical: "top",
  },
  descriptionInput: {
    fontFamily: fontFamily,
    fontSize: 14,
    color: colors.defaultText,
    alignItems: "flex-start",
    // height: inputHeight,
    // flex: 1,
  },
  submitBtnContainer: {
    flex: 0.1,
    paddingHorizontal: universalPaddingHorizontalHigh,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
    paddingVertical: 10,
  },
  submitBtn: {
    backgroundColor: colors.buttonBg,
    alignItems: "center",
    paddingVertical: universalPaddingVertical,
    borderRadius: 8,
  },
  required: {
    color: colors.red,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
