import { View, TextInput, ScrollView } from "react-native";
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

const CancelSheet = ({ refSheet, id }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef();
  const [rejectionType, setRejectionType] = useState();
  const [description, setDescription] = useState("");

  const onPressRejectionTypeButton = (id, message) => {
    if (rejectionType !== message) {
      setRejectionType(message);
      setDescription("");
    } else {
      setRejectionType();
      setDescription("");
    }
  };

  const onPressReject = () => {
    // return successCallBack();

    let data = {
      appointment_id: id,
      message: rejectionType === "Other" ? description : rejectionType,
    };
    
    dispatch(CancelMeeting(data, successCallBack));
  };

  // const focus = useIsFocused();
  // useEffect(() => {
  //   if (focus) {
  //     successCallBack();
  //   }
  // }, [focus]);
  const successCallBack = () => {
    dispatch(SectionListhangeMrTabScreen(0));
    // NavigationService.navigate(MR_APPOINTMENT_SCREEN);

    // NavigationService.navigate()
    // NavigationService.navigate(MR_APPOINTMENT_SCREEN, { id: 3 });
    // NavigationService.navigate(NAVIGATION_DR_BOTTOM_TAB_STACK, { id: 3 });
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
        <View style={{ flex: 1, marginHorizontal: 16 }}>
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
                <View
                key={index}
                >
                  {/* <TouchableOpacityView
                    onPress={() =>
                      onPressRejectionTypeButton(index, e?.message)
                    }
                    style={styles.appointmentContainer}
                    key={e.id}
                  > */}
                    <RadioButton
                      value={rejectionType === e?.message ? true : false}
                      message={e?.message}
                      onPress={() =>
                        onPressRejectionTypeButton(index, e?.message)
                      }
                      radioContainerStyle={styles.appointmentContainer}
                    />
                    {/* <AppText
                      style={styles.message}
                      type={SIXTEEN}
                      weight={LIGHT}
                    >
                      {e?.message}
                    </AppText> */}
                  {/* </TouchableOpacityView> */}
                 
                  {index === 1 && rejectionType === "Other" && (
                    <>
                      <TouchableOpacityView
                        style={[styles.typeHereBox, styles.type,{height:140}]}
                        onPress={() => inputRef?.current?.focus()}
                      >
                        <TextInput
                          placeholderTextColor={colors.place_holder}
                          placeholder={placeHolderText.typeHere}
                          onChangeText={(text) => setDescription(text)}
                          multiline={true}
                          ref={inputRef}
                          value={description}
                          style={{
                            fontFamily: fontFamily,
                            fontSize: 14,
                            color: colors.defaultText,
                            // height: inputHeight,
                            // flex: 1,
                          }}
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
