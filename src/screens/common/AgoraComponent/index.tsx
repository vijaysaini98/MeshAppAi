import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { RtcSurfaceView } from "react-native-agora";
import ReactNativeModal from "react-native-modal";
import { Loader } from "../../../common/SpinnerSecond";
import { AppText, SEMI_BOLD, SIXTEEN, WHITE } from "../../../common";
import {
  callEndIcon,
  muteIcon,
  noVideoIcon,
  switchCameraIcon,
  unmuteIcon,
  videoIcon,
} from "../../../helper/ImageAssets";
import { dimensions } from "../../../helper/utility";
import { colors } from "../../../theme/colors";

interface AghoraVideoProps {
  isVisible: boolean | undefined;
  isJoined: boolean | undefined;
  remoteUid: string | number | undefined;
  switchCam: () => void;
  leave: () => void;
  isMute: boolean;
  mute: () => void;
  videoEnabled: boolean;
  onVideo: () => void;
  remoteVideoEnabled: boolean;
}

export const AghoraVideo= ({
  isVisible,
  isJoined,
  remoteUid,
  switchCam,
  leave,
  isMute,
  mute,
  videoEnabled,
  onVideo,
  remoteVideoEnabled,
}: any) => {
  return (
    <ReactNativeModal isVisible={isVisible} style={{ margin: 0 }}>
      <>
        {videoEnabled ? (
          <React.Fragment key={0}>
            {isJoined ? (
              <RtcSurfaceView
                canvas={{ uid: 0 }}
                style={remoteUid == 0 ? styles.videoView1 : styles.videoView}
              />
            ) : (
              <View style={styles.loaderContainerStyle}>
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
              {"Doctor"}
            </AppText>
          </View>
        )}
        <View style={styles.btnContainer2}>
          <TouchableOpacity onPress={switchCam} style={styles.button}>
            <Image
              source={switchCameraIcon}
              resizeMode="contain"
              style={styles.camera}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={leave} style={styles.button}>
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
      </>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  loaderContainerStyle: {
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
  videoView: {
    width: "100%",
    height: dimensions.height / 2 - 20,
  },
  videoView1: {
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
    height: dimensions.height,
  },
  btnContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    paddingBottom: Platform.OS === "ios" ? 40 : 0,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    margin: 5,
  },
  camera: {
    height: 30,
    width: 30,
    tintColor: colors.buttonBg,
  },
});
