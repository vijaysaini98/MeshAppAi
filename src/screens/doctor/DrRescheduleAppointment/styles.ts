import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import { borderWidth, universalPaddingHorizontal } from '../../../theme/dimens';

const styles = StyleSheet.create({
    mainSecond: {
        flex: 1,
        backgroundColor: colors.bg_second,
      },
      profileContainer: {
        marginTop: 150,
      },
      profileInfo: {
        marginTop: 65,
        alignItems: 'center',
      },
      homeToolContainer4: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 17,
      },
      locationIcon: {
        height: 18,
        width: 18,
      },
      requestButtonContainer: {
        padding: universalPaddingHorizontal,
        elevation: 10,
        backgroundColor: colors.mainBg,
      },
      profileImage2: {
        height: 120,
        width: 120,
        position: 'absolute',
        alignSelf: 'center',
        top: 90,
        borderWidth: borderWidth,
        borderColor: colors.white,
        borderRadius: 10,
      },
});
export default styles;
