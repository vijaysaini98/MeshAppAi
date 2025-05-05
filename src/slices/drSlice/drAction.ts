import { Dispatch } from "redux";
import { appOperation } from "../../appOperation";
import {
  deleteUploadImages,
  removeClinic,
  removeClinicRequest,
  SectionListChangeDrTabScreen,
  setAddMyProfile,
  setAddress,
  setAddressState,
  setAddUploadImages,
  setAgoraDetails,
  setAppointmentProductData,
  setBankDetails,
  setCity,
  setClinicList,
  setClinicRequestList,
  setCompletedAppointmentType,
  setDoctorFreeSlot,
  setDoctorLocation,
  setDoctorSpeciality,
  setDoctorTotalIncome,
  SetDrAvailabilityStatus,
  setDrEditProfile,
  setEmail,
  setEmptyDrProfileData,
  setLoading,
  setName,
  setOngoingAppointmentType,
  setPendingAppointmentType,
  setPhone,
  setPinCode,
  setProductModal,
  setRecentAppointmentList,
  setRefreshingLoading,
  setRefundAppointmentType,
  setRejectedAppointmentType,
  setRNO,
  setSearchDataInitial,
  setSearchDoctors,
  setSpeciality,
  setUpcomingAppointmentList,
  setUpcomingAppointmentType,
  setUploadImages,
} from "./drSlice";
import Toast from "react-native-simple-toast";
import NavigationService from "../../navigation/NavigationService";
import {
  CALLING_SCREEN,
  DR_APPOINTMENT_SCREEN,
  DR_HOME_SCREEN,
} from "../../navigation/routes";
import {
  setAadharVerifyOtp,
  setBtnLoading,
  setVerifyOtp,
} from "../authSlice/authSlice";
import { Keyboard } from "react-native";
import { GOOGL_API } from "../../helper/Constants";

export const getSpeciality =
  (isLoading?: boolean, successCallBack?: any, id?: number) =>
  async (dispatch: Dispatch<any>) => {
    try {
      isLoading && dispatch(setLoading(true));
      const response: any = await appOperation.customer.get_doctor_speciality();
      if (response?.code === 200) {
        dispatch(setDoctorSpeciality(response?.data));
        if (successCallBack) {
          successCallBack(id);
        }
      }
    } catch (e: any) {
      console.log("error in Doctor Specility", e);
    } finally {
      isLoading && dispatch(setLoading(false));
    }
  };

export const uploadImage =
  (
    data: any,
    media?: any,
    setMedia?: any,
    type?: any,
    setAPiResponse?: any,
    onSuccessCallBack?: any
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.uploadImage(data);
      if (response?.code === 200) {
        let uploadData = response?.data[0];
        uploadData.uploadType = type;
        // dispatch(setAddUploadImages(uploadData));
        if (setMedia) {
          if (media === "selfi") {
            setMedia(response?.data[0]?.path);
          } else {
            setMedia([...media, response?.data[0]?.path]);
          }
        } else if (type === "specialty") {
          dispatch(setUploadImages(response?.data[0]));
        } else if (type === "gst") {
          // dispatch(setAddUploadImages(uploadData));
          // setAPiResponse(response?.data[0]?.path)
          // dispatch(setGstDocument(response?.data[0]?.path))
          dispatch(setAddUploadImages(uploadData));
        } else if (type == "mrProfile") {
          onSuccessCallBack(response?.data[0]?.path);
        } else {
          setUploadImages(uploadData);
          dispatch(setAddUploadImages(uploadData));
        }
      }
    } catch (e: any) {
      console.log("error in image upload", e);
      console.log("catch");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const uploadSelfieImage =
  (data: any, isLoading?: boolean, onSuccessCallBack?: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      console.log("isLoading", isLoading);

      isLoading && dispatch(setLoading(true));
      // dispatch(setBtnLoading(true))
      const response: any = await appOperation.customer.uploadImage(data);
      if (response?.code === 200) {
        onSuccessCallBack(response?.data[0]?.path);
      }
    } catch (e: any) {
      console.log("error in image upload", e);
      console.log("catch");
    } finally {
      isLoading && dispatch(setLoading(false));
      // dispatch(setBtnLoading(false))
    }
  };

export const addMyProfile =
  (data: any, successCallBack: any) => async (dispatch: Dispatch<any>) => {
    try {

      dispatch(setLoading(true));
      const response: any = await appOperation.customer.addProfile(data);
      if (response?.code === 200 && response.success) {
        dispatch(setAddMyProfile(response?.data));
        Toast.show(response?.message, Toast.LONG);

        dispatch(setVerifyOtp(false));
        dispatch(setAadharVerifyOtp(false));
        // dispatch(setName());
        // dispatch(setEmail());
        // dispatch(setPhone());
        // dispatch(setRNO());
        // dispatch(setAddress());
        // dispatch(setCity());
        // dispatch(setAddressState());
        // dispatch(setPinCode());
        // dispatch(setSpeciality());
        dispatch(setEmptyDrProfileData());
        dispatch(deleteUploadImages("profile", {}));
        dispatch(setSearchDoctors([]));
        dispatch(deleteUploadImages(undefined, {}));
        dispatch(deleteUploadImages("degree", {}));
        dispatch(deleteUploadImages("aadhar", {}));
        dispatch(deleteUploadImages("profile", {}));

        if (successCallBack) {
          successCallBack();
          // dispatch(deleteUploadImages("profile", {}));
          // dispatch(deleteUploadImages("hcpi", {}));
          // dispatch(deleteUploadImages("degree", {}));
          // dispatch(deleteUploadImages("aadhar", {}));
          // dispatch(deleteUploadImages("gst", {}));
         
        }
      } else if (response.success === false) {
        Toast.show(response?.message, Toast.LONG);
        // successCallBack()
      }
    } catch (e: any) {
      // Toast.show(e?.message, Toast.LONG);
      console.log(e, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const serachDoctorAPI =
  (data: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.guest.serach_doctor(data);

      if (response?.code == 200) {
        dispatch(setLoading(false));
        dispatch(setSearchDataInitial(true));
        dispatch(setSearchDoctors(response?.data));
      }
    } catch (e: any) {
      console.log("serachDoctorAPIerror====>>>", e);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
      Keyboard?.dismiss();
    }
  };

export const doctorAppointmentList =
  (upcoming: any, recent: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.dr_appointment_list(
        upcoming,
        recent
      );
      
      if (response?.code === 200) {
        dispatch(setRecentAppointmentList(response?.data));
        dispatch(
          setUpcomingAppointmentList(response?.docUpcomingAppoimentCheck)
        );
        dispatch(setDoctorTotalIncome(response?.doctorIncome));
      }
    } catch (e: any) {
      console.log("error====>>>", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const requestStatus =
  (data: any, condition: any, successCallBack: any, status: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.request_status(data);
      if (response?.success) {
        if (condition === "fromAccept" && !status) {
          dispatch(SectionListChangeDrTabScreen(0));
          NavigationService.navigate(DR_APPOINTMENT_SCREEN);
          dispatch(doctorAppointmentType("Pending"));
        } else if (condition === "fromAccept" && status === "free") {
          dispatch(SectionListChangeDrTabScreen(2));
          dispatch(doctorAppointmentType("Upcoming"));
          NavigationService.navigate(DR_APPOINTMENT_SCREEN);
        } else if (condition === "fromReject") {
          dispatch(SectionListChangeDrTabScreen(4));
          dispatch(doctorAppointmentType("Rejected"));
          NavigationService.navigate(DR_APPOINTMENT_SCREEN);
        } else {
          NavigationService.navigate(DR_HOME_SCREEN);
        }
        Toast.show(response?.message, Toast.LONG);
        if (successCallBack) {
          successCallBack();
        }
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      console.log("Error of request status =====>>>>", e);
    } finally {
      // dispatch(setLoading(false));
      dispatch(setBtnLoading(false));
    }
  };

export const doctorAppointmentType =
  (value: any, from?: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setPendingAppointmentType([]));
      dispatch(setOngoingAppointmentType([]));
      dispatch(setUpcomingAppointmentType([]));
      dispatch(setCompletedAppointmentType([]));
      dispatch(setRejectedAppointmentType([]));
      from != "Completed" && dispatch(setLoading(true));
      const response: any = await appOperation.customer.dr_appointment_type(
        value
      );

      if (response?.code === 200) {
        if (value === "Pending") {
          dispatch(setPendingAppointmentType(response?.data));
          dispatch(setOngoingAppointmentType([]));
          dispatch(setUpcomingAppointmentType([]));
          dispatch(setCompletedAppointmentType([]));
          dispatch(setRejectedAppointmentType([]));
        } else if (value == "Ongoing") {
          dispatch(setPendingAppointmentType([]));
          dispatch(setOngoingAppointmentType(response?.data));
          dispatch(setUpcomingAppointmentType([]));
          dispatch(setCompletedAppointmentType([]));
          dispatch(setRejectedAppointmentType([]));
        } else if (value === "Upcoming") {
          dispatch(setPendingAppointmentType([]));
          dispatch(setUpcomingAppointmentType([]));
          dispatch(setUpcomingAppointmentType(response?.data));
          dispatch(setCompletedAppointmentType([]));
          dispatch(setRejectedAppointmentType([]));
        } else if (value === "Completed") {
          dispatch(setPendingAppointmentType([]));
          dispatch(setUpcomingAppointmentType([]));
          dispatch(setUpcomingAppointmentType([]));
          dispatch(setCompletedAppointmentType(response?.data));
          dispatch(setRejectedAppointmentType([]));
        } else if (value === "Rejected") {
          dispatch(setPendingAppointmentType([]));
          dispatch(setUpcomingAppointmentType([]));
          dispatch(setUpcomingAppointmentType([]));
          dispatch(setCompletedAppointmentType([]));
          dispatch(setRejectedAppointmentType(response?.data));
          dispatch(setRefundAppointmentType([]));
        } else {
          dispatch(setPendingAppointmentType([]));
          dispatch(setUpcomingAppointmentType([]));
          dispatch(setUpcomingAppointmentType([]));
          dispatch(setCompletedAppointmentType([]));
          dispatch(setRejectedAppointmentType([]));
          dispatch(setRefundAppointmentType(response?.data));
        }
      }
    } catch (e: any) {
      console.log(`AppointMentError ${value}`, e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const DrEditProfile = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.dr_edit_profile();
    if (response?.code === 200) {
      dispatch(setDrEditProfile(response?.data));
    }
  } catch (e: any) {
    console.log("error=====>>>", e);
  } finally {
    dispatch(setLoading(false));
  }
};

// DeleteSpecialization
export const DeleteSpecialization =
  (data: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.Delete_Specialization(
        data
      );
      if (response?.code === 200) {
        dispatch(DrEditProfile());
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      // console.log("Error at delete", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const DoctorAvailabilityStatus =
  (data: any, successCallBack: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.availability_status(
        data
      );
      if (response?.code === 200) {
        dispatch(SetDrAvailabilityStatus(response?.data));
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("DoctorAvailabilityStatus Error", e);
    } finally {
      dispatch(setLoading(false));
      3;
    }
  };

export const UpdateDoctorProfile =
  (data: any, successCallBack: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.doctor_update_profile(
        data
      );
      if (response?.code === 200) {
        if (successCallBack) {
          successCallBack();
        }
        Toast.show(response?.message, Toast.LONG);
        dispatch(DrEditProfile());
      }
    } catch (e: any) {
      console.log("Error of UpdateDoctorProfile", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const addRatings =
  (data: any, onSuccess?: any) => async (dispatch: Dispatch<any>) => {
    try {
      const response: any = await appOperation.customer.add_ratings(data);
      if (response?.code === 200) {
        dispatch(doctorAppointmentType("Completed", "Completed"));
        Toast.show(response?.message, Toast.LONG);
        onSuccess(false);
      }
    } catch (e: any) {
      console.log("error=====>>>", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
    }
  };

// DrChangePassword
export const DrChangePassword =
  (data: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.change_password(data);
      if (response?.code === 200) {
        NavigationService.goBack();
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      // console.log("Error of change password", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const AddSpeciality = (data: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.add_speciality(data);
    if (response?.code === 200) {
      dispatch(DrEditProfile());
      Toast.show(response?.message, Toast.LONG);
    }
  } catch (e: any) {
    Toast.show(e?.message, Toast.LONG);
    // console.log("Error of add_speciality", e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const addLocation =
  (data?: any, userId?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.add_location(data);
      if (response?.code === 200) {
        Toast.show(response?.message, Toast.LONG);
        NavigationService.goBack();
        dispatch(getDoctorLocation(userId));
      }
    } catch (e: any) {
      console.log("add location error", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getDoctorLocation =
  (data: any, isLoading) => async (dispatch: Dispatch<any>) => {
    try {
      isLoading && dispatch(setLoading(true));
      const response: any = await appOperation.customer.get_doctor_locations(
        data
      );
      if (response.success) {
        dispatch(setDoctorLocation(response?.data));
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      console.log("get doctor location error", e);
      // console.log("Error of add_speciality", e);
    } finally {
      isLoading && dispatch(setLoading(false));
    }
  };

export const deleteDoctorLocation =
  (locationId: any, userId?: number) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.delete_doctor_location(
        locationId
      );

      if (response.success) {
        dispatch(getDoctorLocation(userId));
        Toast.show(response?.message, Toast.LONG);
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      console.log("delete doctor location error", e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const ifscVerify =
  (data: any, onSuccess: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.ifsc_verify(data);
      if (response.success) {
        dispatch(setBankDetails(response?.data));
        onSuccess(response?.data);
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      console.log("Error ifsc", e);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const doctorStartMeeting =
  (data: any, onSuccess?: any) => async (dispatch: Dispatch<any>) => {
    try {
      let isVirtual = data?.appointment_type != "400";
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.doctor_start_meeting(
        data?.id
      );
      
      if (response.success) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(SectionListChangeDrTabScreen(1));
        dispatch(setAgoraDetails(response?.data));
        onSuccess && onSuccess(data)
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("Error StartMeeting==>>", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const endMeeting =
  (data: any, successCallBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.end_meeting(data);
      if (response?.code === 200) {
        dispatch(SectionListChangeDrTabScreen(3));
        Toast.show(response?.message, Toast.LONG);
        dispatch(setProductModal(false));
        if (successCallBack) {
          successCallBack();
        }
      }
    } catch (e: any) {
      console.log("error===>>>", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getLocation = async (
  value?: string,
  setSearchLoader?: any,
  setArrLocation?: any
) => {
  let apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&components=country:IN&key=${GOOGL_API}`;
  try {
    setSearchLoader(true);
    const response = await fetch(apiUrl, {
      method: "GET",
    });

    const data = await response.json();

    if (response.status === 200) {
      setSearchLoader(false);
      setArrLocation(data?.predictions);
    }
  } catch (error) {
    setSearchLoader(false);
    console.log("google location Error===>>>", error);
  }
};

export const doctorFreeSlots =
  (data: any, successCallBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.doctor_free_slot(data);

      if (response?.success) {
        dispatch(setDoctorFreeSlot(response?.data?.numberOfSlots));
        dispatch(DrEditProfile());
        successCallBack();
        Toast.show(response?.message, Toast.LONG);
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("error===>>>", e);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const addNewSpeciality =
  (data?: any, successCallBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.add_new_speciality(
        data
      );
      if (response?.success) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(getSpeciality(true, successCallBack, response?.data?.id));
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("error===>>>", e);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const getClinicList =
  (isLoading?: boolean, isRefreshingLoading?: boolean, successCallBack?: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      isLoading && dispatch(setLoading(true));
      isRefreshingLoading && dispatch(setRefreshingLoading(true));
      const response: any = await appOperation.customer.clinic_list();
      if (response?.success) {
        dispatch(setClinicList(response?.data));
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("error===>>>", e);
    } finally {
      isLoading && dispatch(setLoading(false));
      isRefreshingLoading && dispatch(setRefreshingLoading(false));
    }
  };

export const deleteclinicRequest =
  (data?: any, successCallBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.clinic_request_delete(
        data
      );
      if (response?.success) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(removeClinic(data));
        successCallBack && successCallBack();
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("error===>>>", e);
      Toast.show(e?.message, Toast.LONG);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const getClinicRequestList =
  (isLoading: boolean, isRefreshingLoading: boolean, successCallBack?: any) =>
  async (dispatch: Dispatch<any>) => {
    try {
      isLoading && dispatch(setLoading(true));
      isRefreshingLoading && dispatch(setRefreshingLoading(true));
      const response: any = await appOperation.customer.clinic_request_list();
      if (response?.success) {
        dispatch(setClinicRequestList(response?.data));
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      console.log("error===>>>", e);
    } finally {
      isLoading && dispatch(setLoading(false));
      isRefreshingLoading && dispatch(setRefreshingLoading(false));
    }
  };

export const clinicRequestStatus =
  (data?: any, successCallBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.clinic_request_status(
        data
      );
      if (response?.success) {
        Toast.show(response?.message, Toast.LONG);
        dispatch(removeClinicRequest(data));
        dispatch(getClinicList());
        successCallBack && successCallBack();
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      console.log("error===>>>", e);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const pdfUpload =
  (data?: any, successCallBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setBtnLoading(true));
      const response: any = await appOperation.customer.pdf_upload(data);
      if (response?.success) {
        successCallBack(response);
      } else {
        Toast.show(response?.message, Toast.LONG);
      }
    } catch (e: any) {
      Toast.show(e?.message, Toast.LONG);
      console.log("error===>>>", e);
    } finally {
      dispatch(setBtnLoading(false));
    }
  };
