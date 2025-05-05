import { Dispatch } from "redux";
import { appOperation } from "../../appOperation";
import {
  SectionListhangeMrTabScreen,
  SetPaymentRecord,
  removeProduct,
  setAppointmentType,
  setCompletedAppointmentType,
  setDoctorPaymentHistoryData,
  setLoading,
  setMeetingReport,
  setMrBankDetails,
  setMrCompany,
  setMrCompanyZone,
  setMrProfileData,
  setNearByDoctor,
  setNearByProfile,
  setNotificationListing,
  setOngoingAppointmentType,
  setPaymentHistoryData,
  setPaymentLoader,
  setPaymentReceiptData,
  setProductList,
  setProfileTimeSlot,
  setRazorPayKey,
  setRefundAppointmentType,
  setRejectedAppointmentType,
  setSpecificTimeSlotFound,
  setUpcomingAppointmentType,
  setUpdateOngoingAppointmentType,
  setUpdateUpcomingAppointmentType,
} from "./mrSlice";
import { setLoading as setAuthIsLoading } from "../authSlice/authSlice";
import Toast from "react-native-simple-toast";
import NavigationService from "../../navigation/NavigationService";
import {
  ADD_MR,
  MR_APPOINTMENT_SCREEN,
  MR_HOME_SCREEN,
  PAYMENT_SUCCESS_SCREEN,
} from "../../navigation/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN_KEY } from "../../helper/Constants";
import RNFetchBlob from "react-native-blob-util";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { AppDispatch } from "../../store/store";
import { showError } from "../../helper/logger";
import { config } from "../../../config/config";
import { setBtnLoading } from "../authSlice/authSlice";
import DeviceInfo from "react-native-device-info";
import { logOut } from "../authSlice/authAction";

export const mrAppointmentType =
  (value: any, from?: string) => async (dispatch: Dispatch<any>) => {
    try {
      // from != "Completed" &&
      dispatch(setAppointmentType([]));
      dispatch(setOngoingAppointmentType([]));
      dispatch(setCompletedAppointmentType([]));
      dispatch(setRejectedAppointmentType([]));
      dispatch(setRefundAppointmentType([]));
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.mr_appointment_type(
        value
      );

      if (response?.code === 200) {
        if (value === "Pending") {
          dispatch(setAppointmentType(response?.data));
          dispatch(setOngoingAppointmentType([]));
          dispatch(setCompletedAppointmentType([]));
          dispatch(setRejectedAppointmentType([]));
          dispatch(setRefundAppointmentType([]));
        } else if (value === "Ongoing") {
          dispatch(setAppointmentType([]));
          dispatch(setOngoingAppointmentType(response?.data));
          dispatch(setCompletedAppointmentType([]));
          dispatch(setRejectedAppointmentType([]));
          dispatch(setRefundAppointmentType([]));
        } else if (value === "Completed") {
          dispatch(setAppointmentType([]));
          dispatch(setOngoingAppointmentType([]));
          dispatch(setCompletedAppointmentType(response?.data));
          dispatch(setRejectedAppointmentType([]));
          dispatch(setRefundAppointmentType([]));
        } else if (value === "Upcoming") {
          // dispatch(setAppointmentType(response?.data));
          dispatch(setUpcomingAppointmentType(response?.data));
        } else if (value === "Rejected") {
          dispatch(setAppointmentType([]));
          dispatch(setOngoingAppointmentType([]));
          dispatch(setCompletedAppointmentType([]));
          dispatch(setRejectedAppointmentType(response?.data));
          dispatch(setRefundAppointmentType([]));
        } else {
          dispatch(setAppointmentType([]));
          dispatch(setOngoingAppointmentType([]));
          dispatch(setCompletedAppointmentType([]));
          dispatch(setRejectedAppointmentType([]));
          dispatch(setRefundAppointmentType(response?.data));
        }
      }
    } catch (e: any) {
      console.log("mrAppointmentType Errror==>>", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const mrNearByDoctor =
  (value: any, search: string | undefined) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.mr_near_by_doctor(
        value,
        search
      );
      
      if (response?.code === 200) {
        dispatch(setNearByDoctor(response?.data[0]?.near_by_doctor));
        dispatch(setNearByProfile(response?.data[0]));
      }
    } catch (e: any) {
      console.log("error====>>>", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const serachMrAPI =
  (data: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.serach_mr(data);

      if (response?.code === 200) {
        dispatch(setNearByDoctor(response?.data));
      }
    } catch (e: any) {
      console.log("error in search", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const drProfileTimeSlot =
  (value: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.dr_profile_timeSlot(value)
      console.log("drProfileTimeSlotresponse",response);
      
      if(response.success){
        dispatch(setProfileTimeSlot(response?.data));
      }else{
        Toast.show(response?.message, Toast.LONG);
      }
      // const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
      // fetch(
      //   `${config.WEBSITE_URL}appointment/get-time-slots?doctor_id=${value}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // )
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     dispatch(setProfileTimeSlot(data?.data));
      //   })
      //   .catch((error) => {
      //     console.error("There was a problem with the fetch operation:", error);
      //   });
    } catch (e: any) {
      console.log("Error of dr profile timeSlot", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const requestAppointment =
  (data: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.request_appointment(
        data
      );
      if (response?.success) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(mrAppointmentType("Pending"));
        dispatch(SectionListhangeMrTabScreen(0));
        NavigationService.navigate(MR_APPOINTMENT_SCREEN);
        // dispatch(setProfileTimeSlot(response?.data));
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      // Toast.show(e?.message, Toast.LONG);
      showError(e?.message);
      console.log("Error of request_appointment", e);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const resheduleAppointment =
  (data: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.reschedule_appointment(
        data
      );
      if (response?.success) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(mrAppointmentType("Pending"));
        // dispatch(SectionListhangeMrTabScreen(0));
        NavigationService.goBack();
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      // Toast.show(e?.message, Toast.LONG);
      showError(e?.message);
      console.log("Error of reshedule_appointment", e);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const MrProfileData =
  (data: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.mr_profile_data();

      if (response?.code === 200) {
        dispatch(setMrProfileData(response?.data));
        dispatch(setMrBankDetails(response?.data?.user_bank_details));
      }
      // else{
      //   dispatch(logOut())
      // }
    } catch (e: any) {
      console.log("Mr Profile Error =>>", e);
      if (e.code == 401) {
        dispatch(logOut())
        }
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateMrProfile =
  (data: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.mr_update_profile(data);
      if (response?.code === 200) {
        showError(response?.message);
        dispatch(MrProfileData());
      }
    } catch (e: any) {
      console.log("Error===>>>",e);
      
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const submit_MeetingReport =
  (value: any) => async (dispatch: Dispatch<any>) => {
    try {
      // dispatch(setLoading(true));
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.add_report(value);
      if (response?.code === 200) {
        dispatch(setCompletedAppointmentType([]));
        dispatch(mrAppointmentType("Completed"));
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("submit_MeetingReporterrror", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      // dispatch(setLoading(false));
      dispatch(setBtnLoading(false));
    }
  };

export const EndMeeting =
  (data: any, successCallBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.end_meeting(data);
      if (response?.code === 200) {
        dispatch(setBtnLoading(false));
        // dispatch(setNearByDoctor(response?.data[0]?.near_by_doctor));
        // dispatch(setNearByProfile(response?.data[0]));
        if (successCallBack) {
          successCallBack();
        }
      }
    } catch (e: any) {
      console.log("Mr EndMeeting Error===>>",e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setBtnLoading(false));
      dispatch(setLoading(false));
    }
  };

export const requestRefund =
  (data: any, from?: string, successCallBack?: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.request_refund(data);
      if (response?.code === 200) {
        dispatch(setBtnLoading(false));
        // dispatch(setNearByDoctor(response?.data[0]?.near_by_doctor));
        // dispatch(setNearByProfile(response?.data[0]));
        if (from == "upcoming") {
          dispatch(setUpdateUpcomingAppointmentType(data));
        } else {
          dispatch(setUpdateOngoingAppointmentType(data));
          if (successCallBack) {
            successCallBack();
          }
        }
        showError(response?.message);
      }
    } catch (e: any) {
      console.log("e==>>",e);
      
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setBtnLoading(false));
      dispatch(setLoading(false));
    }
  };

export const sendMessage = (data: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.send_message(data);
    if (response?.code === 200) {
      Toast.show(response?.message, Toast.LONG);
    }
  } catch (e: any) {
    console.log("error=====>>>", e);
    Toast.show(e?.message, Toast.LONG);
  } finally {
    dispatch(setLoading(false));
  }
};

export const ViewMeetingReport =
  (data: any) => async (dispatch: Dispatch<any>) => {
    dispatch(setMeetingReport([]));

    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.view_meeting_report(
        data
      );
      if (response?.code === 200) {
        dispatch(setMeetingReport(response?.data));
      }
    } catch (e: any) {
      console.log("ViewMeetingReportError", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const AddSelfie =
  (data: any | string, isLoading?: boolean, selfisuccess?: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      isLoading && dispatch(setLoading(true));

      const response: any = await appOperation.customer.add_selfie(data);
      if (response?.success) {
        if (selfisuccess) {
          selfisuccess();
        }
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("Selfi Error", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      isLoading && dispatch(setLoading(false));
    }
  };

export const downloadMeetingReport =
  (data?: any) => async (dispatch: AppDispatch) => {
    try {
      let systemVersion = DeviceInfo.getSystemVersion();
      dispatch(setLoading(true));
      const { fs } = RNFetchBlob;
      const date = new Date();
      const fileDir =
        Platform.OS === "android" ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
      const token = await AsyncStorage.getItem(USER_TOKEN_KEY);

      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "This app needs access to your storage to download files.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (
          granted !== PermissionsAndroid.RESULTS.GRANTED &&
          systemVersion < "13"
        ) {
          Alert.alert(
            "Permission Denied",
            "Storage permission is required to download the report."
          );
          return;
        }
      }

      let url = `${config.WEBSITE_URL}mr/download-report?address=${
        data?.address
      }&appointment_id=${data?.appointment_id}&description=${
        data?.description
      }&doc_image=${data?.doc_image}&doctor_name=${
        data?.doctor_name
      }&meeting_image=${data?.meeting_image ?? ""}&selfie_image=${
        data?.selfie_image ?? ""
      }&pdf_urls=${JSON.stringify(data?.pdf_urls)}&speciality=${JSON.stringify(
        data?.speciality
      )}`;

      console.log("url:::::::", url);
      console.log("url:::::::", token);

      console.log("urldownload ====>>> ", url);

      const filePath = `${fileDir}/download_${date.getTime()}.zip`;

      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: "File Download",
        },
        path: filePath,
      })
        .fetch("GET", url, {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ? token : ""}`,
        })
        .progress({ count: 10 }, (received, total) => {
          console.log("progress", received, total);
        })
        .then(async (response) => {
          dispatch(setLoading(false));
          console.log("response:::::::", JSON.stringify(response));
          Toast.show("Meeting Report Downloaded Successfully", Toast.LONG);
          if (Platform.OS == "ios") {
            RNFetchBlob.ios.previewDocument("file://" + response?.data);
          }
        })
        .catch((error) => {
          console.log("error of download invoice", error);
          dispatch(setLoading(false));
        });
    } catch (e: any) {
      console.log("Error of viewInvoice invoice", e);
      dispatch(setLoading(false));
    } finally {
      // dispatch(setLoading(false));
    }
  };

export const payNow = (data: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.pay_now(data);
    if (response?.code === 200) {
      Toast.show(response?.message, Toast.LONG);
      NavigationService.navigate(MR_HOME_SCREEN);
    }
  } catch (e: any) {
  } finally {
    dispatch(setLoading(false));
  }
};

export const specificTimeSlot =
  (id: any, date: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      dispatch(setSpecificTimeSlotFound([]));
      const response: any = await appOperation.customer.specific_timeSlot(
        id,
        date
      );

      if (response?.code === 200) {
        dispatch(setSpecificTimeSlotFound(response?.data));
      }
    } catch (e: any) {
      console.log("Error of dr specific_timeSlot", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const CancelMeeting =
  (data: string, successCallBack: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));

      const response: any = await appOperation.customer.cancel_meeting(data);

      if (response?.code === 200) {
        if (successCallBack) {
          successCallBack();
        }
        Toast.show(response?.message, Toast.LONG);
        // dispatch(SectionListhangeMrTabScreen(0));
        // NavigationService.navigate(MR_APPOINTMENT_SCREEN);
      }
    } catch (e: any) {
      console.log("e==>>",e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createPayment =
  (data: any, drData: any, successCallback: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      if (data?.amount === "0") {
        showError("Fees not added by doctor");
        return;
      }
      dispatch(setPaymentLoader(true));

      const response: any = await appOperation.customer.create_payment(data);
      if (response?.code === 200 && response?.success) {
        dispatch(SetPaymentRecord(response?.data));

        if (successCallback) {
          successCallback(response?.data, data, drData);
        }
      }
    } catch (e: any) {
      console.log("createPaymentError=====>>>", e);
    } finally {
      dispatch(setPaymentLoader(false));
    }
  };

export const VerifyPayment =
  (data: any, postedData: any, drData: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setPaymentLoader(true));
      dispatch(setLoading(true));

      const response: any = await appOperation.customer.verify_payment(data);

      if (response?.code === 200 && response.success) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(SetPaymentRecord(response?.data));
        dispatch(mrAppointmentType("Pending"));

        NavigationService.navigate(PAYMENT_SUCCESS_SCREEN, {
          amount: postedData?.amount,
          drData: drData,
          data: response?.data,
        });
      }
    } catch (e: any) {
      console.log("Error at razor payment verify", e);
      Toast.show(e, Toast.LONG);
    } finally {
      dispatch(setPaymentLoader(false));
      dispatch(setLoading(false));
    }
  };

export const paymentHistoryApi = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.payment_history();

    if (response?.code === 200) {
      Toast.show(response?.message, Toast.LONG);
      dispatch(setPaymentHistoryData(response?.data));
    }
  } catch (e: any) {
    console.log("Error at payment history", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const DoctorpaymentHistoryApi =
  () => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any =
        await appOperation.customer.doctor_payment_history();
      if (response?.code === 200) {
        // Toast.show(response?.message, Toast.LONG);
        dispatch(setDoctorPaymentHistoryData(response?.data));
      }
    } catch (e: any) {
      console.log("Error at razor payment", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const paymentReceiptApi =
  (sucsessCallbak: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setPaymentReceiptData([]));
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.payment_receipt();
      if (response?.code === 200) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(setPaymentReceiptData(response?.data));
        if (sucsessCallbak) {
          sucsessCallbak(response?.data);
        }
      }
    } catch (e: any) {
      console.log("Error at razor payment", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const downloadPaymentReceipt =
  (data: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const { fs } = RNFetchBlob;
      const date = new Date();
      const fileDir = fs.dirs.DownloadDir;
      const token = await AsyncStorage.getItem(USER_TOKEN_KEY);

      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: fileDir + "/download_" + "id" + ".pdf",
          description: "File Download",
        },
      })
        .fetch(
          "GET",
          `${config.WEBSITE_URL}payment/download-receipt?${data}${token}`,
          {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token ? token : ""}`,
          }
        )
        // .progress({ count: 10 }, (received, total) => {
        //   console.log("progress", received / total);
        // })
        .then((response) => {
          Alert.alert("You have sucessfully download the payment receipt", "", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              // onPress: () => NavigationService.navigate(MR_HOME_SCREEN),
              onPress: () => NavigationService.goBack(),
            },
          ]);

          // openFile("file:/" + response?.data);
        })
        .catch((error) => {
          console.log("error of download invoice", error);
        });
    } catch (e: any) {
      // console.log("Error of viewInvoice invoice", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const notificationListing = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.notification_listner();

    if (response?.code === 200) {
      dispatch(setNotificationListing(response?.data));
    }
  } catch (e: any) {
  } finally {
    dispatch(setLoading(false));
  }
};

export const mrAddBankDetails =
  (data: any, successCallback: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.mr_addBank_Details(data);

      if (response?.code === 200) {
        if (successCallback) {
          successCallback();
        }
        Toast.show(response?.message, Toast.LONG);
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("error====>>>", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getRazorpayKey = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.razor_pay_key();
    if (response?.code === 200) {
      dispatch(setRazorPayKey(response?.data));
    }
  } catch (e: any) {
    console.log("error====>>>", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getMrCompanyList = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setAuthIsLoading(true));
    const response = await appOperation.customer.mr_company_list();
    if (response?.success) {
      dispatch(setMrCompany(response?.data));

      let company_name_to_find = "Mesh app Ai";
      let result = {};

      for (let item of response?.data) {
        if (item["company_name"] === company_name_to_find) {
          result = item;
          break;
        }
      }

      dispatch(getMrCompanyZone(result?.id));
    }
  } catch (e: any) {
    console.log("error====>>>", e);
  } finally {
    dispatch(setAuthIsLoading(false));
  }
};

export const getMrCompanyZone =
  (data?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setAuthIsLoading(true));
      const response = await appOperation.customer.mr_company_zone(data);
      if (response?.success) {
        dispatch(setMrCompanyZone(response?.data));
        NavigationService.navigate(ADD_MR);
      }
    } catch (e: any) {
      console.log("error====>>>", e);
    } finally {
      dispatch(setAuthIsLoading(false));
    }
  };

export const addMr =
  (data?: any, successCallBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.add_mr(data);
      if (response?.success) {
        Toast.show(response?.message, Toast.LONG);
        successCallBack();
      } else if (response.success === false) {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("error====>>>", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const getProductList =
  (data?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setAuthIsLoading(true));
      const response = await appOperation.customer.product_List(data);
      if (response?.success) {
        dispatch(setProductList(response?.data));
      }
    } catch (e: any) {
      console.log("error====>>>", e);
    } finally {
      dispatch(setAuthIsLoading(false));
    }
  };


  export const addProduct =
  (data?: any, successCallBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.add_Product(data);
      if (response?.success) {
        Toast.show(response?.message, Toast.LONG);
        successCallBack();
        dispatch(getProductList())
      } else if (response.success === false) {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("error====>>>", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const updateProduct =
  (data?: any, successCallBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.update_Product(data);
      if (response?.success) {
        Toast.show(response?.message, Toast.LONG);
        if(successCallBack){
          successCallBack();
        }
        dispatch(getProductList())
      } else if (response.success === false) {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("error====>>>", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const deleteProduct =
  (data?: any,successCallBack?:any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.product_Delete(data);
      if (response?.success) {
        dispatch(removeProduct(data))
        if(successCallBack){
          successCallBack()
        }
        Toast.show(response?.message, Toast.LONG);
      }else{
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("error====>>>", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };