import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import {
  borderWidth,
  inputHeight,
  smallButtonHeight,
  universalPaddingHorizontal,
} from "../theme/dimens";
import { fontFamily } from "../theme/typography";
import { colors } from "../theme/colors";
import TouchableOpacityView from "./TouchableOpacityView";

import { AppText, BOLD, FOURTEEN, MEDIUM, THIRTEEN, TWELVE } from "./AppText";
import { edit, editIcon, eye_close_icon, eye_open_icon, validateIcon } from "../helper/ImageAssets";

interface InputProps extends TextInputProps {
  value?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  isSecure?: boolean;
  onPressVisible?: () => void;
  isOtp?: boolean;
  onSendOtp?: () => void;
  otpText?: string;
  title?: string;
  mainContainer?: ViewStyle;
  currency?: string;
  titleStyle?: TextStyle;
  assignRef?: any;
  icon2?: any;
  icon?: any;
  placeholderColor?: TextStyle;
  verifyIcon:boolean,
  required:boolean,
  editInput:boolean,
  onPressEditInput?:()=>void
}

const Input = ({
  value,
  placeholder,
  onChangeText,
  onEndEditing,
  keyboardType,
  assignRef,
  onSubmitEditing,
  multiline,
  containerStyle,
  inputStyle,
  onPressVisible,
  secureTextEntry,
  isSecure,
  isOtp,
  onSendOtp,
  otpText,
  title,
  mainContainer,
  currency,
  titleStyle,
  icon,
  icon2,
  editable=true,
  placeholderColor,
  verifyIcon,
  required,
  editInput,
  onPressEditInput,
  ...props
}: InputProps) => {
  return (
    <View style={mainContainer}>
      {title && <AppText type={THIRTEEN} weight={MEDIUM} style={[styles.title, titleStyle]}>{title}
      {required && <AppText type={TWELVE} weight={MEDIUM} style={{color:colors.red}}>*</AppText>
      }
      { editInput && 
      <TouchableOpacityView
      onPress={onPressEditInput}
      style={{marginHorizontal:15}}
      >
        <Image
        source={editIcon}
        style={{width:15,height:15}}
        tintColor={colors.buttonBg}
        />
      </TouchableOpacityView>
      }
      </AppText>
      }
      <View
        style={[styles.container, title && { marginTop: 5 }, containerStyle,!editable && styles.disabledInput]}
      >
        {icon2 && (
          <Image
            source={icon2}
            style={styles.eyeIcon}
            resizeMode="contain"
          />
        )}
        <TextInput
          {...props}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderColor ? placeholderColor : colors.place_holder
          }
          autoCorrect={false}
          style={[styles.inputF, inputStyle,]}
          value={value}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          ref={(component) => {
            assignRef && assignRef(component);
          }}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          editable={editable}
        />
        {isSecure && (
          <TouchableOpacityView
            style={styles.eyeIconContainer}
            onPress={onPressVisible}
          >
            <Image
              source={secureTextEntry ? eye_close_icon : eye_open_icon}
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacityView>
        )}
         {verifyIcon ? (
            <Image
              source={validateIcon}
              resizeMode="contain"
              style={{width:20,height:20,marginRight:5}}
            />
          ) : (
            ""
          )}
        {icon && (
          <Image
            source={icon}
            style={styles.eyeIcon}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

export { Input };

const styles = StyleSheet.create({
  inputF: {
    fontFamily: fontFamily,
    fontSize: 14,
    color: colors.defaultText,
    height: inputHeight,
    flex: 1,
  },

  container: {
    marginTop: 15,
    height: inputHeight,
    borderWidth: borderWidth,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: universalPaddingHorizontal,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  eyeIcon: {
    height: 22,
    width: 22,
  },
  eyeIconContainer: {
    height: inputHeight,
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
  },
  otpContainer: {
    height: smallButtonHeight,
  },
  titleStyle: {
    fontSize: 12,
  },
  containerStyle: {
    height: smallButtonHeight,
    paddingHorizontal: 15,
  },
  title: {
    marginTop: 15,
  },
  disabledInput: {
    backgroundColor:colors.border, 
  },
});
