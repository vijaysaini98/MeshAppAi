import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  isLoading: false,
  appointmentType: [],
  upcomingAppointmentType: [],
  recentAppointmentType: [],
  nearByDoctor: [],
  nearByProfile: [],
  searchMr: [],
  profileTimeSlot: [],
  specificTimeSlotFound: [],
  mrProfiledata: [],
  mrMeetingReport: {},
  changeMrTabScreen: 0,
  ongoingAppointmentType: [],
  completedAppointmentType: [],
  rejectedAppointmentType: [],
  refundAppointmentType: [],
  paymentRecord: [],
  razorRecord: [],
  paymentLoader: false,
  paymentHistoryData: [],
  paymentReceiptData: [],
  doctorPaymentHistoryData: [],
  notificationListingData: [],
  mrBankDetails: {},
  razorPayKey: {},
  companyList: [],
  companyZone: {},
  fullName: "",
  fatherName: "",
  gender: "",
  phoneNo: "",
  email: '',
  dob: "",
  joiningDate: "",
  address: "",
  city: "",
  pinCode: "",
  addressState: "",
  maritalStatus: "",
  profileImage:"",
  productList:[]
};

export const mrSlice = createSlice({
  name: "mr",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setProfileImage:(state, { payload }) => {
      state.profileImage = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setName: (state, { payload }) => {
      state.fullName = payload;
    },
    setFatherName: (state, { payload }) => {
      state.fatherName = payload;
    },
    setGender: (state, { payload }) => {
      state.gender = payload;
    },
    setDob:(state, { payload }) => {
      state.dob = payload;
    },
    setJoiningDate:(state, { payload }) => {
      state.joiningDate = payload;
    },
    setPhoneNo: (state, { payload }) => {
      state.phoneNo = payload;
    },
    setMaritalStatus: (state, { payload }) => {
      state.maritalStatus = payload;
    },
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
    setCity: (state, { payload }) => {
      state.city = payload;
    },
    setAddressState: (state, { payload }) => {
      state.addressState = payload;
    },
    setPinCode: (state, { payload }) => {
      console.log("pinCode",payload);
      
      state.pinCode = payload;
    },
    setEmptyMrRegistration: (state, { payload }) => {
      state.fullName = "",
      state.fatherName = "",
      state.dob = "",
      state.email = "",
      state.phoneNo = "",
      state.address = "",
      state.addressState = "",
      state.city = "",
      state.maritalStatus = "",
      state.pinCode = "",
      state.gender = "",
      state.profileImage = "",
      state.joiningDate=""

    },
    setUpcomingAppointmentType: (state, { payload }) => {
      state.upcomingAppointmentType = payload;
    },
    setUpdateUpcomingAppointmentType: (state, { payload }) => {
      state.upcomingAppointmentType = state.upcomingAppointmentType.filter((item) =>
        item?.id !== payload?.appointment_id
      );
    },
    setAppointmentType: (state, { payload }) => {
      state.appointmentType = payload;
    },
    setOngoingAppointmentType: (state, { payload }) => {
      state.ongoingAppointmentType = payload;
    },
    setUpdateOngoingAppointmentType: (state, { payload }) => {
      state.ongoingAppointmentType = state.ongoingAppointmentType.filter((item) =>
        item?.id !== payload?.appointment_id
      );
    },
    setCompletedAppointmentType: (state, { payload }) => {
      state.completedAppointmentType = payload;
    },
    setUpdateCompletedAppointmentType: (state, { payload }) => {
      state.completedAppointmentType = payload;
    },
    setRejectedAppointmentType: (state, { payload }) => {
      state.rejectedAppointmentType = payload;
    },
    setRefundAppointmentType: (state, { payload }) => {
      state.refundAppointmentType = payload;
    },
    setRecentAppointmentType: (state, { payload }) => {
      state.recentAppointmentType = payload;
    },
    setNearByDoctor: (state, { payload }) => {
      state.nearByDoctor = payload;
    },
    setNearByProfile: (state, { payload }) => {
      state.nearByProfile = payload;
    },
    setSearchMr: (state, { payload }) => {
      state.searchMr = payload;
    },
    setProfileTimeSlot: (state, { payload }) => {
      state.profileTimeSlot = payload;
    },
    setSpecificTimeSlotFound: (state, { payload }) => {
      state.specificTimeSlotFound = payload;
    },
    setMrProfileData: (state, { payload }) => {
      state.mrProfiledata = payload;
    },
    setMeetingReport: (state, { payload }) => {
      state.mrMeetingReport = payload;
    },
    SectionListhangeMrTabScreen: (state, { payload }) => {
      state.changeMrTabScreen = payload;
    },
    SetPaymentRecord: (state, { payload }) => {
      state.paymentRecord = payload;
    },
    setRazorRecord: (state, { payload }) => {
      state.razorRecord = payload;
    },
    setPaymentLoader: (state, { payload }) => {
      state.paymentLoader = payload;
    },
    setPaymentHistoryData: (state, { payload }) => {
      state.paymentHistoryData = payload;
    },

    setDoctorPaymentHistoryData: (state, { payload }) => {
      state.doctorPaymentHistoryData = payload;
    },

    setPaymentReceiptData: (state, { payload }) => {
      state.paymentReceiptData = payload;
    },
    setNotificationListing: (state, { payload }) => {
      state.notificationListingData = payload;
    },
    setMrBankDetails: (state, { payload }) => {
      state.mrBankDetails = payload
    },
    setRazorPayKey: (state, { payload }) => {
      state.razorPayKey = payload
    },

    setMrCompany: (state, { payload }) => {
      state.companyList = payload
    },
    setMrCompanyZone: (state, { payload }) => {
      state.companyZone = payload
    },
    setProductList: (state, { payload }) => {
      state.productList = payload
    },
    removeProduct:(state, { payload }) => {
      state.productList = state.productList.filter(
        product => product?.id !== payload,
      )
    },
   
    resetMr: (state, { payload }) => {
      state = initialState
    },
  },
});
export const {
  setLoading,
  setRecentAppointmentType,
  setNearByDoctor,
  setNearByProfile,
  setAppointmentType,
  setSearchMr,
  setUpcomingAppointmentType,
  setProfileTimeSlot,
  setMrProfileData,
  setMeetingReport,
  SectionListhangeMrTabScreen,
  setOngoingAppointmentType,
  setCompletedAppointmentType,
  setUpdateCompletedAppointmentType,
  setRejectedAppointmentType,
  setSpecificTimeSlotFound,
  SetPaymentRecord,
  setRazorRecord,
  setPaymentLoader,
  setPaymentHistoryData,
  setPaymentReceiptData,
  setDoctorPaymentHistoryData,
  setNotificationListing,
  setRefundAppointmentType,
  setMrBankDetails,
  setUpdateUpcomingAppointmentType,
  setUpdateOngoingAppointmentType,
  setRazorPayKey,
  setMrCompany,
  setMrCompanyZone,
  setProfileImage,
  setName,
  setFatherName,
  setGender,
  setEmail,
  setPhoneNo,
  setMaritalStatus,
  setDob,
  setJoiningDate,
  setCity,
  setAddress,
  setAddressState,
  setPinCode,
  setEmptyMrRegistration,
  setProductList,
  removeProduct,
  resetMr
}: any = mrSlice.actions;
// export const authSelector = state => state.auth;
export const mrReducer = mrSlice.reducer;
