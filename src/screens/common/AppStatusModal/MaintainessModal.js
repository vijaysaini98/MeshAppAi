import React from 'react';
import { Image, Modal, StyleSheet, View } from 'react-native';
import { UnderMaintainess } from '../../../helper/ImageAssets';

const MaintenanceModal = ({ visible, imageUrl }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={UnderMaintainess}
          // resizeMode={FastImage.resizeMode.cover}
          resizeMode="cover"
        />
      </View>
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
});

export default MaintenanceModal;
