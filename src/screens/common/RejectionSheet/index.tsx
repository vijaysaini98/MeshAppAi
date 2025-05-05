import { View, TextInput, ScrollView } from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  AppText,
  Button,
  RadioButton,
  SEMI_BOLD,
  TWENTY_FOUR,
} from "../../../common";
import { styles } from "../../../styles/styles";
import { rejectionMessage } from "../../../helper/dummydata";
import RBSheet from "react-native-raw-bottom-sheet";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { requestStatus } from "../../../slices/drSlice/drAction";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { colors } from "../../../theme/colors";
import { placeHolderText } from "../../../helper/Constants";
import { fontFamily } from "../../../theme/typography";
import Toast from "react-native-simple-toast";
import { dimensions, getKey } from "../../../helper/utility";
import NavigationService from "../../../navigation/NavigationService";

interface RejectionSheetProps {
  refSheet: any;
  id?: number;
  date?: Date;
  type?: string | undefined;
}

const RejectionSheet: FC<RejectionSheetProps> = ({
  refSheet,
  id,
  date,
  type,
}) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef();
  const { isBtnLoading } = useAppSelector((state) => {
    return state.auth;
  });
  const [rejectionType, setRejectionType] = useState<string>("");
  const [description, setDescription] = useState("");
  const [keyData, setKeyData] = useState([]);

  const onPressRejectionTypeButton = (id?: number, message?: string) => {
    if (rejectionType !== message) {
      setRejectionType(message);
      setDescription("");
    } else {
      setRejectionType("");
      setDescription("");
    }
  };

  const getNewKey = async () => {
    let newKey = await getKey();
    if (newKey) {
      setKeyData(JSON.parse(newKey));
    }
  };

  useEffect(() => {
    getNewKey();
  }, []);

  const onPressReject = () => {
    if (!rejectionType) {
      return Toast.show("Please select the rejection reason", Toast.LONG);
    }

    let data = {
      request: "Reject",
      appointment_id: id,
      appointment_status: keyData?.appointment_status?.Rejected
        ? keyData?.appointment_status?.Rejected?.toString()
        : "",
      rejection_reason: rejectionType,
      date: date,
    };
    dispatch(requestStatus(data, "fromReject", successCallBack));
  };

  const successCallBack = () => {
    refSheet?.current?.close();
    if (type == "CallingReject") {
      NavigationService.goBack();
    }
  };

  const filteredMessages =
    type == "CallingScreen"
      ? rejectionMessage
      : rejectionMessage.filter((_, index) => index !== 3); // Show all except 4th on other screens

  const handleClearValues = () => {
    setRejectionType("");
    setDescription("");
  };

  return (
    <RBSheet
      ref={refSheet}
      useNativeDriver={false}
      closeOnPressMask={true}
      closeOnPressBack={true}
      openDuration={200}
      closeDuration={200}
      draggable={false}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0,0,0, 0.7)",
        },
        draggableIcon: {
          width: 150,
          backgroundColor: colors.border,
        },
        container: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          elevation: 18,
        },
      }}
      customModalProps={{
        animationType: "slide",
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
      height={dimensions.height * 0.65}
      onClose={handleClearValues}
    >
      <View
        key={id}
        style={{
          flex: 1,
          marginHorizontal: 16,
          marginTop: 10,
        }}
      >
        <AppText
          type={TWENTY_FOUR}
          weight={SEMI_BOLD}
          style={styles.sendMessageBottomSheet}
        >
          Reason for rejection
        </AppText>
        <ScrollView
          style={styles.rejectionBox}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredMessages?.map((e, index) => {
            return (
              <View key={e?.id}>
                <RadioButton
                  value={rejectionType === e?.message ? true : false}
                  message={e?.message}
                  onPress={() => onPressRejectionTypeButton(index, e?.message)}
                  radioContainerStyle={styles.appointmentContainer}
                />
                {(type == "CallingReject" ? index === 4 : index == 3) &&
                  rejectionType === "Other" && (
                    <>
                      <TouchableOpacityView
                        style={styles.typeHereBox}
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
          loading={isBtnLoading}
          containerStyle={styles.submit}
          children="Submit"
          onPress={() => onPressReject()}
        />
      </View>
    </RBSheet>
  );
};

export default RejectionSheet;
