import React, {ReactNode} from 'react';
import {TouchableOpacity as TouchableOpacityBase, Platform, ActivityIndicator} from 'react-native';
import {TouchableOpacity as TouchableOpacityGesture} from 'react-native-gesture-handler';
import { colors } from '../theme/colors';

const TouchableOpacityView = ({
  children,
  isGesture,
  onFocus,
  containerStyle,
  loader,
  loaderColor,
  ...props
}: any) => {
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
        {/* {children} */}

      </TouchableOpacityBase>
    );
  }
};

export default TouchableOpacityView;
