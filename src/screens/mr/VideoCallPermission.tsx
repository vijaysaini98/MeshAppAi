import { Image, NativeModules, StyleSheet, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { AppText, BOLD, EIGHTEEN, SEMI_BOLD, SIXTEEN, TEN } from "../../common";
import { colors } from "../../theme/colors";
import { logoIcon, switchIcon } from "../../helper/ImageAssets";
import TouchableOpacityView from "../../common/TouchableOpacityView";
const { OverlayPermissionModule, UnlockDevice } = NativeModules;

const DisplayPermission = ({ isVisible, setIsVisible }) => {
    const onSubmit = async () => {
      setIsVisible(false);
      OverlayPermissionModule?.requestOverlayPermission();
    };
  
    return (
      <ReactNativeModal isVisible={isVisible}>
        <View style={styles.displayMain}>
          <AppText weight={SEMI_BOLD} type={SIXTEEN}>
            Almost done
          </AppText>
          <AppText style={{textAlign: "center"}} type={TEN} 
        //   color={SECOND}
          >
            Get Realtime notifications for your consultations by enabling
            <AppText weight={SEMI_BOLD}>"Display over other apps"</AppText>
            in your system settings
          </AppText>
          <View style={styles.displaySecond}>
            <View style={styles.displayThird}>
              <Image
                source={logoIcon}
                style={styles.historyIcon}
                resizeMode="contain"
              />
              <AppText type={EIGHTEEN} weight={BOLD}>
                MeshApp.Ai
              </AppText>
            </View>
            <Image
              source={switchIcon}
              resizeMode="contain"
              style={styles.switchIcon}
            />
          </View>
  
          <AppText
            onPress={() => {
              setIsVisible(false);
            }}
          >
            MAYBE LATER
          </AppText>
          <TouchableOpacityView
          style={styles.butonContainer}
          onPress={() => {
            onSubmit();
          }}
          >
            <AppText style={styles.txtContainer} >
            {"GO TO SETTINGS"}
            </AppText>
          </TouchableOpacityView>
        </View>
      </ReactNativeModal>
    );
  };

  export default DisplayPermission;

  const styles = StyleSheet.create({
    displayMain: {
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      },
      displaySecond: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        marginVertical: 40,
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
      },
      displayThird: {
        flexDirection: "row",
        alignItems: "center",
      },
      historyIcon: {
        height: 50,
        width: 50,
        marginEnd: 10,
      },
      switchIcon: {
        height: 30,
        width: 30,
      },
      butonContainer: {
        marginTop: 20,
      },
      txtContainer: {
        // color: Theme.COLORS.white,
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 10,
        // backgroundColor: "red",
        // alignSelf: "center",
        // paddingHorizontal: 4,
      },
  })