import React, {ReactNode} from 'react';
import {TouchableOpacity as TouchableOpacityBase, Platform, ActivityIndicator, ViewStyle, TouchableOpacityProps} from 'react-native';
import {TouchableOpacity as TouchableOpacityGesture} from 'react-native-gesture-handler';
import { colors } from '../theme/colors';

type TouchableOpacityViewProps = TouchableOpacityProps  & {
  children: ReactNode;
  isGesture?: boolean;
  onFocus?: () => void;
  containerStyle?: ViewStyle;
  loader?: boolean;
  loaderColor?: string;
}

const TouchableOpacityView = ({
  children,
  isGesture,
  onFocus,
  containerStyle,
  loader,
  loaderColor,
  ...props
}: TouchableOpacityViewProps) => {
  const isIos = Platform.OS === 'ios';

  if (isGesture && !isIos) {
    return (
      <TouchableOpacityGesture onFocus={onFocus} activeOpacity={0.8} {...props}>
        {children}
      </TouchableOpacityGesture>
    );
  } else {
    return (
      <TouchableOpacityBase
        style={containerStyle}
        activeOpacity={0.8}
        {...props}>
          {
            loader ? (
              <ActivityIndicator size={"small"} color={ loaderColor? loaderColor : colors.buttonBg}/> 
              ):
            children
          }
      </TouchableOpacityBase>
    );
  }
};

export default TouchableOpacityView;
