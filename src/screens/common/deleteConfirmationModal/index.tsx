import React, { Children } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { AppText, Button, EIGHTEEN, MEDIUM } from "../../../common";
import { colors } from "../../../theme/colors";

interface DeleteConfirmationModalProps {
  visible?: boolean;
  confirmationText?: string | undefined;
  buttonTitle?: string;
  onCancel?: () => void;
  onDelete?: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  confirmationText,
  buttonTitle,
  onCancel,
  onDelete
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AppText
              type={EIGHTEEN}
              weight={MEDIUM}
              style={{ textAlign: "center" }}
            >
              {confirmationText
                ? confirmationText
                : "Are you sure you want to delete?"}
            </AppText>
            <View style={styles.buttonContainer}>
              <Button
                children={buttonTitle ? buttonTitle : "Ok"}
                containerStyle={styles.okButtonStyle()}
                onPress={onDelete}
              />
              <Button
                children="Cancel"
                containerStyle={styles.okButtonStyle("#ccc")}
                onPress={onCancel}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteConfirmationModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    width: "100%",
    justifyContent: "center",
    gap: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  okButtonStyle:(color)=>({
    marginRight: 20,
     flex: 1 ,
     backgroundColor: color ?  color : colors.buttonBg
   })
});
