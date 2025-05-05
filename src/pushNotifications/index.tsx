import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import PushNotification from "react-native-push-notification";
import Toast from "react-native-simple-toast";

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    GetFcmToken();
  }
};

let GetFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem("fcmtoken");
  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken();
      await AsyncStorage.setItem("fcmtoken", fcmToken);
    } catch (error) {
      console.log(error, "error");
    }
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    Alert.alert("Notification caused app to open from background state:");

    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });

  messaging().onMessage(async (remoteMessage) => {
    Toast.show(remoteMessage?.notification?.body, Toast.LONG);
    // Alert.alert(remoteMessage?.notification?.body);
    PushNotification.localNotification({
      message: remoteMessage?.notification.body,
      title: remoteMessage?.notification.title,
      bigPictureUrl: remoteMessage?.notification.android.imageUrl,
      smallIcon: remoteMessage?.notification.android.imageUrl,
    });
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        Alert.alert("Notification caused app to open from quit state:");

        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });

  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });
};
