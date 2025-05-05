import { Image, Linking, Modal, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { NewUpdate } from "../../../helper/ImageAssets";
import { AppText, BOLD, EIGHTEEN, WHITE } from "../../../common";
import { colors } from "../../../theme/colors";

const UpdateModal = ({ visible, imageUrl }) => {


  const onPressUpdate = () => {
    if (Platform.OS === 'ios') {
      // Linking.openURL(
      //   'https://play.google.com/store/apps/details?id=com.meshappAi',
      // );
    } else if (Platform.OS === 'android') {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.meshappAi',
      );
    }
  };

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity 
        activeOpacity={1}
        onPress={onPressUpdate}
        style={styles.container}>
          <Image
            style={styles.image}
            source={NewUpdate}
            // resizeMode={FastImage.resizeMode.cover}
            resizeMode="cover"
          />
          <TouchableOpacity
          activeOpacity={0.8}
          style={styles.updateBtnStyle}
          onPress={onPressUpdate}
          >
            <AppText
            type={EIGHTEEN}
            weight={BOLD}
            color={WHITE}
            >{"Update"}</AppText>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
      },
      overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      updateBtnStyle:{
        zIndex:999,
        position:'absolute',
        backgroundColor:colors.buttonBg,
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20,
        bottom:150,
        borderRadius:8,
        elevation:2
      }
  });
  
  export default UpdateModal;
