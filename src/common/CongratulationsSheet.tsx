import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {AppText, EIGHTEEN, MEDIUM, THIRTY_FOUR} from './AppText';
import RBSheet from 'react-native-raw-bottom-sheet';
import NavigationService from '../navigation/NavigationService';
import {NAVIGATION_AUTH_STACK} from '../navigation/routes';
import {colors} from '../theme/colors';
import { Button } from './Button';
import { popper } from '../helper/ImageAssets';
import { dimensions } from '../helper/utility';
export const Screen = {
    Width: Dimensions.get('window').width,
    Height: Dimensions.get('window').height,
  };

export const CongratulationsSheet = ({sheetRef}) => {
  const onSubmit = () => {
    sheetRef?.current?.close();
    NavigationService.reset(NAVIGATION_AUTH_STACK);
  };
  
  return (
    <RBSheet
      ref={sheetRef}
      closeOnPressMask={false}
      closeOnPressBack={false}
      openDuration={200}
      closeDuration={200}
      // draggable={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0, 0.7)',
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
        animationType: 'slide',
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
      height={dimensions.height * 0.55}>
      <View style={styles.canvas}>
        <AnimatedLottieView
          style={styles.animation}
          source={popper}
          autoPlay
          loop
        />
        <View style={styles.middleContainer}>
          <AppText type={THIRTY_FOUR} weight={MEDIUM}>
            Congratulations!{'\n'}
          </AppText>
          <AppText style={{textAlign: 'center'}} type={EIGHTEEN}>
            {'\n'}Welcome to MeshAppAI{'\n'}Your request is{'\n'}under review,
            {'\n'}
            you will get a{'\n'}mail once it verified.
          </AppText>
        </View>
         <Button
        //  style={{bottom:10}}
          containerStyle={styles.buttonStyle}
                onPress={()=>onSubmit()}
                children="Way to Login"
              />
      </View>
    </RBSheet>
  );
};
export const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  animation: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
  buttonStyle: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 30,
    marginHorizontal:20
  },
  middleContainer: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
