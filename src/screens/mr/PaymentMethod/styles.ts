import {StyleSheet} from 'react-native';
import { colors } from '../../../theme/colors';
import { universalPaddingHorizontal } from '../../../theme/dimens';
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex:1,
  },
  paypal:{
    height:36,
    width:54,
    alignSelf:"center",
    justifyContent:"center",
    flex:1
  },
  paypalBox: status =>({
    height:60,
    width:102,
    borderWidth:2,
    borderRadius:6,
    borderColor:status.paypal,
  }),
  masterCardStyle: status =>({
    height:60,
    width:102,
    borderWidth:2,
    borderRadius:6,
    borderColor:status.masterCard,
  }),
  bankStyle: status =>({
    height:60,
    width:102,
    borderWidth:2,
    borderRadius:6,
    borderColor:status.bank,
  }),
  bank:{
    height:36,
    width:37,
    alignSelf:"center",
    justifyContent:"center",
    flex:1
  },
  paymentMethodStyle:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:40
  },
  subContainer:{
    marginHorizontal:16,
  
  },
  requestButtonContainer: {
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
    position:"absolute",
    bottom:0,
    left:0,
    right:0
  },
});
export default styles;
