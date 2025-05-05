import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {universalPaddingHorizontal} from '../../../theme/dimens';

const styles = StyleSheet.create({
  mainPadding: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
  doctor: {
    height: 100,
    width: 100,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  container: {
    marginHorizontal: 16,
  },

  middleContainer: {
    marginTop: 46,
  },
  selfie: {
    height: 120,
    width: 120,
  },
  pdf: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  pdfContainer: {
    borderWidth: 2,
    height: 120,
    width: 120,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: 6,
    marginLeft: 46,
  },
  documents: {
    marginLeft: 120,
  },
  common: {
    flexDirection: 'row',
  },
  description: {
    marginTop: 18,
  },
  buttonContainer: {
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;
