import React, { useRef, useState, useCallback } from "react";
import { Keyboard, TextInput, View } from "react-native";
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  Input,
  MEDIUM,
  RadioButton,
  SEMI_BOLD,
  SpinnerSecond,
  THIRTEEN,
  Toolbar,
} from "../../../common";
import { colors } from "../../../theme/colors";
import KeyBoardAware from "../../../common/KeyboardAware";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { capitalizeFirst } from "../../../helper/utility";
import styles from "./styles";
import { postLegalQuestions } from "../../../slices/drSlice/drAction";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import { ListEmptyComponent } from "../../mr/Appointment";
import NavigationService from "../../../navigation/NavigationService";

const Leagal_Help = () => {
  const desInputRef = useRef<TextInput>(null);
  const dispatch = useAppDispatch();

  const { legalQuestions, isLoading, isBtnLoading } = useAppSelector(
    (state) => state.doctor
  );

  const [questionStates, setQuestionStates] = useState<{ [key: string]: string }>({});

  const handleInputChange = useCallback((id: string | number, value: string) => {
    setQuestionStates((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    const answers = Object.entries(questionStates).map(([id, value]) => ({
      question_id: Number(id),
      answer: value,
    }));
    const payload = { answers };
    console.log("payload", payload);

    dispatch(postLegalQuestions(payload, handleSuccess));
    Keyboard.dismiss();
  }, [questionStates, dispatch]);

  const handleSuccess = useCallback(() => {
    setQuestionStates({});
    desInputRef.current?.blur();
    NavigationService.goBack()
  }, []);

  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <Toolbar title="Legal Dispute Intake Form" />
      {isLoading ? (
        <SpinnerSecond loading={isLoading} />
      ) : (
        legalQuestions.length > 0 ?
          (
            <KeyBoardAware style={styles.containerStyle}>
              {legalQuestions.map((item: any) => {
                const value = questionStates[item.id] || "";

                if (item.type === "Input") {
                  return (
                    <Input
                      key={item.id}
                      title={capitalizeFirst(item.question)}
                      value={value}
                      onChangeText={(text) => handleInputChange(item.id, text)}
                      placeholder={capitalizeFirst(item?.hint) || "..."}
                    />
                  );
                }

                if (item.type === "Big Input") {
                  return (
                    <View key={item.id} style={styles.bigContainer}>
                      <AppText type={THIRTEEN} weight={MEDIUM}>
                        {capitalizeFirst(item.question)}
                      </AppText>
                      <TouchableOpacityView
                        style={styles.bigInputContainer}
                        onPress={() => desInputRef.current?.focus()}
                        activeOpacity={1}
                      >
                        <TextInput
                          ref={desInputRef}
                          multiline
                          value={value}
                          onChangeText={(text) => handleInputChange(item.id, text)}
                          placeholderTextColor={colors.place_holder}
                          placeholder={
                            capitalizeFirst(item?.hint) ||
                            "Provide a concise summary within 500 characters..."
                          }
                          style={styles.bigInput}
                        />
                      </TouchableOpacityView>
                      <AppText
                        style={styles.countText(value.length > 500)}
                      >
                        {value.length}
                        <AppText>{`/500`}</AppText>
                      </AppText>
                    </View>
                  );
                }

                if (item?.type === "Dropdown" && item?.options?.length > 0) {
                  // Convert options to [{id, name, label, radio}]
                  let dropdownOptions: { id: number; name: string; label: string; radio: boolean }[] = [];
                  try {
                    if (item?.options) {
                      const parsed = JSON.parse(item?.options);
                      dropdownOptions = Array.isArray(parsed)
                        ? parsed.map((opt: string, idx: number) => ({
                          id: idx + 1,
                          name: opt,
                          label: opt,
                          radio: true,
                        }))
                        : [];
                    }
                  } catch {
                    dropdownOptions = [];
                  }

                  return (
                    <View key={item?.id} style={styles.radioBtnContainer}>
                      <AppText type={THIRTEEN} weight={MEDIUM}>
                        {capitalizeFirst(item.question)}
                      </AppText>
                      {dropdownOptions.length > 0 ? (
                        dropdownOptions.map((option) => (
                          <TouchableOpacityView
                            key={option.id}
                            style={[
                              styles.appointmentContainer(questionStates[item.id] === option.name),
                              questionStates[item.id] === option.name && styles.shadowStyle,
                            ]}
                            onPress={() => handleInputChange(item.id, option.name)}
                          >
                            <RadioButton
                              value={questionStates[item.id] === option.name}
                              onPress={() => handleInputChange(item.id, option.name)}
                              message={option.label}
                            />
                          </TouchableOpacityView>
                        ))
                      ) : (
                        <AppText style={{ color: colors.red }}>No options available</AppText>
                      )}
                    </View>
                  );
                }

                return null;
              })}

              <View style={styles.submitButtonContainer}>
                <Button
                  loading={isBtnLoading}
                  children="Submit"
                  onPress={handleSubmit}
                />
              </View>
            </KeyBoardAware>
          )
          : (
            <View style={styles.noLeadsContainer}>
              <AppText type={FOURTEEN} weight={SEMI_BOLD}>
                {"No Legal Leads are available"}
              </AppText>
            </View>
          )
      )
      }
    </AppSafeAreaView>
  );
};

export default Leagal_Help;