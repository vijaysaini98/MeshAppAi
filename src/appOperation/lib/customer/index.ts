import { AppOperation } from "./../../index";
import { CUSTOMER_TYPE } from "../../types";

export default (appOperation: AppOperation) => ({
  banner_list: () =>
    appOperation.get("admin/banner_list", undefined, undefined, CUSTOMER_TYPE),

  get_doctor_speciality: () =>
    appOperation.get(
      "doctor/speciality-list",
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  uploadImage: (data: any) =>
    appOperation.post("upload/image", data, CUSTOMER_TYPE),

  addProfile: (data: any) => appOperation.post("doctor", data, CUSTOMER_TYPE),

  dr_appointment_list: (upcoming: any, recent: any) =>
    appOperation.get(
      `doctor/appointment-list?limitUpcoming=${upcoming ?? 0}&limitRecent=${
        recent ?? 0
      }`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  request_status: (data: any) =>
    appOperation.patch("doctor/appointment-status", data, CUSTOMER_TYPE),

  dr_appointment_type: (value: any) =>
    appOperation.get(
      `doctor/appointment-type?status=${value}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  dr_edit_profile: () =>
    appOperation.get("users/user-profile", undefined, undefined, CUSTOMER_TYPE),

  mr_appointment_type: (value: any) =>
    appOperation.get(
      `mr/appointment-type?status=${value}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  mr_near_by_doctor: (value: any, search?: string) =>
    appOperation.get(
      search
        ? `mr/mr-profile?limit=${value ?? null}&search=${search}`
        : `mr/mr-profile?limit=${value ?? null}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  Delete_Specialization: (data: any) =>
    appOperation.delete(
      "doctor/doctor-speciality",
      undefined,
      data,
      CUSTOMER_TYPE
    ),

  serach_mr: (data: any) =>
    appOperation.get(
      `mr/search?search=${data}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
    
  dr_profile_timeSlot: (value: any) => 
    appOperation.get(
      `appointment/get-time-slots?doctor_id=${value}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),
  
  request_appointment: (data: any) =>
    appOperation.post("appointment", data, CUSTOMER_TYPE),

  reschedule_appointment: (data: any) =>
    appOperation.patch("mr/reschedule", data, CUSTOMER_TYPE),

  availability_status: (data: any) =>
    appOperation.patch("doctor/change-status", data, CUSTOMER_TYPE),

  mr_profile_data: () =>
    appOperation.get("mr/get-profile", undefined, undefined, CUSTOMER_TYPE),

  mr_update_profile: (data: any) =>
    appOperation.put("doctor/profile", data, CUSTOMER_TYPE),

  add_report: (data: any) =>
    appOperation.patch("mr/add-report", data, CUSTOMER_TYPE),

  /* DOCTOR AVAILABILITY AND SLOTS API'S */

  add_slot: (data: any) =>
    appOperation.post("doctor/add-slot", data, CUSTOMER_TYPE),

  end_meeting: (data: any) =>
    appOperation.patch("mr/end-meeting", data, CUSTOMER_TYPE),

  request_refund: (data: any) =>
    appOperation.patch("mr/request-reschedule", data, CUSTOMER_TYPE),

  doctor_update_profile: (data: any) =>
    appOperation.put("doctor/profile", data, CUSTOMER_TYPE),

  view_meeting_report: (value: any) =>
    appOperation.get(
      `mr/get-report?id=${value}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  delete_slot: (data: any) =>
    appOperation.delete("doctor/slot", undefined, data, CUSTOMER_TYPE),

  get_slots: (value: any) =>
    appOperation.get(
      `appointment/time-slots?${value}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  log_out: () => appOperation.post("users/logout", undefined, CUSTOMER_TYPE),

  add_ratings: (data: any) =>
    appOperation.post("users/add-rating", data, CUSTOMER_TYPE),

  send_message: (data: any) =>
    appOperation.post("mr/send-message", data, CUSTOMER_TYPE),

  add_selfie: (data: any) =>
    appOperation.post("mr/add-selfie", data, CUSTOMER_TYPE),

  pay_now: (data: any) => appOperation.patch("mr/pay-now", data, CUSTOMER_TYPE),

  change_password: (data: any) =>
    appOperation.post("users/change-password", data, CUSTOMER_TYPE),

  specific_timeSlot: (id: any, date: any) =>
    appOperation.get(
      `appointment/time-slots?doctor_id=${id}&date=${date}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  add_speciality: (data: any) =>
    appOperation.post("doctor/add-speciality", data, CUSTOMER_TYPE),

  cancel_meeting: (data: any) =>
    appOperation.patch("mr/cancel-meeting", data, CUSTOMER_TYPE),

  create_payment: (data: any) =>
    appOperation.post("payment/create-order", data, CUSTOMER_TYPE),

  verify_payment: (data: any) =>
    appOperation.post("payment/verify-payment", data, CUSTOMER_TYPE),

  payment_history: () =>
    appOperation.get(
      "payment/payment-history",
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  doctor_payment_history: () =>
    appOperation.get(
      "doctor/payment-history",
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  payment_receipt: () =>
    appOperation.get(
      "payment/payment-receipt",
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  notification_listner: () =>
    appOperation.get(`users/notification`, undefined, undefined, CUSTOMER_TYPE),

  mr_addBank_Details: (data: any) =>
    appOperation.put("users/add_user_bank_details", data, CUSTOMER_TYPE),

  update_fcm: (data:any) =>
    appOperation.patch("users/update-fcm", data, CUSTOMER_TYPE),

  delete_Account: () =>
    appOperation.delete(
      "users/delete-account",
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  // doctor/location
  add_location: (data: any) =>
    appOperation.post("doctor/location", data, CUSTOMER_TYPE),

  // doctor/doctor-location
  get_doctor_locations: (data?: any) =>
    appOperation.get(
      `doctor/doctor-location/${data}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  // delete doctor location
  delete_doctor_location: (data?: any) =>
    appOperation.delete(
      `doctor/location/${data}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  ifsc_verify: (data: any) =>
    appOperation.post("users/verify-ifsc", data, CUSTOMER_TYPE),

  razor_pay_key: (data: any) =>
    appOperation.post("/users/razor-pay", data, CUSTOMER_TYPE),

  doctor_start_meeting: (data?: any) =>
    appOperation.patch(
      `doctor/start-meeting/${data}`,
      undefined,
      CUSTOMER_TYPE
    ),

  mr_company_list: (data?: any) =>
    appOperation.get(
      `client/company-list`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  mr_company_zone: (data?: any) =>
    appOperation.get(
      `client/company-zone/${data}`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  add_mr: (data: any) => appOperation.post("mr/sign-up", data, CUSTOMER_TYPE),

  doctor_free_slot: (data: any) =>
    appOperation.post("doctor/fee-slots", data, CUSTOMER_TYPE),

  add_new_speciality: (data: any) =>
    appOperation.post("doctor/new-speciality", data, CUSTOMER_TYPE),

  add_Product: (data: any) => appOperation.post("product", data, CUSTOMER_TYPE),

  product_List: (data?: any) =>
    appOperation.get(`product`, undefined, undefined, CUSTOMER_TYPE),

  product_Delete: (data: any) =>
    appOperation.delete(`product/${data}`, undefined, undefined, CUSTOMER_TYPE),

  clinic_list: (data?: any) =>
    appOperation.get(`doctor/clinic`, undefined, undefined, CUSTOMER_TYPE),

  clinic_request_list: (data?: any) =>
    appOperation.get(
      `doctor/pending-clinic-request`,
      undefined,
      undefined,
      CUSTOMER_TYPE
    ),

  clinic_request_status: (data?: any) =>
    appOperation.patch(`doctor/clinic-requests`, data, CUSTOMER_TYPE),

  clinic_request_delete: (data: any) =>
    appOperation.delete(`doctor/clinic-requests`, undefined, data, CUSTOMER_TYPE),

  // product/1
  update_Product: (data: any) =>
    appOperation.put("product", data, CUSTOMER_TYPE),

  pdf_upload: (data: any) =>
    appOperation.post("upload/pdf", data, CUSTOMER_TYPE),
});
