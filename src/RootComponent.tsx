import React, { useEffect, useRef, useState } from "react";
import { AppRegistry, DeviceEventEmitter,NativeModules, PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import FcmService from "./FcmService";
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { AppText, BOLD, TEN, THIRTEEN, WHITE } from "./common";
import { config } from "../config/config";
import { colors } from "./theme/colors";
import UpdateModal from "./screens/common/AppStatusModal/UpdateModal";
import MaintenanceModal from "./screens/common/AppStatusModal/MaintainessModal";
import { getAppVersion } from "./actions/authActions";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import ReactNativeVersionInfo from "react-native-version-info";
import { displayIncomingCallNow, getNewUuid, hangup, isNewerVersion } from "./helper/utility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMAGE_PATH1, NOTIFICATION_DATA, VALUES } from "./helper/Constants";
import RNCallKeep from "react-native-callkeep";
import {
  ClientRoleType,
  createAgoraRtcEngine,
  ChannelProfileType,
  IRtcEngineEx,
} from "react-native-agora";
import IncomingCall from "../libs/react-native-incoming-call";
import { AghoraVideo } from "./screens/common/AgoraComponent";

const { UnlockDevice } = NativeModules;

const NoInternetModal = ({ visible }) => {
  return visible ? (
    <View style={styles.noInternet}>
      <AppText type={THIRTEEN} color={WHITE} weight={BOLD}>
        No Internet Connection
      </AppText>
    </View>
  ) : (
    <></>
  );
};

const ServerCheckComp = ({ visible }) => {
  return visible ? (
    <View style={styles.serverCheckContainer}>
      <AppText type={TEN} color={WHITE} weight={BOLD}>
        {"Staging"}
      </AppText>
    </View>
  ) : (
    <></>
  );
};

let version = ReactNativeVersionInfo.appVersion;
let buildVersion = ReactNativeVersionInfo.buildVersion;

const RootComponent = ({ children }) => {
  const dispatch = useAppDispatch()

  const { appInfo } = useAppSelector((state) => state.auth);

  const [netConnected, setNetConnected] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false)
  const [isMaintainess, setIsMaintainess] = useState(false);

  const agoraEngineRef = useRef<IRtcEngineEx>(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isMute, setIsMute] = useState(true); // Indicates if current user is mute or note
  const [remoteUid, setRemoteUid] = useState(0);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [remoteVideoEnabled, setRemoteVideoEnabled] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetConnected(state?.isConnected);
    });
    return unsubscribe;
  }, [visible]);

  useEffect(() => {
    let fcmService = new FcmService();
    fcmService.register(onNotification, onOpenNotification);
  }, []);

  const onNotification = (message) => { };
  const onOpenNotification = (message) => { };
  // the props contain the messages and the locale

  useEffect(() => {
    if (!netConnected) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [netConnected]);


  useEffect(() => {
    dispatch(getAppVersion())
  }, [])

  useEffect(() => {
    if (appInfo && Array.isArray(appInfo)) {
      const platform = Platform.OS === 'android' ? 'Android' : 'IOS';
      const latestVersionInfo = appInfo.find(info => info.param_name === platform);
      setIsMaintainess(latestVersionInfo?.status)
      const latestVersion = latestVersionInfo?.param_description;
      
      if (latestVersion && isNewerVersion(version, latestVersion)) {
        setIsUpdate(true);
      } else {
        setIsUpdate(false);
      }
    }
  }, [appInfo, version, isUpdate,isMaintainess]);

  const uid = 0;

  useEffect(() => {
    events();
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      return;
    }
    RNCallKeep.addEventListener("answerCall", answerCall);
    RNCallKeep.addEventListener("endCall", endCall);

    return () => {
      RNCallKeep.removeEventListener("answerCall", answerCall);
      RNCallKeep.removeEventListener("endCall", endCall);
    };
  }, []);

  const events = async () => {
    if (Platform.OS === "android") {
      /**
       * App open from killed state (headless mode)
       */
      const payload = await IncomingCall.getExtrasFromHeadlessMode();
      if (payload) {
        UnlockDevice.unlock();
        setTimeout(() => {
          answerCall(null);
        }, 0);

        // Start call action here. You probably want to navigate to some CallRoom screen with the payload.uuid.
      }

      /**
       * App in foreground / background: listen to call events and determine what to do next
       */
      DeviceEventEmitter.addListener("endCall", (payload) => {
        endCall(null);
      });
      DeviceEventEmitter.addListener("answerCall", (payload) => {
        // Start call action here. You probably want to navigate to some CallRoom screen with the payload.uuid.

        if (payload?.isHeadless) {
          // Called from killed state
          IncomingCall.openAppFromHeadlessMode(payload?.uuid);
        } else {
          // Called from background state
          IncomingCall.backToForeground();
        }
        UnlockDevice.unlock();
        setTimeout(() => {
          answerCall(null);
        }, 0);
      });
    }
  };

  const answerCall = (props) => {
    if (Platform.OS === "ios") {
      RNCallKeep.backToForeground();
    }
    setupVideoSDKEngine();
  };

  const endCall = async (props) => {
    if (Platform.OS === "ios") {
      hangup(props?.callUUID);
    }

    let data = await AsyncStorage.getItem(NOTIFICATION_DATA);

    let _data = JSON.parse(data);
    let apiData = {
      id: _data?.appointmentId,
      status: "Rejected",
    };
    // dispatch(updateCallStatus(apiData));
  };
  const getPermission = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === "android") {
        await getPermission();
      }
      let data = await AsyncStorage.getItem(NOTIFICATION_DATA);

      let _data = JSON.parse(data);
      agoraEngineRef.current = createAgoraRtcEngine() as IRtcEngineEx;
      const agoraEngine = agoraEngineRef.current;

      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage(`Successfully joined the channel ${_data?.channelName}`);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage("Remote user joined with uid " + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage("Remote user left the channel. uid: " + Uid);
          setRemoteUid(0);
          leave();
          setIsJoined(false);
          setIsMute(true)
        },
        onUserEnableVideo: (_connection, Uid, muted) => {
          showMessage("Remote user change the status of video " + muted);
          setRemoteVideoEnabled(muted);
        },
        onError: (error) => {
          console.log("error::::::", error);
        },
      });

      agoraEngine.initialize({
        appId: VALUES.appId,
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
      });
      agoraEngine.enableVideo();
      if (!isJoined) {
        join();
      }
    } catch (e) {
      console.log(e);
    }
  };
  function showMessage(msg: string) {
    console.log("+++++++", msg);
  }

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      let data = await AsyncStorage.getItem(NOTIFICATION_DATA);

      let _data = JSON.parse(data);

      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication
      );

      agoraEngineRef.current?.startPreview();

      agoraEngineRef.current?.joinChannel(
        _data?.token,
        _data?.channelName,
        uid,
        {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const leave = async () => {
    try {
      setRemoteUid(0);
      setIsJoined(false);
      setIsMute(true)
      agoraEngineRef.current?.stopPreview();

      agoraEngineRef.current?.leaveChannel({
        stopAudioMixing: true,
        stopAllEffect: true,
        stopMicrophoneRecording: true,
      });

     showMessage("You left the channel");
      let data = await AsyncStorage.getItem(NOTIFICATION_DATA);

      let _data = JSON.parse(data);
      let apiData = {
        id: _data?.appointmentId,
        status: "Completed",
      };
      // dispatch(updateCallStatus(apiData, _data));
      if (Platform.OS === "ios") {
        hangup("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const switchCam = () => {
    agoraEngineRef.current?.switchCamera();
  };
  const mute = () => {
    agoraEngineRef.current?.muteLocalAudioStream(isMute);
    setIsMute(!isMute);
  };

  const onVideo = () => {
    videoEnabled
      ? agoraEngineRef.current?.disableVideo()
      : agoraEngineRef.current?.enableVideo();
    setVideoEnabled(!videoEnabled);
  };

  const netInfo = useNetInfo();

  return (
    <View style={styles.mainContainer}>
      <NoInternetModal visible={!(netInfo.isConnected && netInfo.isInternetReachable)} />
      <ServerCheckComp visible={config.ENVIRONMENT} />
      {isMaintainess && <MaintenanceModal isVisible={isMaintainess} />}
      {isUpdate && <UpdateModal isVisible={isUpdate} />}
      {children}
      {isJoined && (
        <AghoraVideo
          isVisible={isJoined}
          isJoined={isJoined}
          remoteUid={remoteUid}
          switchCam={switchCam}
          leave={leave}
          isMute={isMute}
          mute={mute}
          onVideo={onVideo}
          videoEnabled={videoEnabled}
          remoteVideoEnabled={remoteVideoEnabled}
        />
      )}
    </View>
  );
};

export default RootComponent;

async function firebaseBackgroundMessage(message: any) {
  console.log("msg::::::", message);
  await AsyncStorage.setItem(NOTIFICATION_DATA, JSON.stringify(message?.data));
  console.log("message?.data",message?.data);
  
  if(message?.data?.channelName){
    let callerImage = message?.data?.doctorAvatar  ? `${IMAGE_PATH1}${message?.data?.doctorAvatar}` : `https://ui-avatars.com/api/?name=MeshApp.Ai&background=0D8ABC&color=fff`
    let infoText = message?.data?.body ? `${message?.data?.body}` : "Incomming Call"
    if (Platform.OS === "android") {
      IncomingCall.display(
        getNewUuid(), // Call UUID v4
        "MeshApp.Ai", // Username
        `https://ui-avatars.com/api/?name=MeshApp.Ai&background=0D8ABC&color=fff`, // Avatar URL
        "Incomming Call", // Info text
        45000 // Timeout for end call after 20s
      );
      DeviceEventEmitter.addListener("answerCall", (payload) => {
        console.log("answer::2", payload);
        if (payload.isHeadless) {
          // Called from killed state
          console.log("answer::4", "killed");
          IncomingCall.openAppFromHeadlessMode(payload.uuid);
        } else {
          // Called from background state
          console.log("answer::3", "background");
          UnlockDevice.unlock();
          IncomingCall.backToForeground();
          // UnlockDevice.unlock();
        }
      });
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
      displayIncomingCallNow(message?.data);
    }
  }
  

  return Promise.resolve();
}

AppRegistry.registerHeadlessTask(
  "ReactNativeFirebaseMessagingHeadlessTask",
  () => firebaseBackgroundMessage
);

const styles = StyleSheet.create({
  mainContainer:{ 
    flex: 1 
  },
  noInternet: {
    flex:1,
    height: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  serverCheckContainer: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: Platform.OS === 'android' ? 30 : 30,
    // left: 0,
    right: -10,
    borderRadius: 10,
    zIndex: 999,
    width: "20%",
    backgroundColor: colors.buttonBg,
    transform: [{ rotate: '25deg' }]
  },
  // videoView: { width: "100%", height: dimensions.height / 2 - 20 },
  // videoView1: {
  //   width: "100%",
  //   backgroundColor: "#fff",
  //   flex: 1,
  //   height: dimensions.height,
  // },
  // btnContainer2: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   backgroundColor: "white",
  //   paddingBottom: Platform.OS === "ios" ? 40 : 0,
  // },
  // button: {
  //   paddingHorizontal: 25,
  //   paddingVertical: 4,
  //   margin: 5,
  // },
  // camera: {
  //   height: 30,
  //   width: 30,
  //   tintColor: colors.buttonBg,
  // },
});
