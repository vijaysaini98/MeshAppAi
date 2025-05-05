import { useState } from "react";
import NavigationService from "../navigation/NavigationService";
import { LOGIN_SCREEN } from "../navigation/routes";
import { camera, Cross_logo, drIcon, mrIcon, p1 } from "./ImageAssets";

export const welcomeData = [
  {
    id: "1",
    title: `Login as a\nDoctor`,
    icon: drIcon,
    onPress: () => {
      NavigationService.navigate(LOGIN_SCREEN, { type: "doctor" });
    },
  },
  {
    id: "2",
    title: "Login as a\nMR",
    icon: mrIcon,
    onPress: () => {
      NavigationService.navigate(LOGIN_SCREEN, { type: "mr" });
    },
  },
];

export const doctorList = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 1,
    icon: p1,
    num: 2,
    location: 2,
    star: true,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 1,
    icon: p1,
    num: 2,
    location: 2,
    star: true,
  },
];

export const doctorListPending = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    status: "Pending",
    address: "2893 Tori Lane, Boston",
    feature: 9,
    icon: p1,
    num: 2,
    location: 2,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 7,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const pendindListDoctor = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    // status: 'Pending',
    address: "2893 Tori Lane, Boston",
    feature: 14,
    icon: p1,
    num: 2,
    location: 2,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 14,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const doctorListOngoing = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 8,
    icon: p1,
    num: 2,
    location: 2,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 8,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const ongoingListDoctor = [
  {
    id: "1",
    name: "Ethan Doe ",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 11,
    icon: p1,
    num: 2,
    location: 2,
    doctorStatus: "Scheduled",
  },
  {
    id: "2",
    name: "Daniel Walker",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 2,
    icon: p1,
    num: 2,
    location: 2,
    doctorStatus: "Ongoing",
  },
];

export const doctorListCompleted = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 8,
    icon: p1,
    num: 2,
    location: 2,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 4,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const completedListDoctor = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 2,
    icon: p1,
    num: 2,
    location: 2,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 2,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const upcominAppointments = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    status: "Pending",
    address: "2893 Tori Lane, Boston",
    feature: 6,
    icon: p1,
    num: 2,
    location: 2,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 10,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const doctorListRejected = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    // feature: 5,
    icon: p1,
    num: 2,
    location: 2,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    // feature: 5,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const rejectedListDoctor = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 2,
    icon: p1,
    num: 2,
    location: 2,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 2,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const doctorListReschedule = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 6,
    icon: p1,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 6,
    icon: p1,
  },
];

export const specialty = ["Urologist", "Pediatrics"];

export const sendMessageData = [
  {
    id: "1",
    message: "I Have Reached",
    radio: true,
  },
  {
    id: "2",
    message: "I Will Be Late",
    radio: true,
  },
  {
    id: "3",
    message: "Will Reach in 30 Min",
    radio: true,
  },
];

export const EndMeetingData = [
  {
    id: "200",
    message: "Meeting is Successfully Completed ",
    radio: true,
  },
  {
    id: "1700",
    message: "Doctor is not Available",
    radio: true,
  },
];

export const meetingReport = [
  {
    id: "1",
    name: "Olivia Smith",
    department: "Pediatrician",
    address: "4162 Davis Court, Westland",
    // feature: 5,
    icon: p1,
    location: 2,
    num: 2,
  },
];

export const paymentHistory = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    date: "29 Sep, 2023",
    icon: p1,
    location: 1,
    num: 1,
    download: true,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Pediatrician",
    date: "29 Sep, 2023",
    icon: p1,
    location: 1,
    num: 1,
    download: true,
  },
  {
    id: "3",
    name: "David Doe",
    department: "Urologist",
    date: "29 Sep, 2023",
    icon: p1,
    location: 1,
    num: 1,
    download: true,
  },
];

export const claimProfile = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    // feature: 1,
    icon: p1,
    num: 2,
    location: 2,
    star: true,
    rno: "R. N. :- #ABC012",
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    // feature: 1,
    icon: p1,
    num: 2,
    location: 2,
    rno: "R. N. :- #ABC012",
    star: true,
  },
  {
    id: "3",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    // feature: 1,
    icon: p1,
    num: 2,
    location: 2,
    rno: "R. N. :- #ABC012",
    star: true,
  },
];

export const recentRequests = [
  {
    id: "1",
    name: "Ethan Doe",
    department: "Stryker",
    address: "2893 Tori Lane, Boston",
    feature: 13,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const upcomingRequests = [
  {
    id: "1",
    name: "Ethan Doe",
    department: "Stryker",
    address: "2893 Tori Lane, Boston",
    feature: 11,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const appointmentType = [
  {
    id: "1",
    name: "Clinic Visit",
    radio: true,
  },
  {
    id: "2",
    name: "Virtual",
    radio: true,
  },
];

export const availabilityType = [
  {
    id: "1",
    name: "Weekly",
    radio: true,
  },
  {
    id: "2",
    name: "Monthly",
    radio: true,
  },
];

export const feeType = [
  {
    id: "1",
    name: "Paid",
    radio: true,
  },
  {
    id: "2",
    name: "Free",
    radio: true,
  },
];

export const rejectionMessage = [
  {
    id: "1",
    message: "I have another appointment",
    radio: true,
  },
  {
    id: "2",
    message: "Not Available at this time",
    radio: true,
  },
  {
    id: "3",
    message: "Out of town",
    radio: true,
  },
  {
    id: "4",
    message: "Mr Not Available at this time",
    radio: true,
  },
  {
    id: "5",
    message: "Other",
    radio: true,
  },
];

export const cancelMessage = [
  // {
  //   id: "1",
  //   message: "Doctor Unavailable",
  //   radio: true,
  // },
  {
    id: "2",
    message: "Unable To Reach",
    radio: true,
  },
  {
    id: "3",
    message: "Other",
    radio: true,
  },
];

export const speciality = [
  {
    id: "1",
    feature: "Cardiac",
    delete: true,
    image: camera,
  },
  {
    id: "2",
    feature: "Neurology",
    delete: true,
    image: camera,
  },
  {
    id: "3",
    feature: "Neurology",
    delete: true,
    image: camera,
  },
  {
    id: "4",
    feature: "Cardiac",
    delete: true,
    image: camera,
  },
];

export const recentRequest = [
  {
    id: "1",
    name: "Mike Hoover",
    department: "Urologist",
    status: "Pending",
    address: "2893 Tori Lane, Boston",
    feature: 13,
    icon: p1,
    num: 2,
    location: 2,
  },
  {
    id: "2",
    name: "Olivia Smith",
    department: "Urologist",
    address: "2893 Tori Lane, Boston",
    feature: 13,
    icon: p1,
    num: 2,
    location: 2,
  },
];

export const timeFormat = [
  {
    id: "1",
    slot: "Morning",
    firstTime: "10-11 AM",
    secondTime: "11-12 AM",
  },
  {
    id: "2",
    slot: "Afternoon",
    firstTime: "01-02 PM",
    secondTime: "03-04 PM",
  },
  {
    id: "3",
    slot: "Evening",
    firstTime: "05-06 PM",
    secondTime: "06-07 PM",
  },
];

export const DrAvailabilityFormat = [
  {
    id: "1",
    slot: "Morning",
    firstTime: "10-11 AM",
    secondTime: "11-12 AM",
    cross: Cross_logo,
  },
  {
    id: "2",
    slot: "Afternoon",
    firstTime: "01-02 PM",
    secondTime: "03-04 PM",
    cross: Cross_logo,
  },
  {
    id: "3",
    slot: "Evening",
    firstTime: "05-06 PM",
    secondTime: "06-07 PM",
    cross: Cross_logo,
  },
];

export const genderData = [{
  id: "1",
  name: "Male",
  radio: true,
},
{
  id: "2",
  name: "Female",
  radio: true,
},]

export const maritalStatusData = [
  {
    id: "1",
    name: "Single",
    radio: true,
  },
  {
    id: "2",
    name: "Married",
    radio: true,
  },
];

export const stateMadicalCouncil=[
  {
    label: "Andhra Pradesh Medical Council",
    value: "AP"
  },
  {
    label: "Arunachal Pradesh Medical Council",
    value: "AR"
  },
  {
    label: "Assam Medical Council",
    value: "AS"
  },
  {
    label: "Bihar Medical Council",
    value: "BR"
  },
  {
    label: "Chhattisgarh Medical Council",
    value: "CG"
  },
  {
    label: "Delhi Medical Council",
    value: "DL"
  },
  {
    label: "Goa Medical Council",
    value: "GA"
  },
  {
    label: "Gujarat Medical Council",
    value: "GJ"
  },
  {
    label: "Haryana Medical Council",
    value: "HR"
  },
  {
    label: "Himachal Pradesh Medical Council",
    value: "HP"
  },
  {
    label: "Jammu & Kashmir Medical Council",
    value: "JK"
  },
  {
    label: "Jharkhand Medical Council",
    value: "JH"
  },
  {
    label: "Karnataka Medical Council",
    value: "KA"
  },
  {
    label: "Kerala Medical Council",
    value: "KL"
  },
  {
    label: "Madhya Pradesh Medical Council",
    value: "MP"
  },
  {
    label: "Maharashtra Medical Council",
    value: "MH"
  },
  {
    label: "Manipur Medical Council",
    value: "MN"
  },
  {
    label: "Meghalaya Medical Council",
    value: "ML"
  },
  {
    label: "Mizoram Medical Council",
    value: "MZ"
  },
  {
    label: "Nagaland Medical Council",
    value: "NL"
  },
  {
    label: "Odisha Council of Medical Registration",
    value: "OD"
  },
  {
    label: "Punjab Medical Council",
    value: "PB"
  },
  {
    label: "Rajasthan Medical Council",
    value: "RJ"
  },
  {
    label: "Sikkim Medical Council",
    value: "SK"
  },
  {
    label: "Tamil Nadu Medical Council",
    value: "TN"
  },
  {
    label: "Tripura Medical Council",
    value: "TR"
  },
  {
    label: "Uttar Pradesh Medical Council",
    value: "UP"
  },
  {
    label: "Uttarakhand Medical Council",
    value: "UK"
  },
  {
    label: "West Bengal Medical Council",
    value: "WB"
  }
]
