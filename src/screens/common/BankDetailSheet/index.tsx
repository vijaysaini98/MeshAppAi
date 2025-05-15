import { View, Platform, Image, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  AppText,
  Button,
  FOURTEEN,
  Input,
  SEMI_BOLD,
  TWENTY_FOUR,
} from "../../../common";
import { styles } from "../../../styles/styles";
import RBSheet from "react-native-raw-bottom-sheet";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ifscVerify } from "../../../slices/drSlice/drAction";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { colors } from "../../../theme/colors";
import { IMAGE_PATH1 } from "../../../helper/Constants";
import { ScrollView } from "react-native-gesture-handler";
import {
  Cross_icon,
  Profile_Icon,
  bank_icon,
  camera_icon,
  password,
} from "../../../helper/ImageAssets";
import DropdownComponent from "../Dropdown";
import { PDFModal } from "../PDFModal";
import Pdf from "react-native-pdf";
import {
  MrProfileData,
  mrAddBankDetails,
} from "../../../slices/mrSlice/mrAction";
import Toast from "react-native-simple-toast";

const BankDetailSheet = ({
  refSheet,
  id,
}: {
  refSheet: any;
  id: number | undefined;
}) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef();

  const { mrBankDetails } = useAppSelector((state) => {
    return state.mr;
  });

  const { isBtnLoading } = useAppSelector((state) => {
    return state.auth;
  });

  const [dataValue, setDataValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bankName, setBankName] = useState("");
  const [branch, setBranch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [pdfDetails, setPdfDetails] = useState("");
  const [APiResponse, setAPiResponse] = useState("");
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  const [ifscCodeVerify, setIfscCodeVerify] = useState(false);

  useEffect(() => {
    if (mrBankDetails) {
      setFullName(mrBankDetails?.full_name ? mrBankDetails?.full_name : "");
      setBankName(mrBankDetails?.bank_name ? mrBankDetails?.bank_name : "");
      setAccountNumber(
        mrBankDetails?.account_number
          ? mrBankDetails?.account_number?.toString()
          : ""
      );
      setDataValue(
        mrBankDetails?.account_type ? mrBankDetails?.account_type : ""
      );
      setIfscCode(mrBankDetails?.ifsc_code ? mrBankDetails?.ifsc_code : "");
      setPanNumber(mrBankDetails?.pan_number ? mrBankDetails?.pan_number : "");
      setAPiResponse(
        mrBankDetails?.supporting_documents
          ? mrBankDetails?.supporting_documents
          : ""
      );
      setPdfDetails(
        mrBankDetails?.supporting_documents
          ? mrBankDetails?.supporting_documents
          : ""
      );
    }
  }, [mrBankDetails]);

  const data = [
    { label: "Current", value: "Current" },
    { label: "Saving", value: "Saving" },
  ];

  const openPdf = () => {
    PDFModal(setPdfDetails, setAPiResponse, setLoader);
  };

  const getUri = (path) => {
    const data = {
      uri: `${IMAGE_PATH1}${path}`,
    };
    return data;
  };
  const handleSubmit = () => {
    setButtonLoader(true);
    if (bankName === "") {
      Toast.show("Bank Name field required", Toast.LONG);
      setButtonLoader(false);
    } else if (fullName === "") {
      Toast.show("Full Name field required", Toast.LONG);
      setButtonLoader(false);
    } else if (accountNumber === "") {
      Toast.show("Account Number field required", Toast.LONG);
      setButtonLoader(false);
    } else if (dataValue === "") {
      Toast.show("Please select account type", Toast.LONG);
      setButtonLoader(false);
    } else if (!APiResponse) {
      Toast.show("Please Upload the document", Toast.LONG);
      setButtonLoader(false);
    } else {
      let data = {
        bank_name: bankName,
        account_number: accountNumber,
        account_type: dataValue,
        pan_no: panNumber,
        supporting_documents: APiResponse && APiResponse,
        full_name: fullName,
        ifsc_code: ifscCode,
        branch_name: branch,
      };

      dispatch(mrAddBankDetails(data, successCallBack));
    }
  };

  const successCallBack = () => {
    dispatch(MrProfileData());
    setTimeout(() => {
      setButtonLoader(false);
      refSheet.current.close();
    }, 1500);
  };

  const onPressDelete = () => {
    setAPiResponse("");
  };

  const handleIfscCodeVerify = () => {
    let data = {
      ifscCode: ifscCode,
    };
    dispatch(ifscVerify(data, onIfscSuccess));
  };

  const onIfscSuccess = (data) => {
    setIfscCodeVerify(true);
    setBankName(data?.bank);
    setBranch(data?.branch);
  };

  return (
    <RBSheet
      ref={refSheet}
      height={650}
      closeOnDragDown={true}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: colors.rbSheetBackgroung,
        },
        draggableIcon: {
          backgroundColor: "silver",
          width: 100,
        },
      }}
    >
      <View style={bankDetailSheetStyles.container}>
        <AppText
          type={TWENTY_FOUR}
          weight={SEMI_BOLD}
          style={styles.sendMessageBottomSheet}
        >
          Add Bank Detail
        </AppText>
        <ScrollView
          style={styles.rejectionBox}
          contentContainerStyle={bankDetailSheetStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Input
              value={fullName}
              placeholderColor={colors.defaultText}
              placeholder="Full Name"
              icon={Profile_Icon}
              onChangeText={(text) => setFullName(text)}
            />

            <View style={bankDetailSheetStyles.fromContainer}>
              <Input
                mainContainer={bankDetailSheetStyles.ifscInput}
                placeholder="IFSC Code"
                icon={password}
                value={ifscCode}
                onChangeText={(value) => setIfscCode(value)}
              />
              <Button
                onPress={() => handleIfscCodeVerify()}
                containerStyle={bankDetailSheetStyles.validateBtn}
                children="Validate"
                disabled={ifscCode == null || ifscCode == "" ? true : false}
                loading={isBtnLoading}
              />
            </View>
            {(ifscCodeVerify || bankName || branch) && (
              <>
                <Input
                  placeholder="Bank Name"
                  icon={bank_icon}
                  value={bankName}
                  onChangeText={(val) => setBankName(val)}
                  editable={false}
                />
                <Input
                  placeholder="Branch Name"
                  icon={bank_icon}
                  value={branch}
                  onChangeText={(val) => setBranch(val)}
                  editable={false}
                />
              </>
            )}
            <Input
              value={accountNumber}
              placeholderColor={colors.defaultText}
              placeholder="Account Number"
              icon={password}
              onChangeText={(text) => setAccountNumber(text)}
              maxLength={18}
            />

            <View>
              <DropdownComponent
                xyz={dataValue}
                isFocus={isFocus}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                placeholder="Account Type"
                onChange={(item) => {
                  setDataValue(item.value);
                  setIsFocus(false);
                }}
                data={data}
                customPlaceholderStyle={{ color: colors.defaultText }}
              />
            </View>
            <Input
              value={panNumber}
              placeholderColor={colors.defaultText}
              placeholder="Pan Number"
              onChangeText={(text) => setPanNumber(text)}
            />

            <View style={styles.subContainer1}>
              <View
                // onPress={() => openPdf()}
                style={styles.selfieContainer}
              >
                {pdfDetails && APiResponse ? (
                  <>
                    {APiResponse && (
                      <>
                        <TouchableOpacityView
                          onPress={() => onPressDelete()}
                          style={bankDetailSheetStyles.docCancelBtn}
                        >
                          <Image
                            source={Cross_icon}
                            resizeMode="contain"
                            style={bankDetailSheetStyles.crossIconStyle}
                          />
                        </TouchableOpacityView>
                        <Pdf
                          source={getUri(APiResponse)}
                          // source={getUri(APiResponse?.data)}
                          trustAllCerts={Platform.OS === "ios"}
                          onLoadComplete={(numberOfPages, filePath) => {}}
                          style={styles.pdf}
                          trustAllCerts={false}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <View style={bankDetailSheetStyles.addDocContainer}>
                    <TouchableOpacityView
                      onPress={() => openPdf()}
                      style={styles.selfieContainer}
                    >
                      <Image
                        source={camera_icon}
                        resizeMode="contain"
                        style={styles.selfieCamera}
                      />
                      <AppText type={FOURTEEN} style={styles.textStyle}>
                        ADD {"\n"} DOCUMENT{" "}
                        <AppText style={{ color: "red" }}>*</AppText>
                      </AppText>
                    </TouchableOpacityView>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.sendMessageSubmitButton}>
        <Button
          containerStyle={styles.submit}
          children="Submit"
          onPress={() => handleSubmit()}
          loading={buttonLoader}
        />
      </View>
    </RBSheet>
  );
};

export default BankDetailSheet;

const bankDetailSheetStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  fromContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ifscInput: {
    width: "63%",
  },
  validateBtn: {
    width: "33%",
    marginTop: 15,
  },
  docCancelBtn: {
    alignSelf: "flex-end",
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 2,
  },
  crossIconStyle: {
    height: 16,
    width: 16,
  },
  addDocContainer: {
    alignItems: "center",
  },
});
