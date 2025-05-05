import React, { useRef, useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { PermissionsAndroid, Platform } from "react-native";
import {
  ClientRoleType,
  createAgoraRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
  IRtcEngineEx,
} from "react-native-agora";
import {
  AppSafeAreaView,
  AppText,
  SEMI_BOLD,
  SIXTEEN,
  WHITE,
} from "../../../common";
import { Loader } from "../../../common/SpinnerSecond";
import {
  callEndIcon,
  muteIcon,
  switchCameraIcon,
  unmuteIcon,
} from "../../../helper/ImageAssets";
import { colors } from "../../../theme/colors";
import { VALUES } from "../../../helper/Constants";
import NavigationService from "../../../navigation/NavigationService";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { endMeeting } from "../../../slices/drSlice/drAction";
import {
  setAppointmentProductData,
  setProductModal,
} from "../../../slices/drSlice/drSlice";
import RejectionSheet from "../../common/RejectionSheet";
import ProductModal from "../Home/productModal";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
const CallingScreen = ({ route }) => {
  const { appointmentId, appointmentDate } = route?.params;
  const dispatch = useAppDispatch();
  const { agoraDetails, isProductModalVisible } = useAppSelector((state) => {
    return state.doctor;
  });

  const appId = VALUES.appId;
  const channelName = agoraDetails?.channelName;
  const token = agoraDetails?.token;
  const uid = 0;
  const agoraEngineRef = useRef<IRtcEngineEx>(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isMute, setIsMute] = useState(true); // Indicates if current user is mute or note
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [remoteVideoEnabled, setRemoteVideoEnabled] = useState(true);
  const callTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rejectionSheet = useRef<any>(null);

  const getPermission = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
    callTimeoutRef.current = setTimeout(() => {
      if (!remoteUid) {
        handleMissedCall();
      }
    }, 60000); // 30 sec timeout

    return () => {
      if (callTimeoutRef.current) clearTimeout(callTimeoutRef.current);
    };
  }, [agoraDetails]);

  const handleMissedCall = () => {
    showMessage("Call was not answered.");
    Alert.alert("Call Reject", "The Mr did not answer the call.");
    const data = { appointment_id: appointmentId };
    dispatch(setProductModal(false));
    leave();
  };

  const setupVideoSDKEngine = async () => {
    try {
      if (Platform.OS === "android") {
        await getPermission();
      }

      agoraEngineRef.current = createAgoraRtcEngine() as IRtcEngineEx;
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage("Successfully joined the channel " + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage("Remote user joined with uid " + Uid);
          setRemoteUid(Uid);
          // setStartTime(new Date());

          if (callTimeoutRef.current) clearTimeout(callTimeoutRef.current);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage("Remote user left the channel. uid: " + Uid);
          leave(Uid);
          setRemoteUid(0);
          if (Uid === remoteUid) {
            setRemoteUid(0); // Ensure we reset the remote user
          }
          setIsJoined(false);
        },
        onUserEnableVideo: (_connection, Uid, muted) => {
          showMessage("Remote user change the status of video " + muted);
          setRemoteVideoEnabled(muted);
        },
      });
      agoraEngine.initialize({
        appId: appId,
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
    // setMessage(msg);
    console.log("++++++", msg);
  }
  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const leave = (id: any) => {
    try {
      setIsJoined(false);
      agoraEngineRef.current?.stopPreview();
      agoraEngineRef.current?.leaveChannel({
        stopAudioMixing: true,
        stopAllEffect: true,
        stopMicrophoneRecording: true,
      });
      showMessage("You left the channel");
      console.log("remoteUid || id", remoteUid || id);

      if (remoteUid || id) {
        const data = { appointment_id: appointmentId };
        dispatch(endMeeting(data, NavigationService.goBack()));
      } else {
        // NavigationService.goBack();
        // dispatch(setProductModal(false))
        console.log("check");
        setTimeout(()=>rejectionSheet.current.open(),700)
      }
      dispatch(setProductModal(false));
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

  const handleClose = () => {
    dispatch(setProductModal(false));
    dispatch(setAppointmentProductData([]));
  };

  return (
    <AppSafeAreaView>
      {videoEnabled ? (
        <React.Fragment key={0}>
          {isJoined ? (
            <RtcSurfaceView
              canvas={{ uid: 0 }}
              style={remoteUid == 0 ? styles.videoView1 : styles.videoView}
            />
          ) : (
            <View style={styles.loaderContainer}>
              <Loader />
            </View>
          )}
        </React.Fragment>
      ) : (
        <View style={styles.videoDisableContainer}>
          <AppText color={WHITE} type={SIXTEEN} weight={SEMI_BOLD}>
            {"MySelf"}
          </AppText>
        </View>
      )}

      {remoteVideoEnabled ? (
        isJoined && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{ uid: remoteUid }}
              style={styles.videoView}
            />
          </React.Fragment>
        ) : (
          <></>
        )
      ) : (
        <View style={styles.videoDisableContainer}>
          <AppText color={WHITE} type={SIXTEEN} weight={SEMI_BOLD}>
            {"Mr"}
          </AppText>
        </View>
      )}
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={switchCam} style={styles.button}>
          <Image
            source={switchCameraIcon}
            resizeMode="contain"
            style={styles.camera}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => leave(null)} style={styles.button}>
          <Image
            source={callEndIcon}
            resizeMode="contain"
            style={styles.camera}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onVideo} style={styles.button}>
          <Image
            source={!videoEnabled ? noVideoIcon : videoIcon}
            resizeMode="contain"
            style={styles.camera}
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={mute} style={styles.button}>
          <Image
            source={!isMute ? unmuteIcon : muteIcon}
            resizeMode="contain"
            style={styles.camera}
          />
        </TouchableOpacity>
      </View>
      <RejectionSheet
        refSheet={rejectionSheet}
        id={appointmentId}
        date={appointmentDate}
        type={"CallingScreen"}
      />
      <ProductModal
        isModalVisible={isProductModalVisible}
        onClose={() => handleClose()}
        // data={productData}
      />
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  videoDisableContainer: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    margin: 5,
  },
  main: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  scroll: {
    flex: 1,
    backgroundColor: "#ddeeff",
    width: "100%",
  },
  videoView: {
    width: "100%",
    height:
      Platform.OS === "ios"
        ? dimensions.height / 2 - 60
        : dimensions.height / 2 - 20,
  },
  videoView1: {
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
    height: dimensions.height,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: Platform.OS === "android" ? 0 : 20,
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  head: {
    fontSize: 20,
  },
  info: {
    backgroundColor: "#ffffe0",
    color: "#0000ff",
  },
  camera: {
    height: 30,
    width: 30,
    tintColor: colors.buttonBg,
  },
});

export default CallingScreen;
