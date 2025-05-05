import React, { useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, View } from 'react-native';
import TouchableOpacityView from '../../../common/TouchableOpacityView';
;
import Pdf from 'react-native-pdf';
import { Cross_icon } from '../../../helper/ImageAssets';
import { IMAGE_PATH1 } from '../../../helper/Constants';

const Screen = Dimensions.get('window');

export function ImageItem({source, style}) {
  const [height, setHeight] = useState(300);

  return (
    <View style={[{height: height, width: '100%'}, style]}>
      <Image
        source={{
          uri: source,
        }}
        resizeMode="contain"
        style={{position: 'absolute', height: '100%', width: '100%'}}
        // onLoad={evt =>
        //   setHeight(
        //     (evt.nativeEvent?.source?.height / evt.nativeEvent?.source?.width) *
        //       Screen.width,
        //   )
        // }
      />
    </View>
  );
}
const DocumentPreViewModal = ({ data, isVisible, onClose }) => {
  
  const getExtension = (filePath) => {
    const extension = filePath.split(".").pop();
    return extension;
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacityView onPress={onClose} style={styles.closeButtonStyle}>
          <Image
            resizeMode="cover"
            source={Cross_icon}
            style={styles.closeIconStyle}
          />
        </TouchableOpacityView>
        <View style={styles.container}>
          {(getExtension(data) === 'pdf' || 
            getExtension(data) !== 'jpeg' && getExtension(data) !== 'jpg' && 
            getExtension(data) !== 'png'
            ) ? (
                <Pdf
                  source={{ uri: IMAGE_PATH1 + data }}
                  trustAllCerts={Platform.OS === "ios"}
                  style={[styles.pdf, { height: 600, width: 400 }]}
                  trustAllCerts={false}
                />
              )
              :
              (
              <ImageItem source={IMAGE_PATH1 + data } />
              )
          }
        </View>
      </View>
    </Modal>
  );
};

export default DocumentPreViewModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  container:{
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    // padding: 10,
    alignItems: "center",
    width: "90%",
    // aspectRatio: 1,
  },
  closeButtonStyle:{
    position: "absolute",
    top: 2,
    right: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 24,
    zIndex: 1
  },
  closeIconStyle:{ 
    height: 24, 
    width: 24 
  },
  imageStyle:{
    width: "100%",
    height: "100%",
    resizeMode: "contain", borderRadius: 10
  },
})