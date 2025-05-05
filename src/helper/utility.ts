import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, PermissionsAndroid, Platform, Share } from "react-native";
import {
  CLIENT_ID,
  TAB_PARAMS_DATA,
  TAB_PARAMS_REVERSE_DATA,
  USER_TOKEN_KEY,
} from "./Constants";
import { appOperation } from "../appOperation";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
// import Clipboard from '@react-native-community/clipboard';
import { showError } from "./logger";
import DeviceInfo from "react-native-device-info";
import FileViewer from "react-native-file-viewer";
import Geolocation from "react-native-geolocation-service";
// import uuid from "uuid";
import { v4 as uuidv4 } from 'uuid'
import RNCallKeep from "react-native-callkeep";

const { width, height } = Dimensions.get("window");


export const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export const isTablet = width > 600;

export const shareToAny = (message: string) => {
  const shareOptions = {
    message: message,
  };

  Share.share(shareOptions);
};

export const validateEmail = (email: string) => {
  const expression =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(email);
};

export const validatePassword = (value: string) => {
  const expression =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i;

  return expression.test(value);
};

export const validatePhoneNumber = (value: string) => {
  const expression = /^[0-9]{10}$/;

  return expression.test(value);
};

export const isEmptyObject = (obj: Object) => {
  return Object.keys(obj).length === 0;
};

export const cleanObject = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => (v !== ""  && v !== undefined && v !== null))
  );
};

export const onAppStart = async (store) => {
  try {
    const customerToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
    appOperation.setCustomerToken(customerToken);
  } catch (error) {
    console.log(error);
  }
};

export async function getCameraPermissions() {
  const granted = await request(
    Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA,
    }),
    {
      title: "App required Camera permission",
      message:
        "We required Camera permission in order to use device camera" +
        "Please grant us.",
    }
  );

  return granted === RESULTS.GRANTED;
}

export async function getGalleryPermissions() {
  let systemVersion = DeviceInfo.getSystemVersion();

  const granted = await request(
    Platform.select({
      android:
        systemVersion < 12
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    }),
    {
      title: "App required Library permission",
      message:
        "We required Library permission in order to use access media library" +
        "Please grant us.",
    }
  );

  return granted === RESULTS.GRANTED;
}

export function getNext7Days(num) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const next7Days = [];

  for (let i = 0; i < num; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);

    const dayOfWeek = daysOfWeek[nextDate.getDay()];
    const dayOfMonth = nextDate.getDate();
    const month = nextDate.toLocaleString("default", { month: "short" });

    const dateString = `${dayOfWeek}, ${dayOfMonth} ${month} ${nextDate.getFullYear()}`;
    next7Days.push(dateString);
  }

  return next7Days;
}

export const openFile = (destinationUrl: string) => {
  const path = destinationUrl;

  FileViewer.open(path)
    .then(() => {
      console.log("DownloadAndViewFile:: File Open Successfully");
    })
    .catch((error: any) => {
      console.log("DownloadAndViewFile:: File failed", error);
    });
};

export const getKey = async () => {
  try {
    const tabParamsData = await AsyncStorage.getItem(TAB_PARAMS_DATA);
    return tabParamsData;
  } catch (error) {
    return "";
  }
};

export const getReverseKey = async () => {
  try {
    const tabParamsReveseData = await AsyncStorage.getItem(
      TAB_PARAMS_REVERSE_DATA
    );
    return tabParamsReveseData;
  } catch (error) {
    return "";
  }
};

export const getClientId = async () => {
  try {
    const clientId = await AsyncStorage.getItem(CLIENT_ID);
    return clientId;
  } catch (error) {
    return "";
  }
};

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Radius of the Earth in meters
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export async function getMrLocation(targetLat, targetLon, type, setBtnLoader) {
  return new Promise(async (resolve, reject) => {
    if (setBtnLoader) {
      setBtnLoader(true);
    }

    const handlePosition = (position) => {
      if (type === "mr") {
        const distance = getDistanceFromLatLonInMeters(
          targetLat,
          targetLon,
          position.coords.latitude,
          position.coords.longitude
        );
        setBtnLoader && setBtnLoader(false);
        resolve({ isWithin500Meters: distance <= 500, distance });
      } else {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    };

    const handleError = (error) => {
      console.error("Error getting location", error);
      setBtnLoader && setBtnLoader(false);
      resolve(null);
    };

    if (Platform.OS === "ios") {
      const permissionCheck = await Geolocation.requestAuthorization("always");
      if (permissionCheck === "granted") {
        Geolocation.getCurrentPosition(handlePosition, handleError, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        });
      } else {
        setBtnLoader && setBtnLoader(false);
        resolve(null);
      }
    } else if (Platform.OS === "android") {
      const permissionFineLocation = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      const permissionCoarseLocation = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      );

      if (!permissionFineLocation || !permissionCoarseLocation) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        if (
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          Geolocation.getCurrentPosition(handlePosition, handleError, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          });
        } else {
          setBtnLoader && setBtnLoader(false);
          resolve(null);
        }
      } else {
        Geolocation.getCurrentPosition(handlePosition, handleError, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        });
      }
    }
  });
}

export function isNewerVersion(oldVer, newVer) {
  const oldParts = oldVer?.split(".");
  const newParts = newVer?.split(".");
  for (var i = 0; i < newParts?.length; i++) {
    const a = ~~newParts[i]; // parse int
    const b = ~~oldParts[i]; // parse int
    if (a > b) return true;
    if (a < b) return false;
  }
  return false;
}

export const getStatus = (code) => {
  switch (code) {
    case "800":
      return "Pending";
      break;
    case "900":
      return "Accepted";
      break;
    case "1000":
      return "Completed";
      break;
    case "1100":
      return "Rejected";
      break;
    case "1200":
      return "Expired";
      break;
    case "1300":
      return "Cancel";
      break;
    case "1400":
      return "Refund Pending";
      break;
    case "1500":
      return "Refund Rejected";
      break;
    case "1600":
      return "Refunded";
      break;
    case "1700":
      return "Doctor Need To Reschedule";
      break;
    default:
      return "Pending";
      break;
  }
};

export function isDateSame(dateString1: string, dateString2: string) {
  return dateString1 == dateString2;
}

const getRandomNumber = () => String(Math.floor(Math.random() * 100000));
 
export const getNewUuid = () => {
  // uuid?.v4().toLowerCase()
  return uuidv4().toLowerCase()
}

export const displayIncomingCallNow = (data: any) => {
  console.log("+++++",data);
  displayIncomingCall(getRandomNumber(), data);
};

const displayIncomingCall = (number: string, data: any) => {
  const callUUID = getNewUuid();
  RNCallKeep.displayIncomingCall(callUUID, number, "MeshApp.Ai", "number", true);
};

export const hangup = (callUUID: string) => {
  RNCallKeep.endAllCalls();
};