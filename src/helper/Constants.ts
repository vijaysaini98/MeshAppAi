import { config } from "../../config/config";

export const USER_TOKEN_KEY = "USER_TOKEN_KEY";
export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN_KEY";
export const LOGIN_TYPE = "LOGIN_TYPE";
export const FCM_TOKEN_KEY = "FCM_TOKEN_KEY";
export const TAB_PARAMS_DATA = "TAB_PARAMS_DATA";
export const TAB_PARAMS_REVERSE_DATA = "TAB_PARAMS_REVERSE_DATA";
export const CLIENT_ID = "CLIENT_ID";
export const NOTIFICATION_DATA = "NOTIFICATION_DATA";

// export const IMAGE_PATH = "https://mesh-doctor-app.onrender.com/";
export const IMAGE_PATH = "https://backend.meshapp.ai/uploads/";
export const IMAGE_PATH1 = config.IMAGE_URL;
export const PDF_PATH = "https://backend.meshapp.ai/";
export const GOOGL_API = "AIzaSyBXDd4R3FBPZEPUWY3bvxdo2VMJD1s0iFw";

// export const BASE_URL = 'http://65.1.155.112:3002/';
export const BASE_URL = " https://backend-dev.meshapp.ai/"; //dev server
// export const BASE_URL = "https://backend.meshapp.ai/api/"; // live server
export const CAPTCHA_KEY = "6Ld66UUoAAAAAHz70sT_F2cMpIs-aE4Y_MeRhmBD";
export const SITE_URL = "http://charlieexchange.co";

export const placeHolderText = {
  email: "Email",
  password: "Password",
  search: "Search here...",
  newPassword: "New Password",
  confirmPassword: "Confirm Password",
  emailAdd: "johnsmith@info.com",
  phone: "+91 8888888888",
  typeHere: "Type Here....",
  meetingLink: "Enter Meeting Link",
  city: "City",
  address: "Address",
  state: "State",
  pinCode: "Pin Code",
  hospitalName: "Hospital Name",
  fullName: "Full Name",
  fatherName: "Father Name",
  dob: "DOB",
  joiningDate: "Joining Date",
  phoneNumber: "Phone Number",
  referralCode: "CCC00001",
};

export const errorText = {
  password: "Please Provide Valid Password",
  email: "Please Provide Valid Email",
};

export const titleText = {
  myLocation: "My Locations",
  addLocation: "Add Locations",
  addMr: "Add Mr",
  meetingReport: "Meeting Report",
};

export const label = {
  fullName: "Full Name",
  fatherName: "Father's Name",
  hospitalName: "Hospital/Clinic Name",
  address: "Address",
  city: "City",
  state: "State",
  pinCode: "Pin Code",
  gender: "Gender",
  dob: "DOB",
  maritalStatus: "Marital Status",
  email: "Email",
  phoneNo: "Phone No",
  joiningDate: "Joining Date",
  referralCode: "Referal Code",
};

export const btnTitle = {
  submit: "Submit",
  downloadMeetingReport: "Download Meeting Report",
};

export const messages = {
  enterFromTime: "Please enter the 'From' time.",
  enterToTime: "Please enter the 'To' time.",
  selectTimeGreaterThanCurrent:
    "Please select a time greater than the current time.",
  selectTimeAfterFiveMinutes:
    "Please select a 'From' time that is at least 5 minutes from now.",
  selectLocation: "Please select a location.",
  fromToTimeValidation: "'To' time should be greater than the 'From' time.",
  selectAppointmentType: "Please select the appointment type",
  alreadyAppointmentType: "Already appointment type selected",
  alreadyTimeselected: "Already appointment time slot selected",
  hospitalNameRequired: "Hospital Name is required",
  streetAddressRequired: "Street Adress is required",
  cityRequired: "City is required",
  stateRequired: "State is required",
  pinCodeRequired: "PinCode is required",
  noLocationAvailable: "No Locations Available...",
  profileImageRequired: "Please Upload Profile Image",
  fullNameRequired: "Full Name is Required!",
  enterEmail: "Enter a valid Email",
  emailRequired: "Email is Required!",
  enterPhoneNo: "Please Enter Phone Number",
  phoneNumberValidation: "Phone Number Must be 10-Digit",
  maritalStatusRequired: "Please select marital status",
  privacyPolicySelect: "Please accept the privcay policy!",
};

export const VALUES = {
  appId: "d2435988bed8487db3d22f769f677c4c",
};