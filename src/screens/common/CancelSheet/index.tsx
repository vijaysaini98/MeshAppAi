import { View, TextInput, ScrollView, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import {
  AppText,
  Button,
  RadioButton,
  SEMI_BOLD,
  TWENTY_FOUR,
} from "../../../common";
import { styles } from "../../../styles/styles";
import { cancelMessage } from "../../../helper/dummydata";
import RBSheet from "react-native-raw-bottom-sheet";
import { useAppDispatch } from "../../../store/hooks";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { colors } from "../../../theme/colors";
import { placeHolderText } from "../../../helper/Constants";
import { fontFamily } from "../../../theme/typography";
import { CancelMeeting } from "../../../slices/mrSlice/mrAction";
import { SectionListhangeMrTabScreen } from "../../../slices/mrSlice/mrSlice";

const CancelSheet = ({ refSheet, id }:{refSheet:any , id:number}) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef();
  const [rejectionType, setRejectionType] = useState();
  const [description, setDescription] = useState("");

  const onPressRejectionTypeButton = (id:number | undefined, message:string) => {
    if (rejectionType !== message) {
      setRejectionType(message);
      setDescription("");
    } else {
      setRejectionType();
      setDescription("");
    }
  };

  const onPressReject = () => {
    let data = {
      appointment_id: id,
      message: rejectionType === "Other" ? description : rejectionType,
    };

    dispatch(CancelMeeting(data, successCallBack));
  };

  const successCallBack = () => {
    dispatch(SectionListhangeMrTabScreen(0));
  };

  return (
    <View>
      <RBSheet
        ref={refSheet}
        height={480}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: colors.rbSheetBackgroung,
          },
          draggableIcon: {
            backgroundColor: "silver",
            width: 100,
          },
        }}
      >
        <View style={cancelStyles.container}>
          <AppText
            type={TWENTY_FOUR}
            weight={SEMI_BOLD}
            style={styles.sendMessageBottomSheet}
          >
            Cancel Reason
          </AppText>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.rejectionBox}
          >
            {cancelMessage?.map((e, index) => {
              return (
                <View key={index}>
                  <RadioButton
                    value={rejectionType === e?.message ? true : false}
                    message={e?.message}
                    onPress={() =>
                      onPressRejectionTypeButton(index, e?.message)
                    }
                    radioContainerStyle={styles.appointmentContainer}
                  />

                  {index === 1 && rejectionType === "Other" && (
                    <>
                      <TouchableOpacityView
                        style={[
                          styles.typeHereBox,
                          styles.type,
                          { height: 140 },
                        ]}
                        onPress={() => inputRef?.current?.focus()}
                      >
                        <TextInput
                          placeholderTextColor={colors.place_holder}
                          placeholder={placeHolderText.typeHere}
                          onChangeText={(text) => setDescription(text)}
                          multiline={true}
                          ref={inputRef}
                          value={description}
                          style={cancelStyles.input}
                        />
                      </TouchableOpacityView>
                    </>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.sendMessageSubmitButton}>
          <Button
            containerStyle={styles.submit}
            children="Submit"
            onPress={() => onPressReject()}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default CancelSheet;

const cancelStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    marginHorizontal: 16 
  },
  input: {
    fontFamily: fontFamily,
    fontSize: 14,
    color: colors.defaultText,
  },
});
