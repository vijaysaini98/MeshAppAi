import React from "react";
import { Modal, View, Image, StyleSheet } from "react-native";
import { UnderMaintainess } from "../../../helper/ImageAssets";
// import { UnderMaintainess } from "../../../assets"; // Make sure this path is correct

const MaintenanceModal = ({ visible, imageUrl }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={
            imageUrl
              ? { uri: imageUrl }
              : UnderMaintainess
          }
          resizeMode="cover"
        />
      </View>
    </Modal>
  );
};

export default MaintenanceModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "50%",
    borderRadius: 10,
  },
});
