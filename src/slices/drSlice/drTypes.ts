/* eslint-disable prettier/prettier */
// export interface DoctorDetails {
//     fees: number
//     bank_name: string
//     account_number: any
//     account_type: any
//     dob: string
//     pan_number: string
//   }
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

  export interface DoctorSlice{
    drEditProfile?:DoctorDetails
    uploadAddImages?:any,
    agoraDetails?:any
    clinicList?:[],
    clinicRequsetList:[]
  }