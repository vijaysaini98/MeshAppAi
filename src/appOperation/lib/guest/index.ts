import { AppOperation } from "../..";

import { GUEST_TYPE } from "../../types";

export default (appOperation: AppOperation) => ({
  login: (data: any) => appOperation.post("users/login", data, GUEST_TYPE),

  dr_login : (data: any) => appOperation.post("users/doctor-login", data, GUEST_TYPE),

  mr_login : (data: any) => appOperation.post("users/mr-login", data, GUEST_TYPE),

  forgot_passwrod: (data: any) =>
    appOperation.post("users/forget-password", data, GUEST_TYPE),

  verify_otp: (data: any) =>
    appOperation.post("users/otp-verification", data, GUEST_TYPE),

  reset_password: (data: any) =>
    appOperation.post("users/reset-password", data, GUEST_TYPE),

  on_resend_otp: (data: any) =>
    appOperation.post("users/resend-otp", data, GUEST_TYPE),

  // serach_doctor: (data: any) =>
  //   appOperation.get(
  //     `users/doctor-list?registration_number=${data}`,
  //     undefined,
  //     undefined,
  //     GUEST_TYPE
  //   ),

  serach_doctor: (data: any) =>
      appOperation.get(
        `users/doctor-list?search=${data}`,
        undefined,
        undefined,
        GUEST_TYPE
      ),
  // users/doctor-list?search=ak

    on_validate_otp: (data: any) =>
    appOperation.post("doctor/send-otp", data, GUEST_TYPE),

    verify_validate_otp: (data: any) =>
    appOperation.post("doctor/verify-otp", data, GUEST_TYPE),

    on_aadhar_validate_otp: (data: any) =>
      appOperation.post("users/aadhar-sendotp", data, GUEST_TYPE),

    aadhar_verify_validate_otp: (data: any) =>
      appOperation.post("users/aadhar-verifyotp", data, GUEST_TYPE),

    appVersion : (data:any)=>
      appOperation.get("/users/version",undefined,undefined,GUEST_TYPE),
    
});
