import React from 'react';
import {KeyboardAwareScrollView, KeyboardAwareScrollViewProps} from '@codler/react-native-keyboard-aware-scroll-view';
import {commonStyles} from '../theme/commonStyles';
import {colors} from '../theme/colors';
import { Platform } from 'react-native';

const KeyBoardAware = (props:KeyboardAwareScrollViewProps) => {
  return (
    <KeyboardAwareScrollView
      {...props}
      // scrollIndicatorInsets={false}
      keyboardShouldPersistTaps="handled"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      contentContainerStyle={{flexGrow: 1}}
      style={[
        commonStyles.main,
        {backgroundColor: props?.isSecond ? colors.transparent : colors.mainBg},
        props.style,
      ]}
      showsVerticalScrollIndicator={false}>
      {props?.children}
    </KeyboardAwareScrollView>
  );
};

export default KeyBoardAware;
