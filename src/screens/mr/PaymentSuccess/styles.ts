import {StyleSheet} from 'react-native';
import { colors } from '../../../theme/colors';
import { universalPaddingHorizontal, universalPaddingHorizontalMedium } from '../../../theme/dimens';
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex:1,
  },
  checkMark:{
    height:78,
    width:77,
    marginTop:121,
    alignSelf:"center",
  
   

  },
  subContainer:{
   
    // width:"100%",
    // backgroundColor:"red",
    flex:1
    
    
  },
  paymentText:{
    textAlign:"center",
    marginTop:20
  },
  successText:{
  color:colors.success_text
  },
  miniProfile:{
    backgroundColor:colors.tabBg,
    borderRadius:100,
    marginHorizontal:20,
    marginVertical:60,
    flexDirection:"row",
    paddingHorizontal:10,
paddingVertical:10
  },
  drProfile:{
    height:74,
    width:74,
    marginLeft:5,
    justifyContent:"center",
    alignSelf:'center',
    // flex:1,
    borderRadius:74,
    borderWidth:1,
    borderColor:colors.buttonBg
  },
  FeeStyle:{
    color:colors.buttonBg
  },
  textView:{
    flex:1,
    // width:"50%",
    alignSelf:"center",
    marginLeft:15,
    // paddingVertical:10,
    paddingHorizontal:10
  },
  trnxId:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:40
  },
  idStyle:{
    opacity:0.6
  },
  trnxIds:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:40,
    marginTop:20
  },

  btnView:{
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
    // marginTop:75,
    position:"absolute",
    bottom:0,
    left:0,
    right:0
   
  }
});
export default styles;
