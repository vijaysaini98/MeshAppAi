import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

import { Platform } from "react-native";
import { FCM_TOKEN_KEY, IMAGE_PATH1, NOTIFICATION_DATA } from "./helper/Constants";
import NotifService from "./NotifService";
import IncomingCall from "../libs/react-native-incoming-call";
import { displayIncomingCallNow, getNewUuid } from "./helper/utility";
import RNCallKeep from "react-native-callkeep";

export default class FcmService {
  constructor() {
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this)
    );
  }
  onRegister(token) {}

  onNotif(notif) {}
  register = (onNotification, onOpenNotification) => {
    this.checkPermission(onNotification, onOpenNotification);
  };

  registerAppWithFCM = (onNotification, onOpenNotification) => {
    if (Platform.OS === "ios") {
      messaging()
        .registerDeviceForRemoteMessages()
        .then((register) => {
          this.getToken(onNotification, onOpenNotification);
        });
    } else {
      this.getToken(onNotification, onOpenNotification);
    }
  };

  checkPermission = (onNotification, onOpenNotification) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled == messaging.AuthorizationStatus.AUTHORIZED) {
          this.registerAppWithFCM(onNotification, onOpenNotification);
          //user has permission
        } else {
          //user don't have permission
          this.requestPermission(onNotification, onOpenNotification);
        }
      })
      .catch((error) => {
        this.requestPermission(onNotification, onOpenNotification);
        let err = `check permission error${error}`;
        // Alert.alert(err)
        console.log("[FCMService] Permission rejected", error);
      });
  };

  getToken = async (onNotification, onOpenNotification) => {
    let fcmToken = await AsyncStorage.getItem(FCM_TOKEN_KEY);
    console.log("fcmToken", fcmToken);

    messaging()
      .getToken()
      .then((fcmToken) => {
        // Alert.alert(fcmToken)
        console.log("New FCM token refresh: ", fcmToken);
        if (fcmToken) {
          this.setToken(fcmToken);
        } else {
          console.log("[FCMService] User does not have a device token");
        }
      })
      .catch((error) => {
        console.log("[FCMService] getToken rejected ", error);
      });

    this.createNoitificationListeners(onNotification, onOpenNotification);
  };

  async setToken(token) {
    await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
  }

  async setData(data) {
    await AsyncStorage.setItem(NOTIFICATION_DATA, JSON.stringify(data));
  }

  requestPermission = (onNotification, onOpenNotification) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.registerAppWithFCM(onNotification, onOpenNotification);
      })
      .catch((error) => {
        console.log("[FCMService] Requested permission rejected", error);
        Alert.alert(
          "Notification Permission Required",
          "Please allow notification permission to receive important updates.",
          [
            {
              text: "OK",
              onPress: () => this.requestPermission(onNotification, onOpenNotification),
            },
          ]
        );
      });
  };

  deletedToken = async () => {
    await messaging()
      .deleteToken()
      .catch((error) => {
        console.log("Delected token error ", error);
      });
  };

  createNoitificationListeners = (onNotification, onOpenNotification) => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
     
      console.log(
        "[FCMService] onNotificationOpenedApp Notification caused app to open from background state:",
        remoteMessage
      );
      if (remoteMessage) {
        onOpenNotification(remoteMessage);
      }
    });

    // when the application is opened form a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        //app is closed and inactive
        console.log(
          "[FCMService] getInitialNotification Notification caused app to open from quit state:",
          remoteMessage
        );
        if (remoteMessage) {
          onOpenNotification(remoteMessage);
        }
      });

    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert(remoteMessage)
      console.log("[FCMService] A new FCM message arrived", remoteMessage);
      
      if (remoteMessage) {
        if (remoteMessage?.data?.token) {
      let callerImage =remoteMessage?.data?.doctorAvatar1 ? `${IMAGE_PATH1}${remoteMessage?.data?.doctorAvatar}` : `https://ui-avatars.com/api/?name=MeshApp.Ai&background=0D8ABC&color=fff`
      let infoText = remoteMessage?.data?.body1 ? `${remoteMessage?.data?.body}` : "Incomming Call"
          this.setData(remoteMessage?.data);
          if (Platform.OS === "android") {
            IncomingCall.display(
              getNewUuid(), // Call UUID v4
              "MeshApp.Ai", // Username
              `https://ui-avatars.com/api/?name=MeshApp.Ai&background=0D8ABC&color=fff`, // Avatar URL
              "Incomming Call", // Info text
              45000 // Timeout for end call after 20s
            );
          } else {
            RNCallKeep.setup({
              ios: {
                appName: "MeshApp.Ai",
                imageName: "app_icon",
              },
              android: {
                alertTitle: "Permissions required",
                alertDescription:
                  "This application needs to access your phone accounts",
                cancelButton: "Cancel",
                okButton: "ok",
                additionalPermissions: [],
              },
            });
            displayIncomingCallNow(remoteMessage?.data);
          }
        } else {
          this.notif.localNotif(remoteMessage);
        }
      }
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
      if (remoteMessage?.data?.token) {
        // PushNotification.setApplicationIconBadgeNumber(0);
        this.setData(remoteMessage?.data);
        if (Platform.OS === "android") {
          IncomingCall.display(
            getNewUuid(), // Call UUID v4
            "MeshApp.Ai", // Username
            `https://ui-avatars.com/api/?name=MeshApp.Ai&background=0D8ABC&color=fff`, // Avatar URL
            "Incomming Call", // Info text
            45000 // Timeout for end call after 20s
          );
        } else {
          RNCallKeep.setup({
            ios: {
              appName: "MeshApp.Ai",
              imageName: "app_icon",
            },
            android: {
              alertTitle: "Permissions required",
              alertDescription:
                "This application needs to access your phone accounts",
              cancelButton: "Cancel",
              okButton: "ok",
              additionalPermissions: [],
            },
          });
          displayIncomingCallNow(remoteMessage?.data);
        }
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      console.log("New FCM token refresh: ", fcmToken);
      this.setToken(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}
