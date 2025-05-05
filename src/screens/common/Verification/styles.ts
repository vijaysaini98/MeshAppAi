import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {universalPaddingHorizontal} from '../../../theme/dimens';

const styles = StyleSheet.create({
  welcomeLogo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: '30%',
    marginBottom: '15%',
  },
  alignCenter: {
    alignItems: 'center',
  },
  verificationContent: {
    marginTop: 20,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: '10%',
  },
  underlineStyleBase: {
    width: 60,
    height: 77,
    borderWidth: 2,
   marginBottom: 50,
    color: colors.buttonBg,
    borderRadius: 16,
    fontSize: 32,
  },
  underlineStyleHighLighted: {
    color: colors.buttonBg,
    backgroundColor:colors.otpBg,
    borderColor:colors.buttonBg
  },
  resendbtn: {
    color: colors.defaultText,
  },
  resendView: {flexDirection: 'row', alignSelf: 'center'},
  lineColor:{color:colors.textLine},
});

export default styles;
