import React from 'react';
import {StyleSheet, View,Image} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../theme/colors';
import {borderWidth} from '../theme/dimens';
import TouchableOpacityView from './TouchableOpacityView';
;
import {camera_ic_big, gallery_ic} from '../helper/ImageAssets';
import {AppText} from './AppText';
import {getCameraPermissions, getGalleryPermissions} from '../helper/utility';
import {showError} from '../helper/logger';
import {errorText} from '../helper/Constants';

const PictureModal = ({
  isVisible,
  onBackButtonPress,
  onPressCamera,
  onPressGallery,
  isFront = false,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={1}
      onBackdropPress={onBackButtonPress}
      onBackButtonPress={onBackButtonPress}>
      <View style={[styles.container]}>
        <TouchableOpacityView
          onPress={() => {
            onBackButtonPress();
            setTimeout(() => {
              getCameraPermissions().then(res => {
                if (res) {
                  onPressCamera();
                } else {
                  showError(errorText.cameraPermission);
                }
              });
            }, 1500);
          }}
          style={styles.singleContainer}>
          <Image
            source={camera_ic_big}
            resizeMode="contain"
            style={styles.icon}
          />
          <AppText>Camera</AppText>
        </TouchableOpacityView>
        {!isFront && (
          <TouchableOpacityView
            onPress={() => {
              onBackButtonPress();
              setTimeout(() => {
                getGalleryPermissions().then(res => {
                  if (res) {
                    onPressGallery();
                  } else {
                    showError(errorText.galleryPermission);
                  }
                });
              }, 1500);
            }}
            style={styles.singleContainer}>
            <Image
              source={gallery_ic}
              resizeMode="contain"
              style={styles.icon}
            />
            <AppText>Gallery</AppText>
          </TouchableOpacityView>
        )}
      </View>
    </Modal>
  );
};

export {PictureModal};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryText,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  icon: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  singleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
