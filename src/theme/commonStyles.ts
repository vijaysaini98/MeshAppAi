import {StyleSheet, ImageBackground} from 'react-native';
import {colors} from './colors';
import {
  smallButtonHeight,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
} from './dimens';
export const commonStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  screenSize: {
    flex: 1,
  },
  ImageBackgroundSize: {
    height: '100%',
    width: '100%',
    backgroundColor:colors.white
  },
  flexRow: {
    flexDirection: 'row',
  },
  tabIcon: {width: 22, height: 22},
  centerText: {textAlign: 'center'},
  flexGrow: {
    flexGrow: 1,
  },
  zeroPadding: {
    paddingHorizontal: 0,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  backGround: {
    backgroundColor: colors.mainBg,
  },
  transparent: {
    backgroundColor: colors.transparent,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    paddingHorizontal: universalPaddingHorizontal,
  },
  tabFocused: {
    backgroundColor: colors.buttonBg,
    borderRadius: 30,
    width: 150,
    height: smallButtonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
