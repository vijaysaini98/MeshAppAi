export interface DoctorDetails {
  name: string
  avatar: string
  phone: number
  email: string
  user_details: UserDetails
  doctor_details: DrDetails
  spec_detail: SpecDetail
}

export interface UserDetails {
  address: string
  city: string
  state: string
  aadhar: string
  mbbs_degree: string
}

export interface DrDetails {
  fees: number
  bank_name: string
  account_number: any
  account_type: any
  dob: string
  pan_number: string
}

export interface SpecDetail {
  id: number
  user_id: number
  speciality_id: number
  media: string
  status: string
  speciality: Speciality
}

export interface Speciality {
  id: number
  specialization: string
}

  // export interface DoctorSlice{
  //   drEditProfile?:DoctorDetails
  //   uploadAddImages?:any,
  //   agoraDetails?:any
  //   clinicList?:[],
  //   clinicRequsetList:[]
  // }

  export interface DoctorLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
}

export interface DoctorDetails {
  // Add all relevant doctor details fields here
  [key: string]: any;
}

export interface Appointment {
  // Add all relevant appointment fields here
  [key: string]: any;
}

export interface UploadImage {
  path?: string;
  [key: string]: any;
}

export interface BankData {
  [key: string]: any;
}

export interface AgoraDetails {
  [key: string]: any;
}

export interface Clinic {
  id: number;
  [key: string]: any;
}

export interface ClinicRequest {
  id: number;
  [key: string]: any;
}

export interface LegalQuestion {
  id: number;
  question: string;
  type: string;
  hint?: string;
}

export interface DoctorSlice {
  isLoading: boolean;
  isRefreshingLoading: boolean;
  userData?: any;
  doctorSpeciality: any[];
  uploadImages: string;
  addMyProfile: string;
  searchDoctors: any[];
  recentAppointmentList: Appointment[];
  upcomingAppointmentList: Appointment[];
  recentAppointmentType: any[];
  refundAppointmentType: any[];
  drEditProfile?: DoctorDetails;
  changeDrTabScreen: number;
  drAvailabilityStatus: number;
  drAvailabilityList: any[];
  pendingAppointmentType: any[];
  ongoingAppointmentType: any[];
  upcomingAppointmentType: any[];
  completedAppointmentType: any[];
  rejectedAppointmentType: any[];
  searchDataInitial: boolean;
  uploadProfileImages: UploadImage;
  uploadDegreeImage: UploadImage;
  uploadAadharImage: UploadImage;
  uploadGstDoc: UploadImage;
  uploadHcpiImage: UploadImage;
  doctorLocations: DoctorLocation[];
  locationData: { value: number; label: string }[];
  bankData: BankData;
  email: string;
  name: string;
  phoneNo: string;
  rNo: string;
  aadharNo: string;
  speciality: string;
  hcpiNo: string;
  gstNo: string;
  address: string;
  city: string;
  addressState: string;
  pinCode: string;
  freeSlot: number;
  isLocation: boolean;
  doctorTotalIncome: number;
  isProductModalVisible: boolean;
  appointmentProductData: any[];
  agoraDetails?: AgoraDetails;
  clinicList: Clinic[];
  clinicRequestList: ClinicRequest[];
  clinicRequestCount?: number;
  medicalCouncil: string;
  legalQuestions: LegalQuestion[];
}