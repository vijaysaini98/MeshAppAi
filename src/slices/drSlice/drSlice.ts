import { createSlice } from "@reduxjs/toolkit";
import { DoctorSlice } from "./drTypes";

export const initialState: DoctorSlice = {
  isLoading: false,
  isRefreshingLoading: false,
  userData: undefined,
  doctorSpeciality: [],
  uploadImages: "",
  addMyProfile: "",
  searchDoctors: [],
  recentAppointmentList: [],
  upcomingAppointmentList: [],
  recentAppointmentType: [],
  refundAppointmentType:[],
  drEditProfile: undefined,
  changeDrTabScreen: 0,
  drAvailabilityStatus: 0,
  drAvailabilityList: [],
  pendingAppointmentType: [],
  ongoingAppointmentType:[],
  upcomingAppointmentType: [],
  completedAppointmentType: [],
  rejectedAppointmentType: [],
  searchDataInitial: false,
  uploadProfileImages: {},
  uploadDegreeImage: {},
  uploadAadharImage: {},
  uploadGstDoc:{},
  uploadHcpiImage: {},
  doctorLocations:[],
  locationData:[],
  bankData:{},
  email:"",
  name:"",
  phoneNo:"",
  rNo:"",
  aadharNo:"",
  speciality:"",
  hcpiNo:"",
  gstNo:"",
  address:"",
  city:"",
  addressState:"",
  pinCode:"",
  freeSlot:0,
  isLocation:true,
  doctorTotalIncome:0,
  isProductModalVisible:false,
  appointmentProductData:[],
  agoraDetails:undefined,
  clinicList:[],
  clinicRequsetList:[],
  clinicRequestCount:undefined,
  medicalCouncil:""
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setRefreshingLoading: (state, { payload }) => {
      state.isRefreshingLoading = payload;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    setDoctorSpeciality: (state, { payload }) => {
      state.doctorSpeciality = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setName: (state, { payload }) => {
      state.name = payload;
    },
    setPhone: (state, { payload }) => {
      state.phoneNo = payload;
    },
    setRNO: (state, { payload }) => {
      state.rNo = payload;
    },
    setMedicalCouncil: (state, { payload }) => {
      state.medicalCouncil = payload;
    },
    setAadharNo: (state, { payload }) => {
      state.aadharNo = payload;
    },
    setSpeciality: (state, { payload }) => {
      state.speciality = payload;
    },
    setHcpiNo: (state, { payload }) => {
      state.hcpiNo = payload;
    },
    setGstNo: (state, { payload }) => {
      state.gstNo = payload;
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
      state.pinCode = payload;
    },
    setEmptyDrProfileData :(state, { payload }) => {
      state.email="",
      state.name="",
      state.phoneNo="",
      state.rNo="",
      state.aadharNo="",
      state.speciality="",
      state.hcpiNo="",
      state.gstNo="",
      state.address="",
      state.city="",
      state.addressState="",
      state.pinCode=""
      state.medicalCouncil=""
    },
    setUploadImages: (state, { payload }) => {
      state.uploadImages = payload;
    },
    setAddUploadImages: (state, { payload }) => {
      if (payload?.uploadType == "hcpi") {
        state.uploadHcpiImage = payload
      }
      else if (payload?.uploadType == "degree") {
        state.uploadDegreeImage = payload
      } else if (payload?.uploadType == "aadhar") {
        state.uploadAadharImage = payload
      } else if (payload?.uploadType == "gst") {
        state.uploadGstDoc = payload
      }
      else {
        state.uploadProfileImages = payload
      }
    },

    deleteUploadImages: (state, { payload }) => {
      if (payload == "hcpi") {
        state.uploadHcpiImage = {}
      }
      else if (payload == "degree") {
        state.uploadDegreeImage = {}
      } else if (payload == "aadhar") {
        state.uploadAadharImage = {}
      }  else if (payload == "gst") {
        state.uploadGstDoc = {}
      } else if(payload == 'profile'){
        state.uploadProfileImages = {}
      }
    },

    setAddMyProfile: (state, { payload }) => {
      state.addMyProfile = payload;
    },
    setRecentAppointmentList: (state, { payload }) => {
      state.recentAppointmentList = payload;
    },
    setUpcomingAppointmentList: (state, { payload }) => {
      state.upcomingAppointmentList = payload;
    },
    setDoctorTotalIncome: (state, { payload }) => {
      state.doctorTotalIncome = payload;
    },
    setSearchDoctors: (state, { payload }) => {
      state.searchDoctors = payload;
    },
    setDrEditProfile: (state, { payload }) => {
      state.drEditProfile = payload;
      state.drAvailabilityStatus = payload?.doctor_details?.availability;
      state.uploadProfileImages = payload?.avatar ? { path: payload.avatar } : null;
      state.uploadHcpiImage = payload?.user_details?.supporting_documents_hcpi_number
        ? { path: payload?.user_details?.supporting_documents_hcpi_number }
        : null;
      state.uploadDegreeImage = payload?.user_details?.mbbs_degree
        ? { path: payload?.user_details?.mbbs_degree }
        : null;
      state.uploadAadharImage = payload?.user_details?.aadhar
        ? { path: payload?.user_details?.aadhar }
        : null;
    },
    SectionListChangeDrTabScreen: (state, { payload }) => {
      state.changeDrTabScreen = payload;
    },
    SetDrAvailabilityStatus: (state, { payload }) => {
      state.drAvailabilityStatus = state.drAvailabilityStatus === 0 ? 1 : 0;
    },
    setdrAvailabilityList: (state, { payload }) => {
      state.drAvailabilityList = payload;
    },
    setPendingAppointmentType: (state, { payload }) => {
      state.pendingAppointmentType = payload;
    }, 
    setOngoingAppointmentType: (state, { payload }) => {
      state.ongoingAppointmentType = payload;
    },
    setUpcomingAppointmentType: (state, { payload }) => {
      state.upcomingAppointmentType = payload;
    },
    setCompletedAppointmentType: (state, { payload }) => {
      state.completedAppointmentType = payload;
    },
    setRejectedAppointmentType: (state, { payload }) => {
      state.rejectedAppointmentType = payload;
    },
    setRefundAppointmentType: (state, { payload }) => {
      state.refundAppointmentType = payload;
    },
    setSearchDataInitial: (state, { payload }) => {
      state.searchDataInitial = payload;
    },
    // setDoctorLocation: (state, { payload }) => {
    //   state.isLocation= payload?.length 
    //   state.doctorLocations = payload;
    //   state.locationData = payload.flatMap((item) => {
    //     return item.doctorLocations.map((location) => {
    //       return {
    //         value: location?.id,
    //         label: `${location?.name},${location?.address}, ${location?.city}, ${location?.pincode}, ${location?.state}`
    //       };
    //     });
    //   });
    // },
    setDoctorLocation: (state, { payload }) => {
      const locations = payload || []; // Ensure payload is always an array
      state.isLocation = locations.length;
      state.doctorLocations = locations;
      state.locationData = locations.flatMap((item) =>
        item.doctorLocations.map((location) => ({
          value: location?.id,
          label: `${location?.name}, ${location?.address}, ${location?.city}, ${location?.pincode}, ${location?.state}`,
        }))
      );
    },
    setBankDetails:(state, { payload }) => {
      state.bankData = payload;
    },
    setDoctorFreeSlot: (state, { payload }) => {
      state.freeSlot = payload;
    },
    resetDr :(state, { payload }) => {
      state = initialState;
    },
    setProductModal :(state, { payload }) => {
      state.isProductModalVisible = payload ;
    },
    setAppointmentProductData:(state, { payload })=>{
      state.appointmentProductData =  payload
    },
    setAgoraDetails:(state, { payload })=>{
      state.agoraDetails =  payload
    },
    setClinicList:(state, { payload })=>{
      state.clinicList =  payload?.clinicList
      state.clinicRequestCount = payload?.clinicDoctors
    },
    removeClinic:(state, { payload })=>{
      state.clinicList =  state.clinicList?.filter((item)=>(
        item?.id !== payload?.id
      ))
    },
    setClinicRequestList:(state, { payload })=>{
      state.clinicRequsetList =  payload
    },
    removeClinicRequest:(state, { payload })=>{
      state.clinicRequsetList = state.clinicRequsetList.filter((item)=>(
        item?.id !== payload?.id
      ))
    }


  },
});

export const {
  setLoading,
  setRefreshingLoading,
  setUserData,
  setDoctorSpeciality,
  setUploadImages,
  setAddMyProfile,
  setSearchDoctors,
  setRecentAppointmentList,
  setUpcomingAppointmentList,
  setDrEditProfile,
  SectionListChangeDrTabScreen,
  SetDrAvailabilityStatus,
  setdrAvailabilityList,
  setPendingAppointmentType,
  setOngoingAppointmentType,
  setUpcomingAppointmentType,
  setCompletedAppointmentType,
  setRejectedAppointmentType,
  setRefundAppointmentType,
  setSearchDataInitial,
  setAddUploadImages,
  deleteUploadImages,
  setDoctorLocation,
  setBankDetails,
  setEmail,
  setName,
  setPhone,
  setAadharNo,
  setAddress,
  setAddressState,
  setCity,
  setHcpiNo,
  setGstNo,
  setSpeciality,
  setRNO,
  setMedicalCouncil,
  setPinCode,
  setEmptyDrProfileData,
  setDoctorFreeSlot,
  setDoctorTotalIncome,
  resetDr,
  setProductModal,
  setAppointmentProductData,
  setAgoraDetails,
  setClinicList,
  removeClinic,
  setClinicRequestList,
  removeClinicRequest
}: any = doctorSlice.actions;

export const doctorReducer = doctorSlice.reducer;
